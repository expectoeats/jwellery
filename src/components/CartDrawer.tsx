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
      <div className="fixed inset-0 bg-black/40" onClick={() => setCartOpen(false)} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white shadow-2xl flex flex-col z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5dfd8]">
          <div>
            <h3 className="text-[18px] font-serif font-light text-[#2c2420]">Your Cart</h3>
            <p className="text-[11px] font-sans text-[#6b5e54] mt-0.5">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-9 h-9 flex items-center justify-center border border-[#e5dfd8] rounded-full text-[#2c2420] hover:bg-[#f8f5f1] transition-colors"
          >
            <FiX className="text-[16px]" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-[#f8f5f1] flex items-center justify-center mb-4">
                <span className="text-[24px]">&#128092;</span>
              </div>
              <p className="text-[14px] font-serif text-[#2c2420] mb-1">Your cart is empty</p>
              <p className="text-[11px] font-sans text-[#6b5e54]">
                Explore our collection and add something beautiful.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedMetal}`} className="flex gap-4 py-3 border-b border-[#e5dfd8] last:border-b-0">
                  <div className="w-20 h-24 overflow-hidden bg-[#f8f5f1] shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[12px] font-serif font-medium text-[#2c2420] leading-snug mb-1 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] font-sans text-[#6b5e54] mb-0.5">
                      {item.selectedMetal} / {item.selectedSize}
                    </p>
                    <p className="text-[13px] font-sans font-medium text-[#2c2420] mb-2">
                      ₹{item.product.price.toLocaleString("en-IN")}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[#e5dfd8]">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedMetal,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center text-[#6b5e54] hover:bg-[#f8f5f1]"
                        >
                          <FiMinus className="text-[11px]" />
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center text-[11px] font-sans text-[#2c2420] border-x border-[#e5dfd8]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedMetal,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center text-[#6b5e54] hover:bg-[#f8f5f1]"
                        >
                          <FiPlus className="text-[11px]" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedMetal)}
                        className="text-[#6b5e54] hover:text-red-500 transition-colors p-1"
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
          <div className="border-t border-[#e5dfd8] px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[13px] font-sans text-[#6b5e54]">Subtotal</span>
              <span className="text-[16px] font-sans font-medium text-[#2c2420]">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-[10px] font-sans text-[#6b5e54] mb-4">
              Shipping & taxes calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="block w-full h-12 bg-[#2c2420] text-white text-[11px] font-sans font-medium tracking-[0.12em] uppercase hover:bg-[#1a1614] transition-colors mb-2 text-center leading-[48px]"
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
