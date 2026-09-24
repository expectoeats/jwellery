const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const {
  sendOrderConfirmationEmail,
  sendOrderStatusUpdateEmail,
} = require("../services/emailService");

// @desc    Create new order
// @route   POST /api/orders
// @access  Public / Optional Auth
const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No order items provided" });
    }

    if (!shippingAddress || !shippingAddress.firstName || !shippingAddress.address) {
      return res.status(400).json({ success: false, message: "Please provide complete shipping details" });
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = subtotal > 5000 ? 0 : 199;
    const tax = Math.round(subtotal * 0.03); // 3% GST on jewelry
    const total = subtotal + shippingCost + tax;

    // Generate unique order ID
    const orderId = "AG" + Date.now().toString(36).toUpperCase();

    const order = new Order({
      orderId,
      user: req.user ? req.user._id : null,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || "upi",
      paymentStatus: paymentMethod === "cod" ? "pending" : "completed",
      orderStatus: "confirmed",
      subtotal,
      shippingCost,
      tax,
      total,
      estimatedDelivery: "5-7 business days",
    });

    const createdOrder = await order.save();

    // Send confirmation email asynchronously (non-blocking)
    if (createdOrder.shippingAddress && createdOrder.shippingAddress.email) {
      sendOrderConfirmationEmail(createdOrder).catch((emailErr) => {
        console.error("Order confirmation email failed:", emailErr.message);
      });
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: createdOrder,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by custom orderId
// @route   GET /api/orders/:orderId
// @access  Public
const getOrderByOrderId = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId }).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 }).populate("user", "name email");
    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status / payment status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    let order = await Order.findOne({ orderId: id });
    if (!order && id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id);
    }

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const previousStatus = order.orderStatus;
    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    const updatedOrder = await order.save();

    // Send status update email if orderStatus changed
    if (orderStatus && orderStatus !== previousStatus && updatedOrder.shippingAddress?.email) {
      sendOrderStatusUpdateEmail(updatedOrder).catch((emailErr) => {
        console.error("Order status update email failed:", emailErr.message);
      });
    }

    res.json({
      success: true,
      message: `Order status updated to ${order.orderStatus}`,
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    let order = await Order.findOne({ orderId: id });
    if (!order && id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id);
    }

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    await Order.deleteOne({ _id: order._id });
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get complete platform stats and analytics
// @route   GET /api/orders/stats/summary
// @access  Private/Admin
const getPlatformStats = async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalUsers = await User.countDocuments({});

    const revenueResult = await Order.aggregate([
      { $match: { orderStatus: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("user", "name email");

    const statusCounts = await Order.aggregate([
      { $group: { _id: "$orderStatus", count: { $sum: 1 } } },
    ]);

    const paymentCounts = await Order.aggregate([
      { $group: { _id: "$paymentMethod", count: { $sum: 1 }, revenue: { $sum: "$total" } } },
    ]);

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalUsers,
        averageOrderValue: totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0,
        recentOrders,
        statusCounts,
        paymentCounts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrderByOrderId,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getPlatformStats,
};
