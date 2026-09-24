"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BackToTop from "@/components/BackToTop";
import CartDrawer from "@/components/CartDrawer";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { FiHeart, FiTrash2, FiShoppingBag } from "react-icons/fi";
import Link from "next/link";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (product: typeof items[0]) => {
    addItem(product, product.sizes[0], product.metalOptions[0].label);
    removeItem(product.id);
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-white min-h-[60vh]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "Wishlist" }]} />

          <h1 className="text-[24px] sm:text-[28px] md:text-[34px] font-serif font-light text-[#2c2420] mb-1.5 sm:mb-2">
            My Wishlist
          </h1>
          <p className="text-[11px] sm:text-[12px] font-sans text-[#6b5e54] mb-8 sm:mb-10">
            {items.length} item{items.length !== 1 ? "s" : ""} saved
          </p>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f8f5f1] flex items-center justify-center mb-4 sm:mb-5">
                <FiHeart className="text-[24px] sm:text-[28px] text-[#e5dfd8]" />
              </div>
              <h2 className="text-[16px] sm:text-[18px] font-serif text-[#2c2420] mb-1.5 sm:mb-2">Your wishlist is empty</h2>
              <p className="text-[11px] sm:text-[12px] font-sans text-[#6b5e54] mb-5 sm:mb-6 max-w-[280px] sm:max-w-[300px]">
                Save your favorite pieces here to revisit them later.
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center h-10 px-6 bg-[#2c2420] text-white text-[11px] font-sans font-medium tracking-[0.12em] uppercase hover:bg-[#1a1614] active:bg-[#0d0b0a] transition-colors"
              >
                Explore Collections
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 pb-12 sm:pb-16">
              {items.map((product) => (
                <div key={product.id} className="group">
                  <Link href={`/product/${product.id}`}>
                    <div className="relative overflow-hidden bg-[#f8f5f1] mb-2.5 sm:mb-3 aspect-[3/4]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  </Link>

                  <div className="flex items-start justify-between gap-1.5 sm:gap-2">
                    <Link href={`/product/${product.id}`} className="flex-1 min-w-0">
                      <h3 className="text-[12px] sm:text-[13px] md:text-[14px] font-serif font-semibold text-[#2c2420] mb-0.5 sm:mb-1 leading-snug truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline gap-1.5 sm:gap-2">
                        <span className="text-[12px] sm:text-[13px] font-sans font-semibold text-[#2c2420]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-sans text-[#6b5e54] line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </Link>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="shrink-0 w-8 h-8 flex items-center justify-center text-[#6b5e54] hover:text-red-500 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <FiTrash2 className="text-[14px] sm:text-[15px]" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full mt-2.5 sm:mt-3 h-9 flex items-center justify-center gap-1.5 border border-[#2c2420] text-[#2c2420] text-[9px] sm:text-[10px] font-sans font-medium tracking-[0.08em] uppercase hover:bg-[#2c2420] hover:text-white active:bg-[#0d0b0a] active:text-white transition-colors"
                  >
                    <FiShoppingBag className="text-[10px] sm:text-[11px]" />
                    Move to Bag
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BackToTop />
      <CartDrawer />
    </>
  );
}
