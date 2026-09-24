const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getUserOrders,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(protect, admin, getAllUsers);
router.route("/:id/role").put(protect, admin, updateUserRole);
router.route("/:id").delete(protect, admin, deleteUser);
router.route("/:id/orders").get(protect, admin, getUserOrders);

module.exports = router;
