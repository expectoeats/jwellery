"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1440&h=700&fit=crop",
    title: "Jewels Born from\nNature's Own Hand",
    subtitle: "Handcrafted in Thailand",
    cta: "View Collections",
    link: "/collections",
  },
  {
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1440&h=700&fit=crop",
    title: "Timeless Diamond\nCollections",
    subtitle: "Certified & Exquisite",
    cta: "Shop Diamonds",
    link: "/collections",
  },
  {
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1440&h=700&fit=crop",
    title: "Gold & Gemstone\nMasterpieces",
    subtitle: "Luxury Redefined",
    cta: "Explore Now",
    link: "/collections",
  },
];

export default function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const current = slides[slide];

  return (
    <section className="relative w-full h-[480px] sm:h-[520px] md:h-[580px] lg:h-[640px] overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            i === slide ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${s.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 flex items-center">
        <div className="max-w-[460px] text-white pt-4 sm:pt-8">
          <p className="text-[10px] sm:text-[11px] md:text-[12px] font-sans tracking-[0.2em] uppercase mb-3 sm:mb-4 text-white/80">
            {current.subtitle}
          </p>
          <h2 className="text-[28px] sm:text-[34px] md:text-[44px] lg:text-[54px] font-serif font-light leading-[1.1] mb-3 sm:mb-4 whitespace-pre-line">
            {current.title}
          </h2>
          <div className="w-[30px] sm:w-[36px] h-[2px] bg-[#c5a47e] my-4 sm:my-5" />
          <Link
            href={current.link}
            className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-sans font-medium tracking-[0.06em] border border-white/40 px-5 sm:px-6 py-2.5 sm:py-3 hover:bg-white hover:text-[#2c2420] transition-all duration-300"
          >
            {current.cta}
            <span className="text-[11px]">&#8594;</span>
          </Link>
        </div>
      </div>

      {/* Arrows - bigger touch targets */}
      <button
        onClick={() => setSlide((p) => (p - 1 + slides.length) % slides.length)}
        className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setSlide((p) => (p + 1) % slides.length)}
        className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`rounded-full transition-all duration-300 ${
              i === slide ? "w-4 h-[3px] bg-white" : "w-[6px] h-[3px] bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
