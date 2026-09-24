"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CartDrawer from "@/components/CartDrawer";
import { api, OrderData, UserProfile } from "@/services/api";
import {
  FiPackage,
  FiUser,
  FiSearch,
  FiLogOut,
  FiCheckCircle,
  FiAlertCircle,
  FiShield,
  FiCamera,
} from "react-icons/fi";

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"orders" | "track" | "profile">("orders");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string>("");
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Track single order state
  const [trackOrderId, setTrackOrderId] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<OrderData | null>(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState("");

  // Avatar upload state
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarMsg, setAvatarMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("aura-gems-user");
      const storedToken = localStorage.getItem("aura-gems-token");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        if (parsed.avatar) setAvatarPreview(parsed.avatar);
      }
      if (storedToken) {
        setToken(storedToken);
        fetchMyOrders(storedToken);
      }
    } catch {}
  }, []);

  const fetchMyOrders = async (authToken: string) => {
    setLoadingOrders(true);
    try {
      const res = await api.getMyOrders(authToken);
      setOrders(res.orders || []);
    } catch {
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackOrderId.trim()) return;
    setTrackingLoading(true);
    setTrackingError("");
    setTrackedOrder(null);
    try {
      const res = await api.getOrder(trackOrderId.trim().toUpperCase());
      setTrackedOrder(res.order);
    } catch {
      setTrackingError("No order found with this Order ID. Please check and try again.");
    } finally {
      setTrackingLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("aura-gems-user");
      localStorage.removeItem("aura-gems-token");
    } catch {}
    setUser(null);
    setToken("");
    router.push("/");
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side preview
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);

    // Auto-upload immediately
    handleAvatarUpload(file);
  };

  const handleAvatarUpload = async (file: File) => {
    if (!token) {
      setAvatarMsg({ type: "error", text: "Please sign in to upload a photo." });
      return;
    }
    setAvatarUploading(true);
    setAvatarMsg(null);
    try {
      const res = await api.uploadAvatar(file, token);
      // Persist to localStorage and state
      if (user) {
        const updatedUser = { ...user, avatar: res.avatar };
        setUser(updatedUser);
        localStorage.setItem("aura-gems-user", JSON.stringify(updatedUser));
      }
      setAvatarPreview(res.avatar);
      setAvatarMsg({
        type: "success",
        text: `Photo uploaded! ${res.size.originalKB}KB → ${res.size.uploadedKB}KB (saved ${res.size.savedPercent}%)`,
      });
    } catch (err: any) {
      setAvatarMsg({ type: "error", text: err.message || "Upload failed. Please try again." });
    } finally {
      setAvatarUploading(false);
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case "confirmed": return 1;
      case "processing": return 2;
      case "shipped": return 3;
      case "delivered": return 4;
      case "cancelled": return -1;
      default: return 1;
    }
  };

  const currentAvatar = avatarPreview || user?.avatar || "";

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#fcfbfa] min-h-[80vh] py-8 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "My Account" }]} />

          {/* User Banner */}
          <div className="bg-white border border-[#e5dfd8] p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar with upload overlay */}
              <div className="relative group shrink-0">
                <div className="w-16 h-16 rounded-full bg-[#f8f5f1] border-2 border-[#c5a47e] overflow-hidden flex items-center justify-center">
                  {currentAvatar ? (
                    <Image
                      src={currentAvatar}
                      alt={user?.name || "Profile"}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-[22px] font-serif text-[#2c2420]">
                      {user ? user.name.charAt(0).toUpperCase() : <FiUser />}
                    </span>
                  )}
                </div>

                {/* Camera overlay (visible on hover when logged in) */}
                {user && (
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={avatarUploading}
                    title="Change profile photo"
                    className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  >
                    {avatarUploading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiCamera className="text-white text-[16px]" />
                    )}
                  </button>
                )}

                {/* Hidden file input */}
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleAvatarFileChange}
                  className="hidden"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-[20px] sm:text-[24px] font-serif text-[#2c2420]">
                    {user ? `Hello, ${user.name}` : "Account & Tracking"}
                  </h1>
                  {user?.role === "admin" && (
                    <span className="bg-[#2c2420] text-white text-[9px] font-sans px-2 py-0.5 uppercase tracking-wider rounded-sm">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-[12px] font-sans text-[#6b5e54]">
                  {user ? user.email : "Sign in to view your complete order history."}
                </p>
                {/* Avatar upload status message */}
                {avatarMsg && (
                  <p className={`text-[11px] font-sans mt-0.5 ${avatarMsg.type === "success" ? "text-green-600" : "text-red-500"}`}>
                    {avatarMsg.type === "success" ? "✓ " : "✗ "}{avatarMsg.text}
                  </p>
                )}
                {user && (
                  <p className="text-[10px] font-sans text-[#8c7e74] mt-0.5">
                    Hover on photo to change · JPG/PNG/WebP, max 10MB
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="h-10 px-5 bg-[#c5a47e] text-white text-[11px] font-sans font-medium tracking-[0.1em] uppercase hover:bg-[#b08d5e] transition-colors flex items-center gap-1.5"
                >
                  <FiShield className="text-[13px]" />
                  Admin Panel
                </Link>
              )}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="h-10 px-5 border border-[#e5dfd8] text-[11px] font-sans font-medium text-[#6b5e54] tracking-[0.08em] uppercase hover:border-[#2c2420] hover:text-[#2c2420] transition-colors flex items-center gap-1.5"
                >
                  <FiLogOut className="text-[13px]" />
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="h-10 px-6 bg-[#2c2420] text-white text-[11px] font-sans font-medium tracking-[0.1em] uppercase hover:bg-[#1a1614] transition-colors flex items-center justify-center"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#e5dfd8] mb-8 gap-6 sm:gap-8">
            <button
              onClick={() => setActiveTab("orders")}
              className={`pb-3 text-[12px] sm:text-[13px] font-sans tracking-wide uppercase transition-colors relative flex items-center gap-2 ${
                activeTab === "orders" ? "text-[#2c2420] font-semibold" : "text-[#6b5e54] hover:text-[#2c2420]"
              }`}
            >
              <FiPackage className="text-[15px]" />
              My Orders ({orders.length})
              {activeTab === "orders" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2c2420]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("track")}
              className={`pb-3 text-[12px] sm:text-[13px] font-sans tracking-wide uppercase transition-colors relative flex items-center gap-2 ${
                activeTab === "track" ? "text-[#2c2420] font-semibold" : "text-[#6b5e54] hover:text-[#2c2420]"
              }`}
            >
              <FiSearch className="text-[15px]" />
              Track Any Order
              {activeTab === "track" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2c2420]" />
              )}
            </button>

            {user && (
              <button
                onClick={() => setActiveTab("profile")}
                className={`pb-3 text-[12px] sm:text-[13px] font-sans tracking-wide uppercase transition-colors relative flex items-center gap-2 ${
                  activeTab === "profile" ? "text-[#2c2420] font-semibold" : "text-[#6b5e54] hover:text-[#2c2420]"
                }`}
              >
                <FiUser className="text-[15px]" />
                Profile Details
                {activeTab === "profile" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2c2420]" />
                )}
              </button>
            )}
          </div>

          {/* TAB 1: MY ORDERS */}
          {activeTab === "orders" && (
            <div>
              {!user && (
                <div className="bg-white border border-[#e5dfd8] p-8 text-center max-w-[500px] mx-auto my-6">
                  <FiUser className="text-[32px] text-[#c5a47e] mx-auto mb-3" />
                  <h3 className="text-[18px] font-serif text-[#2c2420] mb-2">Sign In to See Your Orders</h3>
                  <p className="text-[12px] font-sans text-[#6b5e54] mb-5">
                    Orders linked to your account will show here automatically.
                  </p>
                  <Link
                    href="/login"
                    className="inline-block h-10 px-8 bg-[#2c2420] text-white text-[11px] font-sans font-medium tracking-[0.12em] uppercase hover:bg-[#1a1614] transition-colors"
                  >
                    Sign In Now
                  </Link>
                </div>
              )}

              {user && loadingOrders && (
                <div className="text-center py-16">
                  <p className="text-[13px] font-sans text-[#6b5e54]">Loading your order history...</p>
                </div>
              )}

              {user && !loadingOrders && orders.length === 0 && (
                <div className="bg-white border border-[#e5dfd8] p-12 text-center max-w-[500px] mx-auto">
                  <FiPackage className="text-[36px] text-[#c5a47e] mx-auto mb-3" />
                  <h3 className="text-[18px] font-serif text-[#2c2420] mb-2">No Orders Placed Yet</h3>
                  <p className="text-[12px] font-sans text-[#6b5e54] mb-6">
                    You haven&apos;t placed any orders yet. Discover our latest gemstone pieces!
                  </p>
                  <Link
                    href="/collections"
                    className="inline-block h-10 px-8 bg-[#2c2420] text-white text-[11px] font-sans font-medium tracking-[0.12em] uppercase hover:bg-[#1a1614] transition-colors"
                  >
                    Explore Collections
                  </Link>
                </div>
              )}

              {user && orders.length > 0 && (
                <div className="space-y-6">
                  {orders.map((ord) => {
                    const step = getStatusStep(ord.orderStatus);
                    return (
                      <div key={ord.orderId} className="bg-white border border-[#e5dfd8] p-6 shadow-sm">
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e5dfd8] gap-2 mb-5">
                          <div>
                            <span className="text-[10px] font-sans text-[#6b5e54] uppercase tracking-wider block">Order ID</span>
                            <span className="text-[15px] font-sans font-semibold text-[#2c2420]">{ord.orderId}</span>
                          </div>
                          <div className="sm:text-right">
                            <span className="text-[10px] font-sans text-[#6b5e54] uppercase tracking-wider block">Placed On</span>
                            <span className="text-[12px] font-sans text-[#2c2420]">
                              {new Date(ord.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="sm:text-right">
                            <span className="text-[10px] font-sans text-[#6b5e54] uppercase tracking-wider block">Total Amount</span>
                            <span className="text-[15px] font-sans font-semibold text-[#2c2420]">
                              ₹{ord.total.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <div>
                            <span
                              className={`inline-block px-3 py-1 text-[10px] font-sans font-semibold uppercase tracking-wider rounded-full ${
                                ord.orderStatus === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : ord.orderStatus === "shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : ord.orderStatus === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {ord.orderStatus}
                            </span>
                          </div>
                        </div>

                        {/* Status Timeline */}
                        {ord.orderStatus !== "cancelled" && (
                          <div className="mb-6 p-4 bg-[#f8f5f1] rounded-sm">
                            <div className="flex items-center justify-between max-w-[650px] mx-auto relative">
                              {[
                                { key: "confirmed", label: "Confirmed" },
                                { key: "processing", label: "Processing" },
                                { key: "shipped", label: "Shipped" },
                                { key: "delivered", label: "Delivered" },
                              ].map((s, idx) => {
                                const isPassed = step >= idx + 1;
                                return (
                                  <div key={s.key} className="flex flex-col items-center z-10">
                                    <div
                                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-sans transition-colors ${
                                        isPassed ? "bg-[#2c2420] text-white" : "bg-white border border-[#e5dfd8] text-[#6b5e54]"
                                      }`}
                                    >
                                      {isPassed ? "✓" : idx + 1}
                                    </div>
                                    <span className="text-[10px] font-sans mt-1.5 text-[#2c2420] font-medium">{s.label}</span>
                                  </div>
                                );
                              })}
                              <div className="absolute top-3.5 left-4 right-4 h-[2px] bg-[#e5dfd8] -z-0" />
                            </div>
                          </div>
                        )}

                        {/* Items list */}
                        <div className="space-y-3">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 py-2 border-b border-[#f0ede8] last:border-b-0">
                              <div className="w-14 h-16 bg-[#f8f5f1] shrink-0 overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[13px] font-serif text-[#2c2420] truncate">{item.name}</h4>
                                <p className="text-[11px] font-sans text-[#6b5e54]">
                                  {item.selectedMetal} / {item.selectedSize} | Qty: {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="text-[13px] font-sans font-medium text-[#2c2420]">
                                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Delivery info */}
                        <div className="mt-4 pt-4 border-t border-[#e5dfd8] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-sans text-[#6b5e54] gap-2">
                          <p>
                            Delivering to:{" "}
                            <span className="text-[#2c2420] font-medium">
                              {ord.shippingAddress.firstName} {ord.shippingAddress.lastName}
                            </span>{" "}
                            ({ord.shippingAddress.city}, {ord.shippingAddress.pincode})
                          </p>
                          <p>
                            Estimated delivery:{" "}
                            <span className="text-[#2c2420] font-medium">{ord.estimatedDelivery || "5-7 business days"}</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TRACK ANY ORDER */}
          {activeTab === "track" && (
            <div className="max-w-[650px] mx-auto">
              <div className="bg-white border border-[#e5dfd8] p-6 sm:p-10 mb-8 shadow-sm">
                <h2 className="text-[20px] sm:text-[24px] font-serif font-light text-[#2c2420] mb-2 text-center">
                  Track Your Package
                </h2>
                <p className="text-[12px] font-sans text-[#6b5e54] mb-6 text-center">
                  Enter your Order ID received on checkout (e.g.{" "}
                  <span className="font-semibold text-[#2c2420]">AGMUE5763X</span>) to see real-time status.
                </p>

                <form onSubmit={handleTrackOrder} className="flex gap-2">
                  <input
                    type="text"
                    value={trackOrderId}
                    onChange={(e) => setTrackOrderId(e.target.value)}
                    placeholder="Enter Order ID..."
                    required
                    className="flex-1 h-11 px-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={trackingLoading}
                    className="h-11 px-6 bg-[#2c2420] text-white text-[11px] font-sans font-medium tracking-[0.1em] uppercase hover:bg-[#1a1614] transition-colors shrink-0 disabled:opacity-70"
                  >
                    {trackingLoading ? "Searching..." : "Track"}
                  </button>
                </form>

                {trackingError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-[12px] font-sans flex items-center gap-2">
                    <FiAlertCircle className="text-[16px] shrink-0" />
                    <span>{trackingError}</span>
                  </div>
                )}
              </div>

              {trackedOrder && (
                <div className="bg-white border border-[#e5dfd8] p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-[#e5dfd8] mb-6">
                    <div>
                      <span className="text-[10px] font-sans text-[#6b5e54] uppercase tracking-wider block">Order Status</span>
                      <span className="text-[18px] font-serif font-semibold text-[#2c2420] capitalize">{trackedOrder.orderStatus}</span>
                    </div>
                    <span
                      className={`px-3 py-1 text-[10px] font-sans font-semibold uppercase tracking-wider rounded-full ${
                        trackedOrder.orderStatus === "delivered" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      ID: {trackedOrder.orderId}
                    </span>
                  </div>

                  <div className="mb-6 p-4 bg-[#f8f5f1]">
                    <div className="flex items-center justify-between max-w-[500px] mx-auto relative">
                      {["Confirmed", "Processing", "Shipped", "Delivered"].map((st, i) => {
                        const step = getStatusStep(trackedOrder.orderStatus);
                        const passed = step >= i + 1;
                        return (
                          <div key={st} className="flex flex-col items-center z-10">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-sans ${
                                passed ? "bg-[#2c2420] text-white" : "bg-white border border-[#e5dfd8] text-[#6b5e54]"
                              }`}
                            >
                              {passed ? "✓" : i + 1}
                            </div>
                            <span className="text-[10px] font-sans mt-1 text-[#2c2420]">{st}</span>
                          </div>
                        );
                      })}
                      <div className="absolute top-3.5 left-4 right-4 h-[2px] bg-[#e5dfd8] -z-0" />
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <h4 className="text-[12px] font-sans font-medium uppercase tracking-wider text-[#2c2420]">
                      Ordered Items ({trackedOrder.items.length})
                    </h4>
                    {trackedOrder.items.map((it, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-[12px] font-sans py-1.5 border-b border-[#f0ede8] last:border-b-0"
                      >
                        <span className="text-[#2c2420]">
                          {it.name} (Qty: {it.quantity})
                        </span>
                        <span className="font-medium text-[#2c2420]">₹{(it.price * it.quantity).toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#fcfbfa] p-4 text-[11px] font-sans space-y-1.5 border border-[#e5dfd8]">
                    <p className="text-[#6b5e54]">
                      Recipient:{" "}
                      <span className="text-[#2c2420] font-medium">
                        {trackedOrder.shippingAddress.firstName} {trackedOrder.shippingAddress.lastName}
                      </span>
                    </p>
                    <p className="text-[#6b5e54]">
                      Shipping Address:{" "}
                      <span className="text-[#2c2420]">
                        {trackedOrder.shippingAddress.address}, {trackedOrder.shippingAddress.city},{" "}
                        {trackedOrder.shippingAddress.state} - {trackedOrder.shippingAddress.pincode}
                      </span>
                    </p>
                    <p className="text-[#6b5e54]">
                      Total Paid:{" "}
                      <span className="text-[#2c2420] font-semibold">₹{trackedOrder.total.toLocaleString("en-IN")}</span> (
                      {trackedOrder.paymentMethod.toUpperCase()})
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROFILE DETAILS */}
          {activeTab === "profile" && user && (
            <div className="max-w-[580px] mx-auto bg-white border border-[#e5dfd8] p-6 sm:p-8">
              {/* Avatar upload section */}
              <div className="flex flex-col items-center mb-8 pb-8 border-b border-[#e5dfd8]">
                <div className="relative group mb-4">
                  <div className="w-24 h-24 rounded-full bg-[#f8f5f1] border-2 border-[#c5a47e] overflow-hidden flex items-center justify-center">
                    {currentAvatar ? (
                      <Image
                        src={currentAvatar}
                        alt={user.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <span className="text-[32px] font-serif text-[#2c2420]">{user.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={avatarUploading}
                    className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  >
                    {avatarUploading ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiCamera className="text-white text-[20px]" />
                    )}
                  </button>
                </div>

                <button
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={avatarUploading}
                  className="flex items-center gap-2 h-9 px-5 border border-[#c5a47e] text-[#c5a47e] text-[11px] font-sans font-medium tracking-[0.1em] uppercase hover:bg-[#c5a47e] hover:text-white transition-colors disabled:opacity-60"
                >
                  <FiCamera className="text-[13px]" />
                  {avatarUploading ? "Uploading..." : currentAvatar ? "Change Photo" : "Upload Photo"}
                </button>

                <p className="text-[10px] font-sans text-[#8c7e74] mt-2 text-center">
                  Accepted: JPG, PNG, WebP · Max 10MB · Auto-compressed & saved to Cloudinary
                </p>

                {avatarMsg && (
                  <p className={`text-[11px] font-sans mt-2 text-center ${avatarMsg.type === "success" ? "text-green-600" : "text-red-500"}`}>
                    {avatarMsg.type === "success" ? "✓ " : "✗ "}{avatarMsg.text}
                  </p>
                )}
              </div>

              {/* Profile info */}
              <h3 className="text-[16px] font-serif text-[#2c2420] mb-4">Account Details</h3>
              <div className="space-y-4 text-[12px] font-sans">
                <div className="flex justify-between py-2 border-b border-[#e5dfd8]">
                  <span className="text-[#6b5e54]">Full Name</span>
                  <span className="text-[#2c2420] font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#e5dfd8]">
                  <span className="text-[#6b5e54]">Email Address</span>
                  <span className="text-[#2c2420] font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#e5dfd8]">
                  <span className="text-[#6b5e54]">Account Role</span>
                  <span className="capitalize text-[#2c2420] font-medium">{user.role}</span>
                </div>
                {user.phone && (
                  <div className="flex justify-between py-2 border-b border-[#e5dfd8]">
                    <span className="text-[#6b5e54]">Contact Phone</span>
                    <span className="text-[#2c2420] font-medium">{user.phone}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
