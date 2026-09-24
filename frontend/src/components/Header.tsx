"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { FaGem } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const navLinks = [
  { label: "New Arrival", href: "/collections?filter=new", hasGem: true },
  { label: "Best Sellers", href: "/collections?filter=best-sellers" },
  { label: "Our Story", href: "/about" },
  { label: "Collections", href: "/collections" },
  { label: "Rings", href: "/collections?category=Rings" },
  { label: "Earrings", href: "/collections?category=Earrings" },
  { label: "Pendants", href: "/collections?category=Pendants" },
  { label: "Bangles", href: "/collections?category=Bangles" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [accountHref, setAccountHref] = useState("/login");
  const [accountLabel, setAccountLabel] = useState("My Account / Login");
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, setCartOpen } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    try {
      const stored = localStorage.getItem("aura-gems-user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u.role === "admin") {
          setAccountHref("/admin");
          setAccountLabel("Admin Dashboard");
        } else {
          setAccountHref("/account");
          setAccountLabel("My Account");
        }
      } else {
        setAccountHref("/login");
        setAccountLabel("Sign In");
      }
    } catch {
      setAccountHref("/login");
    }
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-[52px] md:h-[62px] border-b border-[#e5dfd8]">
          {/* Left - Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img src="/logo.jpeg" alt="Aura Gems" className="h-[32px] md:h-[42px] lg:h-[48px] object-contain" />
          </Link>

          {/* Right - Icons */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Desktop Search */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center gap-2 border border-[#e5dfd8] rounded-full px-4 py-[7px]">
              <button type="submit" aria-label="Submit search">
                <FiSearch className="text-[12px] text-[#6b5e54] hover:text-[#2c2420] transition-colors" />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rings, pendants, earrings..."
                className="bg-transparent text-[11px] font-sans text-[#2c2420] placeholder:text-[#6b5e54] outline-none w-[200px]"
              />
            </form>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center text-[#2c2420] -mr-1"
              aria-label="Search"
            >
              <FiSearch className="text-[18px]" />
            </button>

            <Link href={accountHref} className="text-[#2c2420] hover:text-[#c5a47e] transition-colors hidden sm:flex w-9 h-9 items-center justify-center" aria-label="Account">
              <FiUser className="text-[17px]" />
            </Link>

            <Link href="/wishlist" className="text-[#2c2420] hover:text-[#c5a47e] transition-colors relative w-9 h-9 flex items-center justify-center" aria-label="Wishlist">
              <FiHeart className="text-[17px]" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-[16px] h-[16px] bg-[#c5a47e] text-white text-[9px] font-sans font-semibold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="text-[#2c2420] hover:text-[#c5a47e] transition-colors relative w-9 h-9 flex items-center justify-center"
              aria-label="Cart"
            >
              <FiShoppingBag className="text-[17px]" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-[16px] h-[16px] bg-[#c5a47e] text-white text-[9px] font-sans font-semibold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-[#2c2420]"
              aria-label="Menu"
            >
              {mobileOpen ? <FiX className="text-[22px]" /> : <FiMenu className="text-[22px]" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${searchOpen ? "max-h-[60px] py-3" : "max-h-0"}`}>
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 border border-[#e5dfd8] rounded-full px-4 py-2.5">
            <button type="submit" aria-label="Submit search">
              <FiSearch className="text-[14px] text-[#6b5e54] shrink-0" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jewelry..."
              className="bg-transparent text-[13px] font-sans text-[#2c2420] placeholder:text-[#6b5e54] outline-none flex-1"
              autoFocus={searchOpen}
            />
          </form>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block border-b border-[#e5dfd8]">
          <ul className="flex items-center justify-center gap-6 lg:gap-8 h-[42px]">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-[11px] font-sans font-medium text-[#2c2420] hover:text-[#c5a47e] transition-colors tracking-[0.04em] uppercase whitespace-nowrap"
                >
                  {link.hasGem && <FaGem className="text-[8px] text-[#c5a47e]" />}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-[52px] border-b border-[#e5dfd8]">
          <span className="text-[14px] font-serif font-medium text-[#2c2420]">Menu</span>
          <button onClick={() => setMobileOpen(false)} className="w-8 h-8 flex items-center justify-center" aria-label="Close menu">
            <FiX className="text-[20px] text-[#2c2420]" />
          </button>
        </div>
        <nav className="overflow-y-auto h-[calc(100%-52px)]">
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-5 py-3.5 text-[13px] font-sans font-medium text-[#2c2420] hover:bg-[#f8f5f1] transition-colors border-b border-[#f0ede8]"
                >
                  {link.hasGem && <FaGem className="text-[9px] text-[#c5a47e]" />}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-5 py-6 border-t border-[#e5dfd8] mt-2">
            <Link
              href={accountHref}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 text-[13px] font-sans font-medium text-[#2c2420] mb-4"
            >
              <FiUser className="text-[15px]" />
              {accountLabel}
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 text-[13px] font-sans font-medium text-[#2c2420] mb-4"
            >
              <FiHeart className="text-[15px]" />
              Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block text-[11px] font-sans text-[#6b5e54] mb-2 hover:text-[#2c2420]"
            >
              Our Story
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-[11px] font-sans text-[#6b5e54] hover:text-[#2c2420]"
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
