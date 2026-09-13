"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FiSearch,
  FiHeart,
  FiUser,
  FiShoppingBag,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiArrowRight,
  FiCheck,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";

export default function Home() {
  const [activeNav, setActiveNav] = useState("New Arrival");
  const [wishlist, setWishlist] = useState<{ [key: number]: boolean }>({});
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const navLinks = [
    "New Arrival",
    "Best Sellers",
    "Our Story",
    "Collections",
    "Rings",
    "Earrings",
    "Pendants",
    "Bangles",
    "Aura Gemstones",
    "Contact us",
  ];

  const signaturePieces = [
    {
      id: 1,
      title: "Opal & Brilliant Drop Tourmaline Earrings",
      subtitle: "Opal & Petite Drop Earrings - Raw Peacock Stone Statement Earrings",
      image: "https://media.angara.com/angara/promotion/banners/solitaire-jewellery-desktop-banner_2.jpg?width=1440&quality=85&auto=avif,webp",
    },
    {
      id: 2,
      title: "Mystic Malachite Earrings",
      subtitle: "Rutilated Quartz - Strength Magic Transformation",
      image: "https://media.angara.com/angara/promotion/banners/mens-jewellery-desktop-banner.jpg?width=1440&quality=85&auto=avif,webp",
    },
    {
      id: 3,
      title: "Pink Tourmaline & Pyrite Drop Earrings",
      subtitle: "Pink Tourmaline & Pyrite Statement Earrings - Minimalist Drop & Raw Gold Tone Dangle Earrings",
      image: "https://media.angara.com/angara/promotion/banners/tennis-bracelets-dektop-banner.jpg?width=1440&quality=85&auto=avif,webp",
    },
    {
      id: 4,
      title: "Rustic & Burned Earrings",
      subtitle: "Golden Radiated Quartz Earrings with Raw Iron Texture Hoops",
      image: "https://media.angara.com/angara/promotion/banners/tennis-bracelets-dektop-banner.jpg?width=1440&quality=85&auto=avif,webp",
    },
  ];

  const categories = [
    {
      name: "Rings",
      image: "https://media.angara.com/angara/promotion/banners/tennis-bracelets-dektop-banner.jpg?width=1440&quality=85&auto=avif,webp",
    },
    {
      name: "Pendants",
      image: "https://media.angara.com/angara/promotion/banners/tennis-bracelets-dektop-banner.jpg?width=1440&quality=85&auto=avif,webp",
    },
    {
      name: "Bangles",
      image: "https://media.angara.com/angara/promotion/banners/gemstone_jewellery_desktop_section_banner.jpg?width=1440&quality=85&auto=avif,webp",
    },
    {
      name: "Earrings",
      image: "https://media.angara.com/angara/promotion/banners/gemstone_jewellery_desktop_section_banner.jpg?width=1440&quality=85&auto=avif,webp",
    },
  ];

  const reviews = [
    {
      id: 1,
      quote:
        "I was wary of purchasing fine jewelry online for the first time, but Evermore gave me complete confidence. The aquamarine ring is beyond gorgeous, the stones so crisp and shiny. Worth every single cent!",
      author: "Adarsh.",
      location: "India",
      item: "Blue Moon Sapphire Bangle",
    },
    {
      id: 2,
      quote:
        "I was wary of purchasing fine jewelry online for the first time, but Evermore gave me complete confidence. The sapphire ring is beyond gorgeous, the stones so crisp and shiny. Worth every single cent!",
      author: "Adarsh.",
      location: "India",
      item: "Blue Moon Sapphire Bangle",
    },
    {
      id: 3,
      quote:
        "I was wary of purchasing fine jewelry online for the first time, but Evermore gave me complete confidence. The tourmaline ring is beyond gorgeous, the stones so crisp and shiny. Worth every single cent!",
      author: "Adarsh.",
      location: "India",
      item: "Blue Moon Sapphire Bangle",
    },
    {
      id: 4,
      quote:
        "I was wary of purchasing fine jewelry online for the first time, but Evermore gave me complete confidence. The tourmaline ring is beyond gorgeous, the stones so crisp and shiny. Worth every single cent!",
      author: "Adarsh.",
      location: "India",
      item: "Blue Moon Sapphire Bangle",
    },
    {
      id: 5,
      quote:
        "I was wary of purchasing fine jewelry online for the first time, but Evermore gave me complete confidence. The sapphire ring is beyond gorgeous, the stones so crisp and shiny. Worth every single cent!",
      author: "Adarsh.",
      location: "India",
      item: "Blue Moon Sapphire Bangle",
    },
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-white text-neutral-900 selection:bg-neutral-200 flex flex-col">
      {/* =========================================================================
          1. HEADER & TOP NAVIGATION
      ========================================================================= */}
      <header className="w-full bg-white border-b border-neutral-100 sticky top-0 z-50">
        {/* Main Header Row */}
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Hamburger (Mobile) / Region Pill (Desktop) */}
          <div className="flex items-center gap-2 flex-1 justify-start">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
              className="lg:hidden p-1.5 text-neutral-800 hover:text-black transition-colors"
            >
              <FiMenu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 text-xs text-neutral-700 hover:border-neutral-400 transition-colors">
              <span className="w-3.5 h-3.5 rounded-full bg-red-600 inline-block ring-1 ring-neutral-200"></span>
              <span className="font-medium">Thailand</span>
              <FiChevronDown className="w-3 h-3 text-neutral-500" />
            </button>
          </div>

          {/* Center: Brand Logo (Scales fluidly on mobile) */}
          <div className="text-center flex-shrink-0 px-1 max-w-[55vw] sm:max-w-none">
            <a href="#" className="block">
              <h1 className="font-serif text-sm xs:text-base sm:text-2xl md:text-3xl font-black tracking-[0.12em] sm:tracking-[0.18em] uppercase text-neutral-900 truncate leading-tight">
                EVERMORE JEWELRY
              </h1>
            </a>
          </div>

          {/* Right: Search + Action Icons */}
          <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3.5">
            {/* Desktop Search Input */}
            <div className="relative hidden md:block w-44 lg:w-64">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-3 pr-8 py-1.5 text-xs rounded-full border border-neutral-200 bg-neutral-50/50 text-neutral-700 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-all"
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
            </div>

            {/* Mobile Search Toggle Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="md:hidden p-1 text-neutral-700 hover:text-black transition-colors"
            >
              <FiSearch className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              aria-label="Wishlist"
              className="p-1 text-neutral-700 hover:text-black transition-colors"
            >
              <FiHeart className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* User Account Icon */}
            <button
              aria-label="Account"
              className="hidden sm:inline-block p-1 text-neutral-700 hover:text-black transition-colors"
            >
              <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Shopping Bag Icon with Count */}
            <button
              aria-label="Shopping Bag"
              className="p-1 text-neutral-700 hover:text-black transition-colors relative"
            >
              <FiShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-neutral-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Expandable Search Bar */}
        {searchOpen && (
          <div className="md:hidden px-4 py-2 border-t border-neutral-100 bg-neutral-50">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search jewelry, gemstones..."
                autoFocus
                className="w-full pl-3 pr-8 py-2 text-xs rounded-full border border-neutral-300 bg-white text-neutral-800 focus:outline-none focus:border-neutral-800"
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
            </div>
          </div>
        )}

        {/* Desktop Navigation Menu */}
        <nav className="border-t border-neutral-100 hidden lg:block overflow-x-auto no-scrollbar">
          <ul className="max-w-[1440px] mx-auto px-4 py-2.5 flex items-center justify-center gap-7 text-[11px] uppercase tracking-[0.14em] text-neutral-600 font-medium">
            {navLinks.map((link) => (
              <li key={link}>
                <button
                  onClick={() => setActiveNav(link)}
                  className={`transition-colors whitespace-nowrap hover:text-black ${
                    activeNav === link
                      ? "text-black font-semibold flex items-center gap-1.5"
                      : ""
                  }`}
                >
                  {activeNav === link && (
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block"></span>
                  )}
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />
          <div className="absolute left-0 top-0 bottom-0 w-[80vw] max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <span className="font-serif text-base font-black tracking-widest uppercase text-neutral-900">
                  EVERMORE
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-1 text-neutral-500 hover:text-black"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <ul className="py-5 space-y-3.5">
                {navLinks.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        setActiveNav(link);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left w-full text-xs uppercase tracking-wider py-1 transition-colors ${
                        activeNav === link
                          ? "font-bold text-black flex items-center justify-between"
                          : "text-neutral-600 hover:text-black"
                      }`}
                    >
                      <span>{link}</span>
                      {activeNav === link && (
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900"></span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-red-600 inline-block ring-1 ring-neutral-200"></span>
                <span className="font-medium text-neutral-800">Thailand (THB ฿)</span>
              </div>
              <p className="text-[10px] text-neutral-400">© 2026 EVERMORE JEWELRY</p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. HERO BANNER SECTION
      ========================================================================= */}
      <section className="relative w-full bg-neutral-950 overflow-hidden">
        {/* Hero Background Image */}
        <div className="relative w-full min-h-[460px] sm:min-h-[560px] md:min-h-[640px] lg:min-h-[720px] flex items-center">
          <Image
            src="https://media.angara.com/angara/promotion/banners/silver_jewellery_desktop_banner.jpg?width=1440&quality=85&auto=avif,webp"
            alt="Jewels Born from Nature's Own Hand"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.88] contrast-[1.05]"
          />

          {/* Radial & Gradient Overlays for Editorial Mood */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20 sm:to-transparent pointer-events-none" />

          {/* Hero Content Box (Positioned on Left) */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 py-12 sm:py-20">
            <div className="max-w-xl text-white">
              {/* Main Headline */}
              <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl lg:text-[56px] font-medium leading-[1.14] tracking-tight mb-2 sm:mb-4 text-white drop-shadow-sm">
                Jewels Born from <br />
                Nature&apos;s Own Hand
              </h2>

              {/* Subhead */}
              <h3 className="font-serif text-sm xs:text-base sm:text-xl md:text-2xl text-neutral-200 font-normal mb-3 sm:mb-5 leading-snug">
                Handcrafted in Thailand&apos;s <br />
                Ancient gem capital
              </h3>

              {/* Paragraph details */}
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6 sm:mb-8 max-w-md">
                Every piece is an unrepeatable testament to nature&apos;s artistry. Handcrafted by master artisans in the historic gem capital of Southeast Asia.
              </p>

              {/* CTA Link with Arrow */}
              <a
                href="#signature"
                className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-[0.18em] uppercase font-semibold text-white hover:text-amber-200 transition-colors group"
              >
                <span>View Collection</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">
                  &rarr;
                </span>
              </a>
            </div>
          </div>

          {/* Carousel Side Navigation Arrows */}
          <button
            aria-label="Previous Slide"
            className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white p-2 transition-colors"
          >
            <FiChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-1" />
          </button>
          <button
            aria-label="Next Slide"
            className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white p-2 transition-colors"
          >
            <FiChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-1" />
          </button>

          {/* Pagination Indicators Bottom Left */}
          <div className="absolute bottom-5 left-5 sm:left-12 lg:left-16 z-20 flex items-center gap-2">
            <span className="w-5 h-0.5 bg-white"></span>
            <span className="w-2 h-0.5 bg-white/40"></span>
            <span className="w-2 h-0.5 bg-white/40"></span>
            <span className="w-2 h-0.5 bg-white/40"></span>
            <span className="w-2 h-0.5 bg-white/40"></span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SIGNATURE PIECES OR TIMELESS FAVORITES (Swipeable on Mobile)
      ========================================================================= */}
      <section id="signature" className="py-12 sm:py-20 lg:py-24 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-14">
          <h2 className="font-serif text-base sm:text-xl md:text-2xl font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-neutral-900">
            SIGNATURE PIECES OR TIMELESS FAVORITES
          </h2>
        </div>

        {/* Product Cards: Swipeable scroll on Mobile, 4-Col Grid on Desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto sm:overflow-visible no-scrollbar snap-x snap-mandatory pb-4 sm:pb-0">
          {signaturePieces.map((piece) => (
            <div
              key={piece.id}
              className="group flex flex-col w-[72vw] xs:w-[65vw] sm:w-auto shrink-0 snap-start"
            >
              {/* Image Container with Subtle Elevation */}
              <div className="relative aspect-[4/5] w-full bg-[#f4f7f9] overflow-hidden rounded-sm border border-neutral-100">
                <Image
                  src={piece.image}
                  alt={piece.title}
                  fill
                  sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Top-Right Heart Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(piece.id)}
                  aria-label="Wishlist"
                  className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-600 hover:text-red-500 shadow-sm transition-all"
                >
                  <FiHeart
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                      wishlist[piece.id]
                        ? "fill-red-500 text-red-500"
                        : "text-neutral-600"
                    }`}
                  />
                </button>
              </div>

              {/* Product Info Below */}
              <div className="text-center mt-3 sm:mt-4 px-1 flex flex-col flex-grow">
                <h3 className="font-serif text-xs sm:text-sm font-semibold text-neutral-900 leading-snug mb-1 group-hover:text-amber-800 transition-colors">
                  {piece.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-neutral-500 font-light leading-relaxed line-clamp-2">
                  {piece.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Bottom Navigation Track with Arrows */}
        <div className="flex items-center justify-center gap-4 mt-8 sm:mt-14">
          <button
            aria-label="Previous"
            className="p-1 text-neutral-400 hover:text-neutral-800 transition-colors"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-28 sm:w-48 h-[1.5px] bg-neutral-200 relative rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-1/3 bg-neutral-900 rounded-full"></div>
          </div>
          <button
            aria-label="Next"
            className="p-1 text-neutral-400 hover:text-neutral-800 transition-colors"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          4. SHOP BY CATEGORY
      ========================================================================= */}
      <section className="py-12 sm:py-18 lg:py-20 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 border-t border-neutral-100">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-serif text-base sm:text-xl md:text-2xl font-bold tracking-[0.16em] sm:tracking-[0.18em] uppercase text-neutral-900">
            SHOP BY CATEGORY
          </h2>
        </div>

        {/* 4-Column Category Grid (2 columns on mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href={`#${cat.name.toLowerCase()}`}
              className="group flex flex-col items-center"
            >
              {/* Category Image Box */}
              <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden rounded-sm border border-neutral-100">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Category Label */}
              <span className="mt-2.5 sm:mt-3.5 font-serif text-xs sm:text-sm md:text-base font-medium text-neutral-900 tracking-wider group-hover:text-amber-800 transition-colors">
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. PETAL & STONE SPLIT SHOWCASE SECTION
      ========================================================================= */}
      <section className="w-full bg-[#fbfbfb] border-t border-b border-neutral-100 my-10 sm:my-16 lg:my-20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Left Column: Image */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-square bg-neutral-950 overflow-hidden">
            <Image
              src="https://cdn.caratlane.com/media/static/images/V4/2026/08_AUG/Banner/TC/01/Square_Desktop.jpg"
              alt="Petal & Stone Collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* Right Column: Editorial Content */}
          <div className="p-7 sm:p-12 lg:p-20 text-center flex flex-col items-center justify-center">
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight mb-3 sm:mb-4">
              Petal & Stone
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-md mx-auto mb-6 sm:mb-8">
              A sanctuary of fine natural stones and enduring grace, crafted into timeless jewelry that blends calmness with strength.
            </p>
            <a
              href="#explore"
              className="inline-block font-serif text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 border-b border-neutral-400 pb-1 hover:border-black hover:text-black transition-all"
            >
              Explore The Collection &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CUSTOMER REVIEWS (Swipeable on Mobile)
      ========================================================================= */}
      <section className="py-12 sm:py-20 lg:py-24 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-14">
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase mb-1.5">
            CUSTOMER REVIEWS
          </p>
          <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-normal text-neutral-900 mb-2 sm:mb-3">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-600 font-medium">
            <span>4.9</span>
            <div className="flex text-amber-500 text-[10px] sm:text-[11px]">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <span className="text-neutral-400 text-[11px]">2,947 verified reviews</span>
          </div>
        </div>

        {/* 5-Card Grid (Swipeable scroll on mobile) */}
        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 overflow-x-auto sm:overflow-visible no-scrollbar snap-x snap-mandatory pb-4 sm:pb-0">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 sm:p-5 bg-white border border-neutral-100 rounded-sm shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between w-[70vw] xs:w-[60vw] sm:w-auto shrink-0 snap-start"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex text-amber-500 text-[9px] sm:text-[10px] mb-2.5">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                {/* Quote Text */}
                <p className="text-[10px] sm:text-[11px] text-neutral-600 font-light leading-relaxed mb-4">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-2.5 border-t border-neutral-100 text-[9px] sm:text-[10px]">
                <p className="font-bold text-neutral-900 tracking-wider">
                  {rev.author} - {rev.location}
                </p>
                <p className="text-neutral-500 mt-0.5">{rev.item}</p>
                <p className="text-emerald-700 font-medium mt-1 flex items-center gap-1">
                  <FiCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-2" />
                  Verified Purchase
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Navigation Track */}
        <div className="flex items-center justify-center gap-4 mt-8 sm:mt-12">
          <button
            aria-label="Previous Reviews"
            className="p-1 text-neutral-400 hover:text-neutral-800 transition-colors"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-28 sm:w-48 h-[1.5px] bg-neutral-200 relative rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-1/4 bg-neutral-900 rounded-full"></div>
          </div>
          <button
            aria-label="Next Reviews"
            className="p-1 text-neutral-400 hover:text-neutral-800 transition-colors"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          7. NEWSLETTER / JOIN THE PASSIONE SECTION
      ========================================================================= */}
      <section className="py-12 sm:py-16 lg:py-20 border-t border-neutral-100 bg-[#fafafa]">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Left Text */}
          <div className="text-center lg:text-left">
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-neutral-400 uppercase mb-1">
              JOIN EVERMORE
            </p>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900 font-normal mb-1.5">
              Inspired by nature, Reserved for you
            </h3>
            <p className="text-[10px] sm:text-[11px] text-neutral-400 font-light">
              By Subscribing You Agree To Receive Curated Communications From Us.
            </p>
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-700 bg-emerald-50 px-5 py-3 rounded-sm border border-emerald-200">
                <FiCheck className="w-4 h-4" />
                <span>Thank you for subscribing to Evermore.</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubscribed(true);
                }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-[460px]"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER EMAIL ADDRESS"
                  required
                  className="flex-grow px-4 py-2.5 sm:py-3 bg-white border border-neutral-300 text-xs text-neutral-800 placeholder-neutral-400 tracking-wider focus:outline-none focus:border-neutral-900 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#9b783e] via-[#b8954f] to-[#8d6932] hover:brightness-110 text-white text-xs tracking-[0.16em] uppercase font-semibold transition-all shadow-sm flex-shrink-0"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. DARK LUXURY FOOTER
      ========================================================================= */}
      <footer className="w-full bg-[#111111] text-[#b3b3b3] pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 mt-auto">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* 4 Link Columns (2 cols on mobile, 4 on desktop) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 pb-10 sm:pb-16 border-b border-neutral-800">
            {/* Column 1: SHOP */}
            <div>
              <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-white mb-3 sm:mb-5">
                SHOP
              </h4>
              <ul className="space-y-2 text-[10px] sm:text-[11px] font-light text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">All Jewelry</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rings</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Earrings</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pendants</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bangles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              </ul>
            </div>

            {/* Column 2: CUSTOMER CARE */}
            <div>
              <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-white mb-3 sm:mb-5">
                CUSTOMER CARE
              </h4>
              <ul className="space-y-2 text-[10px] sm:text-[11px] font-light text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Track My Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sizing Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Care Instructions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Column 3: COMPANY */}
            <div>
              <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-white mb-3 sm:mb-5">
                COMPANY
              </h4>
              <ul className="space-y-2 text-[10px] sm:text-[11px] font-light text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ethical Sourcing</a></li>
              </ul>
            </div>

            {/* Column 4: LEGAL */}
            <div>
              <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-white mb-3 sm:mb-5">
                LEGAL
              </h4>
              <ul className="space-y-2 text-[10px] sm:text-[11px] font-light text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessibility Statement</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">International Orders</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright, Monogram PJ/EJ, and Social Links */}
          <div className="pt-6 sm:pt-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-[9px] sm:text-[10px] text-neutral-500">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="tracking-wider">
                © 2026 EVERMORE JEWELRY CO. LTD.
              </p>
            </div>

            {/* Center Monogram Logo */}
            <div className="flex items-center justify-center">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.25em] text-white opacity-90">
                EJ
              </span>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 tracking-wider uppercase text-neutral-400">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">• Facebook</a>
              <a href="#" className="hover:text-white transition-colors">Pinterest</a>
              <a href="#" className="hover:text-white transition-colors">YouTube</a>
              <a href="#" className="hover:text-white transition-colors">TikTok</a>
            </div>
          </div>

          {/* Payment Badges List */}
          <div className="mt-6 sm:mt-8 text-center text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.25em] text-neutral-600 uppercase">
            <span>VISA • MASTERCARD • AMERICAN EXPRESS • PAYPAL • APPLE PAY</span>
          </div>
        </div>
      </footer>
    </div>
  );
}


