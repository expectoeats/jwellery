"use client";

import { products } from "@/data/products";

const categoryImages: Record<string, string> = {
  Rings: "https://media.angara.com/angara/promotion/banners/tennis-bracelets-dektop-banner.jpg?width=1440&quality=85&auto=avif,webp",
  Pendants: "https://media.angara.com/angara/promotion/banners/tennis-bracelets-dektop-banner.jpg?width=1440&quality=85&auto=avif,webp",
  Bangles: "https://media.angara.com/angara/promotion/banners/gemstone_jewellery_desktop_section_banner.jpg?width=1440&quality=85&auto=avif,webp",
  Earrings: "https://media.angara.com/angara/promotion/banners/gemstone_jewellery_desktop_section_banner.jpg?width=1440&quality=85&auto=avif,webp",
};

const categories = ["Rings", "Pendants", "Bangles", "Earrings"];

interface Props {
  onCategoryClick: (category: string) => void;
}

export default function ShopByCategory({ onCategoryClick }: Props) {
  return (
    <section className="py-14 md:py-18 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-center text-[18px] md:text-[20px] lg:text-[22px] font-serif font-medium tracking-[0.1em] text-[#2c2420] mb-10 md:mb-14">
          SHOP BY CATEGORY
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-7">
          {categories.map((cat) => (
            <a
              key={cat}
              href="#"
              className="group block cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                onCategoryClick(cat);
              }}
            >
              <div className="relative overflow-hidden mb-3 aspect-square">
                <img
                  src={categoryImages[cat]}
                  alt={cat}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <p className="text-center text-[13px] md:text-[14px] font-serif font-medium text-[#2c2420] tracking-wide">
                {cat}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
