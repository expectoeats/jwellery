"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById, getDiscount, products } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrustBadges from "@/components/TrustBadges";
import BackToTop from "@/components/BackToTop";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { FiHeart, FiStar, FiTruck, FiShield, FiPackage, FiMinus, FiPlus, FiCheck } from "react-icons/fi";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const product = getProductById(params.id as string);
  const { addItem } = useCart();
  const { isInWishlist, addItem: addWishlist, removeItem: removeWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [selectedMetal, setSelectedMetal] = useState(product?.metalOptions[0]?.label || "");
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center min-h-[60vh] px-5">
          <div className="text-center">
            <h1 className="text-[22px] sm:text-[24px] font-serif text-[#2c2420] mb-3">Product Not Found</h1>
            <p className="text-[12px] sm:text-[13px] font-sans text-[#6b5e54] mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
            <button
              onClick={() => router.push("/collections")}
              className="text-[12px] font-sans text-[#c5a47e] underline hover:text-[#2c2420] transition-colors"
            >
              Browse Collections
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const discount = getDiscount(product.price, product.originalPrice);
  const liked = isInWishlist(product.id);
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedMetal);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs items={[
            { label: "Collections", href: "/collections" },
            { label: product.category, href: "/collections" },
            { label: product.name },
          ]} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 lg:gap-12 pb-10 sm:pb-16">
            {/* Left - Images */}
            <div>
              <div className="aspect-square overflow-hidden bg-[#f8f5f1] mb-3 sm:mb-4">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-1.5 sm:gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 overflow-hidden border-2 transition-colors ${
                      i === activeImage ? "border-[#c5a47e]" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Details */}
            <div className="pb-20 sm:pb-0">
              <p className="text-[9px] sm:text-[10px] font-sans tracking-[0.2em] text-[#6b5e54] uppercase mb-1.5 sm:mb-2">
                {product.category}
              </p>

              <h1 className="text-[22px] sm:text-[24px] md:text-[30px] font-serif font-light text-[#2c2420] leading-snug mb-2.5 sm:mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={`text-[12px] sm:text-[13px] ${
                        i < Math.floor(product.rating)
                          ? "text-[#c5a47e] fill-[#c5a47e]"
                          : "text-[#e5dfd8]"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] sm:text-[12px] font-sans text-[#6b5e54]">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 sm:gap-3 mb-4 sm:mb-5">
                <span className="text-[24px] sm:text-[28px] font-sans font-light text-[#2c2420]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-[12px] sm:text-[14px] font-sans text-[#6b5e54] line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
                {discount > 0 && (
                  <span className="text-[10px] sm:text-[11px] font-sans font-medium text-white bg-[#c5a47e] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-sm">
                    {discount}% OFF
                  </span>
                )}
              </div>

              <p className="text-[12px] sm:text-[13px] font-sans text-[#6b5e54] leading-[1.8] mb-5 sm:mb-6">
                {product.fullDesc}
              </p>

              <div className="h-[1px] bg-[#e5dfd8] mb-4 sm:mb-5" />

              {/* Metal Options */}
              <div className="mb-4 sm:mb-5">
                <p className="text-[10px] sm:text-[11px] font-sans font-medium text-[#2c2420] mb-2 sm:mb-2.5 tracking-wide">
                  Metal: <span className="font-normal text-[#6b5e54]">{selectedMetal}</span>
                </p>
                <div className="flex gap-2">
                  {product.metalOptions.map((m) => (
                    <button
                      key={m.label}
                      onClick={() => setSelectedMetal(m.label)}
                      className={`w-9 h-9 sm:w-8 sm:h-8 rounded-full border-2 transition-all ${
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
              <div className="mb-4 sm:mb-5">
                <p className="text-[10px] sm:text-[11px] font-sans font-medium text-[#2c2420] mb-2 sm:mb-2.5 tracking-wide">
                  Size: <span className="font-normal text-[#6b5e54]">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3.5 sm:px-4 py-2 text-[11px] font-sans border transition-all ${
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

              {/* Quantity + Add to Cart - Sticky on mobile */}
              <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
                <div className="flex items-center border border-[#e5dfd8]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#6b5e54] hover:bg-[#f8f5f1] active:bg-[#e5dfd8] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus className="text-[13px]" />
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center text-[13px] font-sans text-[#2c2420] border-x border-[#e5dfd8]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-[#6b5e54] hover:bg-[#f8f5f1] active:bg-[#e5dfd8] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <FiPlus className="text-[13px]" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-10 sm:h-10 text-[11px] font-sans font-medium tracking-[0.12em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                    addedToCart
                      ? "bg-green-600 text-white"
                      : "bg-[#2c2420] text-white hover:bg-[#1a1614] active:bg-[#0d0b0a]"
                  }`}
                >
                  {addedToCart ? <><FiCheck className="text-[14px]" /> Added</> : "Add to Cart"}
                </button>

                <button
                  onClick={() => (liked ? removeWishlist(product.id) : addWishlist(product))}
                  className={`w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center border transition-all shrink-0 ${
                    liked
                      ? "border-[#c5a47e] bg-[#c5a47e] text-white"
                      : "border-[#e5dfd8] text-[#6b5e54] hover:border-[#c5a47e] hover:text-[#c5a47e]"
                  }`}
                  aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <FiHeart className={`text-[15px] sm:text-[16px] ${liked ? "fill-white" : ""}`} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5 sm:mb-6">
                <div className="flex flex-col items-center text-center gap-1 sm:gap-1.5 p-2.5 sm:p-3 bg-[#f8f5f1]">
                  <FiTruck className="text-[14px] sm:text-[16px] text-[#c5a47e]" />
                  <span className="text-[8px] sm:text-[9px] font-sans text-[#6b5e54] leading-tight">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1 sm:gap-1.5 p-2.5 sm:p-3 bg-[#f8f5f1]">
                  <FiShield className="text-[14px] sm:text-[16px] text-[#c5a47e]" />
                  <span className="text-[8px] sm:text-[9px] font-sans text-[#6b5e54] leading-tight">Lifetime Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1 sm:gap-1.5 p-2.5 sm:p-3 bg-[#f8f5f1]">
                  <FiPackage className="text-[14px] sm:text-[16px] text-[#c5a47e]" />
                  <span className="text-[8px] sm:text-[9px] font-sans text-[#6b5e54] leading-tight">Easy Returns</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <p className="text-[10px] sm:text-[11px] font-sans font-medium text-[#2c2420] mb-2 tracking-wide">Features</p>
                <ul className="space-y-1.5">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[10px] sm:text-[11px] font-sans text-[#6b5e54]">
                      <span className="w-1 h-1 bg-[#c5a47e] rounded-full shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="border-t border-[#e5dfd8] pt-3.5 sm:pt-4 mt-3.5 sm:mt-4">
                <p className="text-[10px] sm:text-[11px] font-sans font-medium text-[#2c2420] mb-2 tracking-wide">Specifications</p>
                <div className="space-y-1.5">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] sm:text-[11px] font-sans">
                      <span className="text-[#6b5e54]">{spec.label}:</span>
                      <span className="text-[#2c2420] font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[9px] sm:text-[10px] font-sans text-[#6b5e54]/60 mt-3.5 sm:mt-4">SKU: {product.sku}</p>
            </div>
          </div>
        </div>

        {/* Sticky Add to Cart bar on mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5dfd8] px-5 py-3 z-30 flex items-center gap-3">
          <div className="flex-1">
            <p className="text-[10px] font-sans text-[#6b5e54]">Total</p>
            <p className="text-[18px] font-sans font-medium text-[#2c2420]">
              ₹{(product.price * quantity).toLocaleString("en-IN")}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex-[2] h-11 text-[11px] font-sans font-medium tracking-[0.12em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
              addedToCart
                ? "bg-green-600 text-white"
                : "bg-[#2c2420] text-white active:bg-[#0d0b0a]"
            }`}
          >
            {addedToCart ? <><FiCheck className="text-[14px]" /> Added</> : "Add to Cart"}
          </button>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="bg-[#f8f5f1] py-10 sm:py-12 md:py-16">
            <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
              <h2 className="text-center text-[16px] sm:text-[18px] md:text-[20px] font-serif font-medium tracking-[0.1em] text-[#2c2420] mb-8 sm:mb-10">
                YOU MAY ALSO LIKE
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        <TrustBadges />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
