const mongoose = require("mongoose");

const metalOptionSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    color: { type: String, required: true },
  },
  { _id: false }
);

const specificationSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    shortDesc: { type: String, required: true },
    fullDesc: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    image: { type: String, required: true },
    images: [{ type: String }],
    category: {
      type: String,
      required: true,
      index: true,
      enum: ["Rings", "Earrings", "Pendants", "Bangles", "Necklaces", "Bracelets"],
    },
    rating: { type: Number, default: 5.0 },
    reviewCount: { type: Number, default: 0 },
    sizes: [{ type: String }],
    metalOptions: [metalOptionSchema],
    inStock: { type: Boolean, default: true },
    sku: { type: String, required: true, unique: true },
    features: [{ type: String }],
    specifications: [specificationSchema],
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: "text", shortDesc: "text", category: "text" });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
