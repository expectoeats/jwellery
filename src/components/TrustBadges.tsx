"use client";

import { FiTruck, FiShield, FiRefreshCw, FiCreditCard } from "react-icons/fi";

const badges = [
  { icon: FiTruck, title: "Free Shipping", desc: "On orders above ₹5,000" },
  { icon: FiShield, title: "Lifetime Warranty", desc: "On all jewelry" },
  { icon: FiRefreshCw, title: "Easy Returns", desc: "30-day return policy" },
  { icon: FiCreditCard, title: "Secure Payment", desc: "100% secure checkout" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-[#e5dfd8] bg-[#f8f5f1]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-5 sm:py-6 md:py-8">
          {badges.map((badge) => (
            <div key={badge.title} className="flex items-center gap-2.5 sm:gap-3 justify-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <badge.icon className="text-[14px] sm:text-[16px] text-[#c5a47e]" />
              </div>
              <div>
                <p className="text-[10px] sm:text-[11px] font-sans font-semibold text-[#2c2420]">{badge.title}</p>
                <p className="text-[9px] sm:text-[10px] font-sans text-[#6b5e54]">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
