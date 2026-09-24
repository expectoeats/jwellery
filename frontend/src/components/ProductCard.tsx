"use client";

import Link from "next/link";
import { Product, getDiscount } from "@/data/products";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { isInWishlist, addItem: addWishlist, removeItem: removeWishlist } = useWishlist();
  const { addItem } = useCart();
  const liked = isInWishlist(product.id);
  const discount = getDiscount(product.price, product.originalPrice);

  return (
    <div className="group">
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden bg-[#f8f5f1] mb-2.5 sm:mb-3 aspect-[3/4]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-[#c5a47e] text-white text-[8px] sm:text-[9px] font-sans font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 tracking-wide">
              {discount}% OFF
            </div>
          )}
          {/* Always visible on mobile, hover on desktop */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product, product.sizes[0], product.metalOptions[0].label);
              }}
              className="w-full flex items-center justify-center gap-1.5 bg-white/95 backdrop-blur-sm text-[#2c2420] text-[10px] font-sans font-medium px-3 py-2.5 sm:py-2 hover:bg-[#2c2420] hover:text-white transition-colors shadow-sm active:scale-95"
            >
              <FiShoppingBag className="text-[11px]" />
              Add to Bag
            </button>
          </div>
        </div>
      </Link>

      <div className="flex items-start justify-between gap-1.5 sm:gap-2">
        <Link href={`/product/${product.id}`} className="flex-1 min-w-0">
          <h3 className="text-[12px] sm:text-[13px] md:text-[14px] font-serif font-semibold text-[#2c2420] mb-0.5 sm:mb-1 leading-snug truncate">
            {product.name}
          </h3>
          <p className="text-[10px] sm:text-[11px] font-sans text-[#6b5e54] leading-relaxed line-clamp-2 pr-1 sm:pr-2">
            {product.shortDesc}
          </p>
        </Link>
        <button
          onClick={() => (liked ? removeWishlist(product.id) : addWishlist(product))}
          className="shrink-0 w-8 h-8 flex items-center justify-center -mt-0.5"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart
            className={`text-[15px] sm:text-[16px] transition-colors ${
              liked ? "fill-[#c5a47e] text-[#c5a47e]" : "text-[#6b5e54]"
            }`}
          />
        </button>
      </div>

      <div className="flex items-baseline gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
        <span className="text-[12px] sm:text-[13px] font-sans font-semibold text-[#2c2420]">
          ₹{product.price.toLocaleString("en-IN")}
        </span>
        <span className="text-[10px] sm:text-[11px] font-sans text-[#6b5e54] line-through">
          ₹{product.originalPrice.toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
}
