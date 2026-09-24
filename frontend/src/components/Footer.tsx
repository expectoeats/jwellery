"use client";

import Link from "next/link";
import { FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import { FaFacebookF, FaPinterestP } from "react-icons/fa";

const shopLinks = [
  { label: "All Jewelry", href: "/collections" },
  { label: "Rings", href: "/collections" },
  { label: "Pendants", href: "/collections" },
  { label: "Earrings", href: "/collections" },
  { label: "Bangles", href: "/collections" },
];
const careLinks = [
  { label: "Shipping Guide", href: "/contact" },
  { label: "Returns & Exchange", href: "/contact" },
  { label: "FAQs", href: "/contact" },
  { label: "Contact Us", href: "/contact" },
];
const companyLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Store Locator", href: "/contact" },
];
const socials = [
  { icon: FiInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: FiTwitter, label: "X", href: "https://twitter.com" },
  { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
  { icon: FiYoutube, label: "YouTube", href: "https://youtube.com" },
  { icon: FaPinterestP, label: "Pinterest", href: "https://pinterest.com" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2c2420] text-white">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 pt-10 sm:pt-14 pb-6 sm:pb-8">
        {/* Logo */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <img src="/logo.jpeg" alt="Aura Gems" className="h-[40px] sm:h-[48px] md:h-[56px] object-contain" />
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10">
          <div>
            <h4 className="text-[10px] font-sans tracking-[0.18em] font-semibold uppercase mb-3 sm:mb-4 text-white/80">Shop</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[11px] font-sans text-white/50 hover:text-white transition-colors py-0.5 block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-sans tracking-[0.18em] font-semibold uppercase mb-3 sm:mb-4 text-white/80">Customer Care</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {careLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[11px] font-sans text-white/50 hover:text-white transition-colors py-0.5 block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-sans tracking-[0.18em] font-semibold uppercase mb-3 sm:mb-4 text-white/80">Company</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[11px] font-sans text-white/50 hover:text-white transition-colors py-0.5 block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-sans tracking-[0.18em] font-semibold uppercase mb-3 sm:mb-4 text-white/80">Legal</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><Link href="#" className="text-[11px] font-sans text-white/50 hover:text-white transition-colors py-0.5 block">Privacy Policy</Link></li>
              <li><Link href="#" className="text-[11px] font-sans text-white/50 hover:text-white transition-colors py-0.5 block">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="h-[1px] bg-white/10 mb-5 sm:mb-6" />

        {/* Social */}
        <div className="flex items-center justify-center gap-4 sm:gap-5 md:gap-7 mb-5 sm:mb-6">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-auto sm:h-auto flex items-center justify-center sm:justify-start gap-1.5 text-white/50 hover:text-white transition-colors"
              aria-label={label}
            >
              <Icon className="text-[14px] sm:text-[13px]" />
              <span className="text-[10px] font-sans hidden sm:inline">{label}</span>
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <p className="text-[9px] font-sans text-white/40 tracking-wide text-center sm:text-left">
            &copy; 2026 AURA GEMS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
            {["VISA", "MC", "AMEX"].map((m) => (
              <span key={m} className="text-[8px] sm:text-[9px] font-sans text-white/35 tracking-wider border border-white/15 px-1.5 sm:px-2 py-0.5 rounded-sm">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
