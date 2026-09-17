"use client";

import { FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import { FaFacebookF, FaPinterestP } from "react-icons/fa";

const shopLinks = ["All Jewelry", "Rings", "Pendants", "Earrings", "Bangles", "Best Sellers", "New Arrivals"];
const careLinks = ["All Details", "Returns & Exchange", "Shipping Guide", "Customer Reviews", "FAQs", "Contact Us"];
const companyLinks = ["Our Story", "Happy Customers"];
const legalLinks = ["Privacy Policy", "Terms & Conditions", "Accessibility Statement", "Sitemap", "Your Privacy Choices"];
const socials = [
  { icon: FiInstagram, label: "Instagram" },
  { icon: FiTwitter, label: "X(Twitter)" },
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FiYoutube, label: "YouTube" },
  { icon: FaPinterestP, label: "Pinterest" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2c2420] text-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-14 pb-8">
        <div className="flex justify-center mb-10">
          <span className="text-[48px] md:text-[56px] font-serif font-light italic text-white/90">Pj</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-10">
          <div>
            <h4 className="text-[10px] font-sans tracking-[0.18em] font-semibold uppercase mb-4 text-white/80">Shop</h4>
            <ul className="space-y-2">
              {shopLinks.map((l) => (
                <li key={l}><a href="#" className="text-[11px] font-sans text-white/50 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-sans tracking-[0.18em] font-semibold uppercase mb-4 text-white/80">Customer Care</h4>
            <ul className="space-y-2">
              {careLinks.map((l) => (
                <li key={l}><a href="#" className="text-[11px] font-sans text-white/50 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-sans tracking-[0.18em] font-semibold uppercase mb-4 text-white/80">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((l) => (
                <li key={l}><a href="#" className="text-[11px] font-sans text-white/50 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-sans tracking-[0.18em] font-semibold uppercase mb-4 text-white/80">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((l) => (
                <li key={l}><a href="#" className="text-[11px] font-sans text-white/50 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-[1px] bg-white/10 mb-6" />

        <div className="flex items-center justify-center gap-5 md:gap-7 mb-6">
          {socials.map(({ icon: Icon, label }) => (
            <a key={label} href="#" className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors">
              <Icon className="text-[13px]" />
              <span className="text-[10px] font-sans">{label}</span>
            </a>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[9px] font-sans text-white/40 tracking-wide">
            &copy; 2026 PASSIONE JEWELRY CO., LTD. BANGKOK, THAILAND
          </p>
          <div className="flex items-center gap-3">
            {["VISA", "MC", "AMEX", "JCB", "APPLE PAY"].map((m) => (
              <span key={m} className="text-[9px] font-sans text-white/35 tracking-wider">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
