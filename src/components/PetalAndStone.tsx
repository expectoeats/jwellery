"use client";

import Link from "next/link";

export default function PetalAndStone() {
  return (
    <section className="py-10 sm:py-14 md:py-18 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-[#f8f5f1]">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[460px]">
            <img
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=700&h=525&fit=crop"
              alt="Aura Gems Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8">
              <p className="text-white text-[14px] sm:text-[16px] md:text-[18px] font-serif italic tracking-wide">
                AURA GEMS
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center px-6 sm:px-8 py-8 sm:py-10 lg:py-14 lg:px-14">
            <p className="text-[9px] sm:text-[10px] md:text-[11px] font-sans tracking-[0.22em] text-[#6b5e54] uppercase mb-2.5 sm:mb-3">
              Our Philosophy
            </p>
            <h2 className="text-[26px] sm:text-[30px] md:text-[36px] lg:text-[40px] font-serif font-light text-[#2c2420] mb-2.5 sm:mb-3">
              Petal &amp; Stone
            </h2>
            <div className="w-[30px] sm:w-[36px] h-[1.5px] bg-[#c5a47e] mb-4 sm:mb-5" />
            <p className="text-[11px] sm:text-[12px] md:text-[13px] font-sans text-[#6b5e54] leading-[1.8] mb-5 sm:mb-7 max-w-[320px] sm:max-w-[340px]">
              A harmony of delicate petals and enduring stone crafted into timeless
              jewelry that blends softness with strength. Every piece is a celebration
              of nature&apos;s most beautiful elements.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-sans text-[#2c2420] tracking-[0.04em] border-b border-[#2c2420] pb-0.5 hover:text-[#c5a47e] hover:border-[#c5a47e] transition-colors"
            >
              Our Story
              <span className="text-[10px]">&#8594;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
