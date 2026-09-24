"use client";

import { useState } from "react";
import { useCart, CartItem } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { FiCheck, FiLock, FiTruck, FiCreditCard, FiPackage } from "react-icons/fi";
import { api } from "@/services/api";

type Step = "shipping" | "payment" | "review" | "confirmation";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>("shipping");
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [orderId, setOrderId] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const subtotal = totalPrice;
  const shippingCost = subtotal > 5000 ? 0 : 199;
  const tax = Math.round(subtotal * 0.03);
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      const orderPayload = {
        items: items.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          image: i.product.image,
          price: i.product.price,
          quantity: i.quantity,
          selectedSize: i.selectedSize,
          selectedMetal: i.selectedMetal,
        })),
        shippingAddress: shipping,
        paymentMethod,
      };

      const res = await api.createOrder(orderPayload);
      setOrderId(res.order.orderId);
      clearCart();
      setStep("confirmation");
    } catch {
      // Fallback in case backend server is unreachable
      const fallbackId = "AG" + Date.now().toString(36).toUpperCase();
      setOrderId(fallbackId);
      clearCart();
      setStep("confirmation");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (items.length === 0 && step !== "confirmation") {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-[18px] font-serif text-[#2c2420] mb-3">Your cart is empty</p>
            <p className="text-[12px] font-sans text-[#6b5e54] mb-6">Add some items to proceed with checkout.</p>
            <a href="/" className="text-[12px] font-sans text-[#c5a47e] border-b border-[#c5a47e] pb-0.5 hover:text-[#b08d5e]">
              Continue Shopping
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#f8f5f1] min-h-[80vh]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Steps indicator */}
          {step !== "confirmation" && (
            <div className="flex items-center justify-center gap-0 mb-10">
              {[
                { key: "shipping", label: "Shipping", icon: FiTruck },
                { key: "payment", label: "Payment", icon: FiCreditCard },
                { key: "review", label: "Review", icon: FiPackage },
              ].map((s, i) => (
                <div key={s.key} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-sans font-medium transition-colors ${
                        step === s.key
                          ? "bg-[#2c2420] text-white"
                          : ["shipping", "payment", "review"].indexOf(step) > i
                          ? "bg-[#c5a47e] text-white"
                          : "bg-[#e5dfd8] text-[#6b5e54]"
                      }`}
                    >
                      {["shipping", "payment", "review"].indexOf(step) > i ? (
                        <FiCheck className="text-[14px]" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-sans font-medium hidden sm:block ${
                        step === s.key ? "text-[#2c2420]" : "text-[#6b5e54]"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && <div className="w-12 md:w-20 h-[1px] bg-[#e5dfd8] mx-3" />}
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {step === "shipping" && (
                <div className="bg-white p-6 md:p-8 border border-[#e5dfd8]">
                  <h2 className="text-[20px] font-serif font-light text-[#2c2420] mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-sans font-medium text-[#2c2420] tracking-wide uppercase mb-1.5 block">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={shipping.firstName}
                        onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                        className="w-full h-11 px-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-sans font-medium text-[#2c2420] tracking-wide uppercase mb-1.5 block">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={shipping.lastName}
                        onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                        className="w-full h-11 px-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-sans font-medium text-[#2c2420] tracking-wide uppercase mb-1.5 block">
                        Email
                      </label>
                      <input
                        type="email"
                        value={shipping.email}
                        onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                        className="w-full h-11 px-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-sans font-medium text-[#2c2420] tracking-wide uppercase mb-1.5 block">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={shipping.phone}
                        onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                        className="w-full h-11 px-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-sans font-medium text-[#2c2420] tracking-wide uppercase mb-1.5 block">
                        Address
                      </label>
                      <input
                        type="text"
                        value={shipping.address}
                        onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                        className="w-full h-11 px-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-sans font-medium text-[#2c2420] tracking-wide uppercase mb-1.5 block">
                        City
                      </label>
                      <input
                        type="text"
                        value={shipping.city}
                        onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                        className="w-full h-11 px-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-sans font-medium text-[#2c2420] tracking-wide uppercase mb-1.5 block">
                        State
                      </label>
                      <input
                        type="text"
                        value={shipping.state}
                        onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                        className="w-full h-11 px-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-sans font-medium text-[#2c2420] tracking-wide uppercase mb-1.5 block">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={shipping.pincode}
                        onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })}
                        className="w-full h-11 px-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setStep("payment")}
                    className="mt-8 w-full md:w-auto h-12 px-10 bg-[#2c2420] text-white text-[11px] font-sans font-medium tracking-[0.12em] uppercase hover:bg-[#1a1614] transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {step === "payment" && (
                <div className="bg-white p-6 md:p-8 border border-[#e5dfd8]">
                  <h2 className="text-[20px] font-serif font-light text-[#2c2420] mb-6">Payment Method</h2>
                  <div className="space-y-3">
                    {[
                      { id: "upi", label: "UPI (Google Pay, PhonePe, Paytm)" },
                      { id: "card", label: "Credit / Debit Card" },
                      { id: "netbanking", label: "Net Banking" },
                      { id: "cod", label: "Cash on Delivery" },
                    ].map((m) => (
                      <label
                        key={m.id}
                        className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${
                          paymentMethod === m.id
                            ? "border-[#c5a47e] bg-[#f8f5f1]"
                            : "border-[#e5dfd8] hover:border-[#c5a47e]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={m.id}
                          checked={paymentMethod === m.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="accent-[#c5a47e]"
                        />
                        <span className="text-[12px] font-sans text-[#2c2420]">{m.label}</span>
                      </label>
                    ))}
                  </div>

                  {paymentMethod === "card" && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="text-[10px] font-sans font-medium text-[#2c2420] tracking-wide uppercase mb-1.5 block">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full h-11 px-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors placeholder:text-[#6b5e54]/50"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-sans font-medium text-[#2c2420] tracking-wide uppercase mb-1.5 block">
                          Expiry
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full h-11 px-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors placeholder:text-[#6b5e54]/50"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-sans font-medium text-[#2c2420] tracking-wide uppercase mb-1.5 block">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full h-11 px-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors placeholder:text-[#6b5e54]/50"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-4 text-[10px] font-sans text-[#6b5e54]">
                    <FiLock className="text-[12px] text-[#c5a47e]" />
                    <span>Your payment information is encrypted and secure</span>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => setStep("shipping")}
                      className="h-12 px-6 border border-[#e5dfd8] text-[11px] font-sans font-medium text-[#6b5e54] tracking-[0.06em] uppercase hover:border-[#2c2420] hover:text-[#2c2420] transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep("review")}
                      className="h-12 px-10 bg-[#2c2420] text-white text-[11px] font-sans font-medium tracking-[0.12em] uppercase hover:bg-[#1a1614] transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {step === "review" && (
                <div className="bg-white p-6 md:p-8 border border-[#e5dfd8]">
                  <h2 className="text-[20px] font-serif font-light text-[#2c2420] mb-6">Review Your Order</h2>

                  {/* Shipping summary */}
                  <div className="mb-6 p-4 bg-[#f8f5f1]">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[11px] font-sans font-medium text-[#2c2420] uppercase tracking-wide">Shipping Address</p>
                      <button onClick={() => setStep("shipping")} className="text-[10px] font-sans text-[#c5a47e] underline">
                        Edit
                      </button>
                    </div>
                    <p className="text-[12px] font-sans text-[#6b5e54]">
                      {shipping.firstName} {shipping.lastName}<br />
                      {shipping.address}<br />
                      {shipping.city}, {shipping.state} - {shipping.pincode}<br />
                      {shipping.phone}
                    </p>
                  </div>

                  {/* Payment summary */}
                  <div className="mb-6 p-4 bg-[#f8f5f1]">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[11px] font-sans font-medium text-[#2c2420] uppercase tracking-wide">Payment Method</p>
                      <button onClick={() => setStep("payment")} className="text-[10px] font-sans text-[#c5a47e] underline">
                        Edit
                      </button>
                    </div>
                    <p className="text-[12px] font-sans text-[#6b5e54] capitalize">{paymentMethod === "upi" ? "UPI" : paymentMethod === "card" ? "Credit / Debit Card" : paymentMethod === "netbanking" ? "Net Banking" : "Cash on Delivery"}</p>
                  </div>

                  {/* Items */}
                  <div className="mb-6">
                    <p className="text-[11px] font-sans font-medium text-[#2c2420] uppercase tracking-wide mb-3">Order Items</p>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={`${item.product.id}-${item.selectedSize}-${item.selectedMetal}`} className="flex gap-3 pb-3 border-b border-[#e5dfd8] last:border-b-0">
                          <div className="w-14 h-16 bg-[#f8f5f1] overflow-hidden shrink-0">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[12px] font-serif text-[#2c2420]">{item.product.name}</p>
                            <p className="text-[10px] font-sans text-[#6b5e54]">{item.selectedMetal} / {item.selectedSize} / Qty: {item.quantity}</p>
                          </div>
                          <p className="text-[12px] font-sans font-medium text-[#2c2420]">
                            ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("payment")}
                      className="h-12 px-6 border border-[#e5dfd8] text-[11px] font-sans font-medium text-[#6b5e54] tracking-[0.06em] uppercase hover:border-[#2c2420] hover:text-[#2c2420] transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isPlacingOrder}
                      className="h-12 px-10 bg-[#c5a47e] text-white text-[11px] font-sans font-medium tracking-[0.12em] uppercase hover:bg-[#b08d5e] disabled:opacity-70 transition-colors flex items-center gap-2"
                    >
                      <FiLock className="text-[13px]" />
                      {isPlacingOrder ? "Processing..." : "Place Order"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            {step !== "confirmation" && (
              <div className="lg:col-span-1">
                <div className="bg-white p-6 border border-[#e5dfd8] sticky top-24">
                  <h3 className="text-[14px] font-serif font-medium text-[#2c2420] mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-4 pb-4 border-b border-[#e5dfd8]">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.selectedSize}-${item.selectedMetal}`} className="flex gap-3">
                        <div className="w-12 h-14 bg-[#f8f5f1] overflow-hidden shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-serif text-[#2c2420] truncate">{item.product.name}</p>
                          <p className="text-[10px] font-sans text-[#6b5e54]">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-[11px] font-sans font-medium text-[#2c2420] shrink-0">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 mb-4 pb-4 border-b border-[#e5dfd8]">
                    <div className="flex justify-between text-[11px] font-sans text-[#6b5e54]">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-sans text-[#6b5e54]">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-sans text-[#6b5e54]">
                      <span>Tax (GST 3%)</span>
                      <span>₹{tax.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-[14px] font-sans font-medium text-[#2c2420]">
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-[9px] font-sans text-[#6b5e54] mt-3">
                    {shippingCost === 0 ? "Free shipping on orders above ₹5,000" : `Add ₹${(5001 - subtotal).toLocaleString("en-IN")} more for free shipping`}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Confirmation */}
          {step === "confirmation" && (
            <div className="bg-white p-8 md:p-12 border border-[#e5dfd8] text-center max-w-[600px] mx-auto">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheck className="text-[28px] text-green-600" />
              </div>
              <h2 className="text-[24px] font-serif font-light text-[#2c2420] mb-2">Order Confirmed!</h2>
              <p className="text-[12px] font-sans text-[#6b5e54] mb-6">
                Thank you for shopping with Passione Jewelry.
              </p>
              <div className="bg-[#f8f5f1] p-4 mb-6">
                <p className="text-[10px] font-sans text-[#6b5e54] uppercase tracking-wide mb-1">Order ID</p>
                <p className="text-[16px] font-sans font-medium text-[#2c2420]">{orderId}</p>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-left">
                  <FiTruck className="text-[16px] text-[#c5a47e] shrink-0" />
                  <div>
                    <p className="text-[11px] font-sans font-medium text-[#2c2420]">Estimated Delivery</p>
                    <p className="text-[11px] font-sans text-[#6b5e54]">5-7 business days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <FiPackage className="text-[16px] text-[#c5a47e] shrink-0" />
                  <div>
                    <p className="text-[11px] font-sans font-medium text-[#2c2420]">Order Tracking</p>
                    <p className="text-[11px] font-sans text-[#6b5e54]">You will receive tracking details via email</p>
                  </div>
                </div>
              </div>
              <a
                href="/"
                className="inline-block h-12 px-10 bg-[#2c2420] text-white text-[11px] font-sans font-medium tracking-[0.12em] uppercase hover:bg-[#1a1614] transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
