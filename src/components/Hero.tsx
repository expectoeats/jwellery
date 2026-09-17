"use client";

import { useState, useEffect } from "react";

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const total = 5;

  useEffect(() => {
    const t = setInterval(() => setSlide((p) => (p + 1) % total), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full h-[420px] sm:h-[500px] md:h-[580px] lg:h-[640px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://media.angara.com/angara/promotion/banners/silver_jewellery_desktop_banner.jpg?width=1440&quality=85&auto=avif,webp')`,
        }}
      >
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex items-center">
        <div className="max-w-[460px] text-white pt-8">
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] font-serif font-light leading-[1.08] mb-3">
            Jewels Born from
            <br />
            Nature&apos;s Own Hand
          </h2>
          <div className="w-[36px] h-[2px] bg-white/50 my-4" />
          <p className="text-[13px] md:text-[14px] font-sans font-light tracking-wide mb-0.5">
            Handcrafted in Thailand&apos;s
          </p>
          <p className="text-[13px] md:text-[14px] font-sans font-light tracking-wide mb-5">
            Ancient gem capital
          </p>
          <p className="text-[10px] md:text-[11px] font-sans font-light leading-[1.7] mb-7 max-w-[350px] opacity-85">
            From The Riven Smoldered Sapphires Of
            <br />
            Chanthaburi To The Amber Hued Topaz Of
            <br />
            Kanchanaburi, Each Creation Tastes Life
            <br />
            With Colour Where It
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[12px] font-sans font-medium tracking-[0.06em] border border-white/40 px-5 py-2.5 hover:bg-white hover:text-[#2c2420] transition-all duration-300"
          >
            View Collections
            <span className="text-[11px]">&#8594;</span>
          </a>
        </div>
      </div>

      <button
        onClick={() => setSlide((p) => (p - 1 + total) % total)}
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setSlide((p) => (p + 1) % total)}
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`rounded-full transition-all duration-300 ${
              i === slide ? "w-4 h-[3px] bg-white" : "w-[6px] h-[3px] bg-white/40"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-5 right-6 lg:right-12 z-20 hidden md:flex items-center gap-2 text-white/40">
        <span className="text-[9px] font-sans tracking-[0.15em] uppercase">Scroll to explore</span>
      </div>
    </section>
  );
}
