const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { upload, uploadProductImage, uploadUserAvatar } = require("../services/uploadService");

// ────────────────────────────────────────────────────────
// POST /api/upload/avatar
// Upload / replace logged-in user's profile photo
// ────────────────────────────────────────────────────────
router.post("/avatar", protect, upload.single("avatar"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please select an image file (JPG, PNG, or WebP)" });
    }

    const User = require("../models/User");
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Upload to Cloudinary (sharp compression happens inside uploadUserAvatar)
    const result = await uploadUserAvatar(req.file.buffer, String(req.user._id));

    user.avatar = result.secure_url;
    await user.save();

    res.json({
      success: true,
      message: "Profile photo updated successfully",
      avatar: result.secure_url,
      size: {
        originalKB: Math.round(req.file.size / 1024),
        uploadedKB: Math.round(result.bytes / 1024),
        savedPercent: Math.round(100 - (result.bytes / req.file.size) * 100),
      },
    });
  } catch (error) {
    next(error);
  }
});

// ────────────────────────────────────────────────────────
// POST /api/upload/product-image
// Upload a product image (admin only)
// Returns the Cloudinary URL — admin saves it in product data
// ────────────────────────────────────────────────────────
router.post("/product-image", protect, upload.single("image"), async (req, res, next) => {
  try {
    // Admin guard
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please select an image file (JPG, PNG, or WebP)" });
    }

    const productId = req.body.productId || null;
    const result = await uploadProductImage(req.file.buffer, productId);

    res.json({
      success: true,
      message: "Product image uploaded successfully",
      url: result.secure_url,
      publicId: result.public_id,
      size: {
        originalKB: Math.round(req.file.size / 1024),
        uploadedKB: Math.round(result.bytes / 1024),
        savedPercent: Math.round(100 - (result.bytes / req.file.size) * 100),
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
