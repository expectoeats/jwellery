"use client";

import Link from "next/link";

const categoryImages: Record<string, string> = {
  Rings: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
  Pendants: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
  Bangles: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
  Earrings: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
};

const categories = ["Rings", "Pendants", "Bangles", "Earrings"];

export default function ShopByCategory() {
  return (
    <section className="py-10 sm:py-14 md:py-18 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <p className="text-center text-[9px] sm:text-[10px] md:text-[11px] font-sans tracking-[0.22em] text-[#6b5e54] uppercase mb-1.5 sm:mb-2">
          Explore
        </p>
        <h2 className="text-center text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-serif font-medium tracking-[0.1em] text-[#2c2420] mb-8 sm:mb-10 md:mb-14">
          SHOP BY CATEGORY
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat}
              href="/collections"
              className="group block"
            >
              <div className="relative overflow-hidden mb-2.5 sm:mb-3 aspect-square">
                <img
                  src={categoryImages[cat]}
                  alt={cat}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 sm:p-4">
                  <p className="text-white text-[12px] sm:text-[14px] font-serif font-medium tracking-wide">
                    {cat}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
