"use client";

import { products, Product } from "@/data/products";
import { FiX, FiHeart } from "react-icons/fi";

interface Props {
  category: string;
  onClose: () => void;
  onProductClick: (productId: string) => void;
}

export default function CategoryProducts({ category, onClose, onProductClick }: Props) {
  const filtered = products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 bg-white w-full max-w-[1100px] mx-4 my-8 md:my-12">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-white/90 border border-[#e5dfd8] rounded-full text-[#2c2420] hover:bg-[#f8f5f1] transition-colors"
        >
          <FiX className="text-[16px]" />
        </button>

        <div className="p-6 md:p-8 lg:p-10">
          <h2 className="text-[24px] md:text-[28px] font-serif font-light text-[#2c2420] mb-2">
            {category}
          </h2>
          <p className="text-[12px] font-sans text-[#6b5e54] mb-8">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[14px] font-serif text-[#6b5e54]">More {category} coming soon.</p>
              <p className="text-[11px] font-sans text-[#6b5e54]/60 mt-2">
                Check back later for new arrivals in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                  onClick={() => {
                    onClose();
                    onProductClick(product.id);
                  }}
                >
                  <div className="relative overflow-hidden bg-[#f8f5f1] mb-3 aspect-[3/4]">
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
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-sm">
                      <span className="text-[12px] font-sans font-medium text-[#2c2420]">₹{product.price.toLocaleString("en-IN")}</span>
                      <span className="text-[10px] font-sans text-[#6b5e54] line-through ml-1.5">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                  <h3 className="text-[13px] font-serif font-semibold text-[#2c2420] mb-1 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-[10px] font-sans text-[#6b5e54] leading-relaxed line-clamp-2">
                    {product.shortDesc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
