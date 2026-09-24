"use client";

import { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { FiX, FiStar, FiTruck, FiShield, FiPackage, FiMinus, FiPlus } from "react-icons/fi";

interface Props {
  product: Product;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: Props) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedMetal, setSelectedMetal] = useState(product.metalOptions[0].label);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedMetal);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 bg-white w-full max-w-[1100px] mx-4 my-8 md:my-12">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-white/90 border border-[#e5dfd8] rounded-full text-[#2c2420] hover:bg-[#f8f5f1] transition-colors"
        >
          <FiX className="text-[16px]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left - Images */}
          <div className="bg-[#f8f5f1] p-6 md:p-8">
            <div className="aspect-square overflow-hidden mb-4">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 overflow-hidden border-2 transition-colors ${
                    i === activeImage ? "border-[#c5a47e]" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div className="p-6 md:p-8 lg:p-10">
            {/* Category */}
            <p className="text-[10px] font-sans tracking-[0.2em] text-[#6b5e54] uppercase mb-2">
              {product.category}
            </p>

            {/* Name */}
            <h2
              className="text-[24px] md:text-[28px] font-serif font-light text-[#2c2420] leading-snug mb-3"
            >
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar
                    key={i}
                    className={`text-[12px] ${
                      i < Math.floor(product.rating)
                        ? "text-[#c5a47e] fill-[#c5a47e]"
                        : "text-[#e5dfd8]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[12px] font-sans text-[#6b5e54]">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-[26px] font-sans font-light text-[#2c2420]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-[14px] font-sans text-[#6b5e54] line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-[11px] font-sans font-medium text-white bg-[#c5a47e] px-2.5 py-1 rounded-sm">
                {discount}% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-[12px] font-sans text-[#6b5e54] leading-[1.8] mb-6">
              {product.fullDesc}
            </p>

            <div className="h-[1px] bg-[#e5dfd8] mb-5" />

            {/* Metal Options */}
            <div className="mb-5">
              <p className="text-[11px] font-sans font-medium text-[#2c2420] mb-2.5 tracking-wide">
                Metal: <span className="font-normal text-[#6b5e54]">{selectedMetal}</span>
              </p>
              <div className="flex gap-2">
                {product.metalOptions.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => setSelectedMetal(m.label)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedMetal === m.label
                        ? "border-[#c5a47e] scale-110"
                        : "border-[#e5dfd8] hover:border-[#c5a47e]"
                    }`}
                    style={{ backgroundColor: m.color }}
                    title={m.label}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-5">
              <p className="text-[11px] font-sans font-medium text-[#2c2420] mb-2.5 tracking-wide">
                Size: <span className="font-normal text-[#6b5e54]">{selectedSize}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 text-[11px] font-sans border transition-all ${
                      selectedSize === s
                        ? "border-[#2c2420] bg-[#2c2420] text-white"
                        : "border-[#e5dfd8] text-[#2c2420] hover:border-[#2c2420]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-[#e5dfd8]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#6b5e54] hover:bg-[#f8f5f1] transition-colors"
                >
                  <FiMinus className="text-[13px]" />
                </button>
                <span className="w-10 h-10 flex items-center justify-center text-[13px] font-sans text-[#2c2420] border-x border-[#e5dfd8]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-[#6b5e54] hover:bg-[#f8f5f1] transition-colors"
                >
                  <FiPlus className="text-[13px]" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 h-10 text-[11px] font-sans font-medium tracking-[0.12em] uppercase transition-all duration-300 ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-[#2c2420] text-white hover:bg-[#1a1614]"
                }`}
              >
                {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="flex flex-col items-center text-center gap-1.5 p-3 bg-[#f8f5f1]">
                <FiTruck className="text-[16px] text-[#c5a47e]" />
                <span className="text-[9px] font-sans text-[#6b5e54] leading-tight">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-3 bg-[#f8f5f1]">
                <FiShield className="text-[16px] text-[#c5a47e]" />
                <span className="text-[9px] font-sans text-[#6b5e54] leading-tight">Lifetime Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-3 bg-[#f8f5f1]">
                <FiPackage className="text-[16px] text-[#c5a47e]" />
                <span className="text-[9px] font-sans text-[#6b5e54] leading-tight">Easy Returns</span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <p className="text-[11px] font-sans font-medium text-[#2c2420] mb-2 tracking-wide">
                Features
              </p>
              <ul className="space-y-1.5">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-[11px] font-sans text-[#6b5e54]">
                    <span className="w-1 h-1 bg-[#c5a47e] rounded-full shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* SKU */}
            <p className="text-[10px] font-sans text-[#6b5e54]/60 mt-4">
              SKU: {product.sku}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
