"use client";

import { FiStar } from "react-icons/fi";

const reviews = [
  {
    text: "The diamond ring I purchased exceeded all my expectations. The craftsmanship is impeccable and the stone sparkles beautifully. My fiancée was overjoyed!",
    name: "PRIYA M.",
    location: "Mumbai, India",
    rating: 5,
  },
  {
    text: "I've been a loyal customer for years. Every piece from Aura Gems tells a story. The emerald pendant I bought recently is absolutely stunning.",
    name: "SARAH K.",
    location: "New York, USA",
    rating: 5,
  },
  {
    text: "The attention to detail in their work is remarkable. The gold bangle I ordered is perfectly weighted and comfortable. Highly recommend!",
    name: "AKIKO T.",
    location: "Tokyo, Japan",
    rating: 5,
  },
  {
    text: "Beautiful jewelry with excellent quality. The certificate of authenticity gives extra confidence. Will definitely shop here again.",
    name: "EMMA L.",
    location: "London, UK",
    rating: 4,
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-10 sm:py-14 md:py-18 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <p className="text-center text-[10px] sm:text-[11px] font-sans tracking-[0.22em] text-[#6b5e54] uppercase mb-1.5 sm:mb-2">
          Customer Reviews
        </p>
        <h2 className="text-center text-[24px] sm:text-[28px] md:text-[34px] lg:text-[38px] font-serif font-light text-[#2c2420] mb-3 sm:mb-4">
          What Our Customers Say
        </h2>
        <div className="flex items-center justify-center gap-1.5 mb-8 sm:mb-10 md:mb-12">
          <span className="text-[12px] sm:text-[13px] font-sans font-semibold text-[#2c2420]">4.9</span>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <FiStar key={s} className="text-[10px] sm:text-[11px] text-[#c5a47e] fill-[#c5a47e]" />
            ))}
          </div>
          <span className="text-[10px] sm:text-[11px] font-sans text-[#6b5e54]">2,847 verified reviews</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="border border-[#e5dfd8] rounded-sm p-4 sm:p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-0.5 mb-2.5 sm:mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <FiStar key={j} className="text-[9px] sm:text-[10px] text-[#c5a47e] fill-[#c5a47e]" />
                ))}
              </div>
              <p className="text-[10px] sm:text-[11px] font-sans text-[#6b5e54] leading-[1.7] mb-3 sm:mb-4">
                &quot;{r.text}&quot;
              </p>
              <div className="border-t border-[#e5dfd8] pt-2.5 sm:pt-3">
                <p className="text-[10px] sm:text-[11px] font-sans font-semibold text-[#2c2420] mb-0.5">{r.name}</p>
                <p className="text-[9px] sm:text-[10px] font-sans text-[#6b5e54]">{r.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
