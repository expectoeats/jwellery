"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-10 sm:py-14 md:py-18 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="border-t border-[#e5dfd8] pt-10 sm:pt-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
            <div>
              <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] text-[#6b5e54] uppercase mb-2 sm:mb-3">
                JOIN THE AURA GEMS
              </p>
              <h2 className="text-[24px] sm:text-[28px] md:text-[34px] lg:text-[38px] font-serif font-light text-[#2c2420] leading-tight">
                Inspired by nature.{" "}
                <span className="italic">Reserved</span>{" "}
                for you
              </h2>
              <p className="text-[11px] sm:text-[12px] font-sans text-[#6b5e54] mt-2 sm:mt-3 leading-relaxed">
                Subscribe for exclusive offers, new arrivals, and jewelry inspiration.
              </p>
            </div>

            <div className="lg:pt-6">
              <form onSubmit={handleSubscribe}>
                <div className="flex flex-col sm:flex-row sm:items-center border border-[#e5dfd8] overflow-hidden">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                    className="flex-1 px-4 sm:px-5 text-[12px] font-sans text-[#2c2420] placeholder:text-[#6b5e54] outline-none bg-transparent h-11 sm:h-[46px]"
                  />
                  <button
                    type="submit"
                    className={`h-11 sm:h-[46px] px-6 sm:px-7 text-[11px] font-sans font-medium tracking-[0.1em] uppercase transition-colors shrink-0 ${
                      subscribed
                        ? "bg-green-600 text-white"
                        : "bg-[#c5a47e] text-white hover:bg-[#b08d5e] active:bg-[#9a7a4e]"
                    }`}
                  >
                    {subscribed ? "Subscribed!" : "Subscribe"}
                  </button>
                </div>
              </form>
              <p className="text-[10px] font-sans text-[#6b5e54] mt-2.5 sm:mt-3 leading-relaxed">
                By subscribing, you agree to receive curated communications from us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
