"use client";

import { useState } from "react";
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiMapPin } from "react-icons/fi";
import { FaGem } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "New Arrival", hasGem: true },
  { label: "Best Sellers", hasGem: false },
  { label: "Our Story", hasGem: false },
  { label: "Collections", hasGem: false },
  { label: "Rings", hasGem: false },
  { label: "Earrings", hasGem: false },
  { label: "Pendants", hasGem: false },
  { label: "Bangles", hasGem: false },
  { label: "Happy Customers", hasGem: false },
  { label: "Contact us", hasGem: false },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-[56px] md:h-[62px] border-b border-[#e5dfd8]">
          {/* Left - Location */}
          <div className="flex items-center gap-1.5 min-w-[80px]">
            <FiMapPin className="text-[13px] text-[#2c2420]" />
            <span className="text-[11px] font-sans text-[#2c2420] tracking-wide">Thailand</span>
          </div>

          {/* Center - Logo */}
          <a href="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="text-[22px] md:text-[26px] lg:text-[28px] tracking-[0.12em] font-serif font-light text-[#2c2420] whitespace-nowrap">
              PASSIONE JEWELRY
            </span>
          </a>

          {/* Right - Icons */}
          <div className="flex items-center gap-3 md:gap-4 min-w-[80px] justify-end">
            <div className="hidden lg:flex items-center gap-2 border border-[#e5dfd8] rounded-full px-4 py-[7px]">
              <FiSearch className="text-[12px] text-[#6b5e54]" />
              <input
                type="text"
                placeholder="Search rings, pendants, earrings..."
                className="bg-transparent text-[11px] font-sans text-[#2c2420] placeholder:text-[#6b5e54] outline-none w-[200px]"
              />
            </div>
            <button className="lg:hidden text-[#2c2420]">
              <FiSearch className="text-[17px]" />
            </button>
            <button className="text-[#2c2420] hover:text-[#c5a47e] transition-colors">
              <FiUser className="text-[17px]" />
            </button>
            <button className="text-[#2c2420] hover:text-[#c5a47e] transition-colors">
              <FiHeart className="text-[17px]" />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="text-[#2c2420] hover:text-[#c5a47e] transition-colors relative"
            >
              <FiShoppingBag className="text-[17px]" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#c5a47e] text-white text-[9px] font-sans font-semibold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block border-b border-[#e5dfd8]">
          <ul className="flex items-center justify-center gap-6 lg:gap-8 h-[42px]">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href="#"
                  className="flex items-center gap-1 text-[11px] font-sans font-medium text-[#2c2420] hover:text-[#c5a47e] transition-colors tracking-[0.04em] uppercase whitespace-nowrap"
                >
                  {link.hasGem && <FaGem className="text-[8px] text-[#c5a47e]" />}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden fixed bottom-5 right-5 z-50 bg-[#2c2420] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[56px] z-40 bg-white overflow-y-auto">
          <ul className="flex flex-col p-6 gap-5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href="#" className="flex items-center gap-2 text-sm font-sans font-medium text-[#2c2420] uppercase tracking-wide">
                  {link.hasGem && <FaGem className="text-[10px] text-[#c5a47e]" />}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
