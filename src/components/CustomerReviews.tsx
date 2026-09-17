"use client";

import { FiStar } from "react-icons/fi";

const reviews = [
  {
    text: "A true testament to finding fine jewelry online. The QA certification gave extra confidence that I made the right choice. The sapphire ring is beyond gorgeous. My wife couldn't stop smiling when she unwrapped it.",
    name: "YUKI T.",
    location: "Tokyo, Japan",
  },
  {
    text: "A true testament to finding fine jewelry online. The QA certification gave extra confidence that I made the right choice. The sapphire ring is beyond gorgeous. My wife couldn't stop smiling when she unwrapped it.",
    name: "YUKI T.",
    location: "Tokyo, Japan",
  },
  {
    text: "A true testament to finding fine jewelry online. The QA certification gave extra confidence that I made the right choice. The sapphire ring is beyond gorgeous. My wife couldn't stop smiling when she unwrapped it.",
    name: "YUKI T.",
    location: "Tokyo, Japan",
  },
  {
    text: "A true testament to finding fine jewelry online. The QA certification gave extra confidence that I made the right choice. The sapphire ring is beyond gorgeous. My wife couldn't stop smiling when she unwrapped it.",
    name: "YUKI T.",
    location: "Tokyo, Japan",
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-14 md:py-18 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <p className="text-center text-[10px] md:text-[11px] font-sans tracking-[0.22em] text-[#6b5e54] uppercase mb-2">
          Customer Reviews
        </p>
        <h2 className="text-center text-[28px] md:text-[34px] lg:text-[38px] font-serif font-light text-[#2c2420] mb-4">
          What Our Customers Say
        </h2>
        <div className="flex items-center justify-center gap-1.5 mb-10 md:mb-12">
          <span className="text-[13px] font-sans font-semibold text-[#2c2420]">4.9</span>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <FiStar key={s} className="text-[11px] text-[#c5a47e] fill-[#c5a47e]" />
            ))}
          </div>
          <span className="text-[11px] font-sans text-[#6b5e54]">2,847 verified reviews</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="border border-[#e5dfd8] rounded-sm p-5">
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <FiStar key={j} className="text-[10px] text-[#c5a47e] fill-[#c5a47e]" />
                ))}
              </div>
              <p className="text-[10px] font-sans text-[#6b5e54] leading-[1.7] mb-4">
                &quot;{r.text}&quot;
              </p>
              <div className="border-t border-[#e5dfd8] pt-3">
                <p className="text-[11px] font-sans font-semibold text-[#2c2420] mb-0.5">{r.name}</p>
                <p className="text-[10px] font-sans text-[#6b5e54] mb-1.5">{r.location}</p>
                <p className="text-[10px] font-sans text-[#6b5e54] mb-0.5">&#10003; Read More</p>
                <p className="text-[10px] font-sans text-[#c5a47e]">&#10003; Verified Purchase</p>
              </div>
            </div>
          ))}
        </div>

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
