"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-14 md:py-18 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start border-t border-[#e5dfd8] pt-14">
          <div>
            <p className="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#6b5e54] uppercase mb-3">
              JOIN THE PASSIONE
            </p>
            <h2 className="text-[28px] md:text-[34px] lg:text-[38px] font-serif font-light text-[#2c2420] leading-tight">
              Inspired by nature.{" "}
              <span className="italic">Reserved</span>{" "}
              for you
            </h2>
          </div>

          <div className="lg:pt-6">
            <div className="flex items-center border border-[#e5dfd8] rounded-sm overflow-hidden h-[46px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="flex-1 px-5 text-[12px] font-sans text-[#2c2420] placeholder:text-[#6b5e54] outline-none bg-transparent h-full"
              />
              <button className="px-7 h-full bg-[#c5a47e] text-white text-[11px] font-sans font-medium tracking-[0.1em] uppercase hover:bg-[#b08d5e] transition-colors shrink-0">
                Subscribe
              </button>
            </div>
            <p className="text-[10px] font-sans text-[#6b5e54] mt-3 leading-relaxed">
              By Subscribing, You Agree To Receive Curated Communications From Us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
