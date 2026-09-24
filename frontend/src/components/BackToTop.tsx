"use client";

import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-11 h-11 sm:w-10 sm:h-10 bg-[#2c2420] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#c5a47e] active:scale-90 transition-all"
      aria-label="Back to top"
    >
      <FiArrowUp className="text-[16px]" />
    </button>
  );
}
