const User = require("../models/User");
const Order = require("../models/Order");

// @desc    Get all users with their order counts and total spent
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });

    // Aggregate orders per user to compute total orders and lifetime spent
    const userStats = await Order.aggregate([
      { $match: { user: { $ne: null } } },
      {
        $group: {
          _id: "$user",
          orderCount: { $sum: 1 },
          totalSpent: { $sum: "$total" },
        },
      },
    ]);

    const statsMap = {};
    userStats.forEach((s) => {
      statsMap[s._id.toString()] = {
        orderCount: s.orderCount,
        totalSpent: s.totalSpent,
      };
    });

    const enrichedUsers = users.map((u) => {
      const stats = statsMap[u._id.toString()] || { orderCount: 0, totalSpent: 0 };
      return {
        _id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        phone: u.phone,
        createdAt: u.createdAt,
        orderCount: stats.orderCount,
        totalSpent: stats.totalSpent,
      };
    });

    res.json({
      success: true,
      count: enrichedUsers.length,
      users: enrichedUsers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role (user/admin)
// @route   PUT /api/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role specified" });
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.json({
      success: true,
      message: `User role updated to ${role}`,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Prevent deleting the main admin account accidentally
    if (user.email === "admin@auragems.com") {
      return res.status(400).json({ success: false, message: "Cannot delete primary admin account" });
    }

    await User.deleteOne({ _id: user._id });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order history for a specific user
// @route   GET /api/users/:id/orders
// @access  Private/Admin
const getUserOrders = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      user,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getUserOrders,
};
