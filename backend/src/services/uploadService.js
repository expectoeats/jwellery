const multer = require("multer");
const sharp = require("sharp");
const cloudinary = require("../config/cloudinary");
const { Readable } = require("stream");

// ────────────────────────────────────────────────────────
// Multer — store in memory (we compress with sharp first)
// ────────────────────────────────────────────────────────
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, and WebP images are allowed"), false);
  }
};

// Max raw upload size: 10MB (before compression)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// ────────────────────────────────────────────────────────
// Helper: compress image with Sharp before Cloudinary upload
// ────────────────────────────────────────────────────────
const compressAndConvertToWebP = async (buffer, maxWidthPx = 1200) => {
  return await sharp(buffer)
    .resize({ width: maxWidthPx, withoutEnlargement: true }) // never upscale
    .webp({ quality: 75 })                                   // 75% quality WebP
    .toBuffer();
};

// ────────────────────────────────────────────────────────
// Helper: stream a Buffer to Cloudinary upload_stream
// ────────────────────────────────────────────────────────
const streamToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    const readable = Readable.from(buffer);
    readable.pipe(uploadStream);
  });
};

// ────────────────────────────────────────────────────────
// Upload: Product Image
// Compression: resize to 1200px wide, WebP 75%
// Storage folder: aura-gems/products
// ────────────────────────────────────────────────────────
const uploadProductImage = async (buffer, productId) => {
  const compressed = await compressAndConvertToWebP(buffer, 1200);
  const result = await streamToCloudinary(compressed, {
    folder: "aura-gems/products",
    public_id: productId ? `product_${productId}_${Date.now()}` : undefined,
    format: "webp",
    resource_type: "image",
    overwrite: true,
  });
  return result;
};

// ────────────────────────────────────────────────────────
// Upload: User Avatar / Profile Photo
// Compression: resize to 400px wide, WebP 80% (face quality)
// Storage folder: aura-gems/avatars
// ────────────────────────────────────────────────────────
const uploadUserAvatar = async (buffer, userId) => {
  const compressed = await sharp(buffer)
    .resize({ width: 400, height: 400, fit: "cover", position: "face" })
    .webp({ quality: 80 })
    .toBuffer();

  const result = await streamToCloudinary(compressed, {
    folder: "aura-gems/avatars",
    public_id: `avatar_${userId}`,
    format: "webp",
    resource_type: "image",
    overwrite: true,         // replace old avatar — no storage waste
    invalidate: true,
    transformation: [
      { width: 400, height: 400, crop: "fill", gravity: "face" },
    ],
  });
  return result;
};

// ────────────────────────────────────────────────────────
// Delete: Remove a Cloudinary asset by public_id
// ────────────────────────────────────────────────────────
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;
  return await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
};

module.exports = {
  upload,
  uploadProductImage,
  uploadUserAvatar,
  deleteFromCloudinary,
};
