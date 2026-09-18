"use client";

import { useCart } from "@/context/CartContext";
import { FiX, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isCartOpen, setCartOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />

      {/* Drawer - full width on mobile */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-full sm:max-w-[400px] bg-white shadow-2xl flex flex-col z-10 animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-[#e5dfd8] shrink-0">
          <div>
            <h3 className="text-[17px] sm:text-[18px] font-serif font-light text-[#2c2420]">Your Cart</h3>
            <p className="text-[11px] font-sans text-[#6b5e54] mt-0.5">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-9 h-9 flex items-center justify-center border border-[#e5dfd8] rounded-full text-[#2c2420] hover:bg-[#f8f5f1] transition-colors"
            aria-label="Close cart"
          >
            <FiX className="text-[16px]" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-3 sm:py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-[#f8f5f1] flex items-center justify-center mb-4">
                <span className="text-[24px]">&#128092;</span>
              </div>
              <p className="text-[14px] font-serif text-[#2c2420] mb-1">Your cart is empty</p>
              <p className="text-[11px] font-sans text-[#6b5e54] mb-5">
                Explore our collection and add something beautiful.
              </p>
              <Link
                href="/collections"
                onClick={() => setCartOpen(false)}
                className="inline-flex items-center h-10 px-6 bg-[#2c2420] text-white text-[11px] font-sans font-medium tracking-[0.1em] uppercase hover:bg-[#1a1614] transition-colors"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedMetal}`} className="flex gap-3 sm:gap-4 py-3 border-b border-[#e5dfd8] last:border-b-0">
                  <Link href={`/product/${item.product.id}`} onClick={() => setCartOpen(false)} className="w-16 h-20 sm:w-20 sm:h-24 overflow-hidden bg-[#f8f5f1] shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11px] sm:text-[12px] font-serif font-medium text-[#2c2420] leading-snug mb-0.5 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[9px] sm:text-[10px] font-sans text-[#6b5e54] mb-0.5">
                      {item.selectedMetal} / {item.selectedSize}
                    </p>
                    <p className="text-[12px] sm:text-[13px] font-sans font-medium text-[#2c2420] mb-2">
                      ₹{item.product.price.toLocaleString("en-IN")}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[#e5dfd8]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedMetal, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#6b5e54] hover:bg-[#f8f5f1] active:bg-[#e5dfd8] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus className="text-[11px]" />
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center text-[11px] font-sans text-[#2c2420] border-x border-[#e5dfd8]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedMetal, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#6b5e54] hover:bg-[#f8f5f1] active:bg-[#e5dfd8] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FiPlus className="text-[11px]" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedMetal)}
                        className="text-[#6b5e54] hover:text-red-500 transition-colors p-1.5 active:scale-90"
                        aria-label="Remove item"
                      >
                        <FiTrash2 className="text-[13px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#e5dfd8] px-5 sm:px-6 py-4 sm:py-5 shrink-0 bg-white">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-[12px] sm:text-[13px] font-sans text-[#6b5e54]">Subtotal</span>
              <span className="text-[15px] sm:text-[16px] font-sans font-medium text-[#2c2420]">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-[10px] font-sans text-[#6b5e54] mb-3 sm:mb-4">
              Shipping & taxes calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="flex items-center justify-center w-full h-12 bg-[#2c2420] text-white text-[11px] font-sans font-medium tracking-[0.12em] uppercase hover:bg-[#1a1614] active:bg-[#0d0b0a] transition-colors mb-2"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={() => setCartOpen(false)}
              className="w-full h-10 text-[11px] font-sans text-[#6b5e54] hover:text-[#2c2420] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
