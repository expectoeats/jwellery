const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderByOrderId,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getPlatformStats,
} = require("../controllers/orderController");
const { protect, optionalAuth, admin } = require("../middleware/authMiddleware");

router.route("/stats/summary").get(protect, admin, getPlatformStats);
router.route("/").post(optionalAuth, createOrder).get(protect, admin, getAllOrders);
router.route("/my-orders").get(protect, getMyOrders);
router
  .route("/:orderId")
  .get(getOrderByOrderId)
  .delete(protect, admin, deleteOrder);
router.route("/:id/status").put(protect, admin, updateOrderStatus);

module.exports = router;
