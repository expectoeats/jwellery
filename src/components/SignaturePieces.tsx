"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function SignaturePieces() {
  const displayProducts = products.slice(0, 8);

  return (
    <section className="py-10 sm:py-14 md:py-18 lg:py-20 bg-[#f8f5f1]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <p className="text-center text-[9px] sm:text-[10px] md:text-[11px] font-sans tracking-[0.22em] text-[#6b5e54] uppercase mb-1.5 sm:mb-2">
          Curated For You
        </p>
        <h2 className="text-center text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-serif font-medium tracking-[0.1em] text-[#2c2420] mb-8 sm:mb-10 md:mb-14">
          SIGNATURE PIECES & TIMELESS FAVORITES
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex items-center justify-center mt-8 sm:mt-10 md:mt-12">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 h-10 sm:h-11 px-6 sm:px-8 border border-[#2c2420] text-[#2c2420] text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.1em] uppercase hover:bg-[#2c2420] hover:text-white active:bg-[#0d0b0a] active:text-white transition-all duration-300"
          >
            View All Collections
            <span className="text-[11px]">&#8594;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
