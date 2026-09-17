"use client";

import { FiHeart } from "react-icons/fi";
import { products } from "@/data/products";

interface Props {
  onProductClick: (productId: string) => void;
}

export default function SignaturePieces({ onProductClick }: Props) {
  const displayProducts = products.slice(0, 4);

  return (
    <section className="py-14 md:py-18 lg:py-20 bg-[#f8f5f1]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-center text-[18px] md:text-[20px] lg:text-[22px] font-serif font-medium tracking-[0.1em] text-[#2c2420] mb-10 md:mb-14">
          SIGNATURE PIECES OR TIMELESS FAVORITES
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-7">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => onProductClick(product.id)}
            >
              <div className="relative overflow-hidden bg-white mb-3 aspect-[3/4]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center bg-white/90 rounded-full text-[#2c2420] hover:text-[#c5a47e] transition-colors shadow-sm"
                >
                  <FiHeart className="text-[13px]" />
                </button>
                {/* Price badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-sm">
                  <span className="text-[12px] font-sans font-medium text-[#2c2420]">₹{product.price.toLocaleString("en-IN")}</span>
                  <span className="text-[10px] font-sans text-[#6b5e54] line-through ml-1.5">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <h3 className="text-[13px] md:text-[14px] font-serif font-semibold text-[#2c2420] mb-1 leading-snug">
                {product.name}
              </h3>
              <p className="text-[10px] md:text-[11px] font-sans text-[#6b5e54] leading-relaxed line-clamp-2 pr-2">
                {product.shortDesc}
              </p>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center justify-center gap-5 mt-8 md:mt-10">
          <button className="w-9 h-9 flex items-center justify-center border border-[#e5dfd8] rounded-full text-[#6b5e54] hover:text-[#2c2420] hover:border-[#2c2420] transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-[2px] bg-[#2c2420] rounded-full" />
            <div className="w-4 h-[2px] bg-[#e5dfd8] rounded-full" />
            <div className="w-4 h-[2px] bg-[#e5dfd8] rounded-full" />
          </div>
          <button className="w-9 h-9 flex items-center justify-center border border-[#e5dfd8] rounded-full text-[#6b5e54] hover:text-[#2c2420] hover:border-[#2c2420] transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
