import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { FaGem } from "react-icons/fa";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#fcfbfa] min-h-[70vh] flex items-center justify-center py-16 px-5">
        <div className="max-w-[540px] text-center">
          <div className="w-16 h-16 rounded-full bg-[#f8f5f1] border border-[#e5dfd8] flex items-center justify-center mx-auto mb-6">
            <FaGem className="text-[24px] text-[#c5a47e]" />
          </div>

          <p className="text-[11px] font-sans font-medium tracking-[0.2em] text-[#c5a47e] uppercase mb-2">
            Error 404
          </p>

          <h1 className="text-[32px] sm:text-[40px] font-serif font-light text-[#2c2420] mb-3">
            Piece Not Found
          </h1>

          <p className="text-[13px] font-sans text-[#6b5e54] leading-[1.8] mb-8 max-w-[420px] mx-auto">
            The page you are looking for may have been moved, renamed, or is temporarily unavailable. Let us help you find what you love.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link
              href="/"
              className="w-full sm:w-auto h-11 px-8 bg-[#2c2420] text-white text-[11px] font-sans font-medium tracking-[0.12em] uppercase hover:bg-[#1a1614] transition-colors flex items-center justify-center"
            >
              Back to Home
            </Link>
            <Link
              href="/collections"
              className="w-full sm:w-auto h-11 px-8 border border-[#2c2420] text-[#2c2420] text-[11px] font-sans font-medium tracking-[0.12em] uppercase hover:bg-[#2c2420] hover:text-white transition-colors flex items-center justify-center"
            >
              Explore Collections
            </Link>
          </div>

          <div className="pt-8 border-t border-[#e5dfd8]">
            <p className="text-[11px] font-sans uppercase tracking-wider text-[#6b5e54] mb-3">
              Popular Categories
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-[12px] font-sans">
              <Link href="/collections?category=Rings" className="text-[#2c2420] hover:text-[#c5a47e] transition-colors">
                Rings
              </Link>
              <span className="text-[#e5dfd8]">•</span>
              <Link href="/collections?category=Earrings" className="text-[#2c2420] hover:text-[#c5a47e] transition-colors">
                Earrings
              </Link>
              <span className="text-[#e5dfd8]">•</span>
              <Link href="/collections?category=Pendants" className="text-[#2c2420] hover:text-[#c5a47e] transition-colors">
                Pendants
              </Link>
              <span className="text-[#e5dfd8]">•</span>
              <Link href="/contact" className="text-[#2c2420] hover:text-[#c5a47e] transition-colors">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
