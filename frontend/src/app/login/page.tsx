"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CartDrawer from "@/components/CartDrawer";
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle, FiX, FiShield, FiKey } from "react-icons/fi";
import { api } from "@/services/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);

  // Forgot Password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState<"email" | "reset">("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setUnverifiedEmail(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.login({ email, password });
      try {
        localStorage.setItem("aura-gems-user", JSON.stringify(res.user));
        localStorage.setItem("aura-gems-token", res.token);
      } catch {}
      setSuccessMsg(`Welcome back, ${res.user.name}! Redirecting...`);
      setTimeout(() => {
        router.push("/collections");
      }, 1000);
    } catch (err: any) {
      if (err.requiresVerification) {
        setUnverifiedEmail(err.email || email);
      }
      setErrorMsg(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendResetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");
    if (!forgotEmail.trim()) {
      setForgotError("Please enter your registered email address.");
      return;
    }
    setForgotLoading(true);
    try {
      const res = await api.forgotPassword(forgotEmail);
      setForgotSuccess(res.message || "Reset OTP sent to your email!");
      setForgotStep("reset");
    } catch (err: any) {
      setForgotError(err.message || "Failed to send reset OTP");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");
    if (!forgotOtp.trim() || forgotOtp.trim().length !== 6) {
      setForgotError("Please enter the 6-digit OTP received in email.");
      return;
    }
    if (newPassword.length < 6) {
      setForgotError("New password must be at least 6 characters long.");
      return;
    }
    setForgotLoading(true);
    try {
      const res = await api.resetPassword({
        email: forgotEmail,
        otp: forgotOtp.trim(),
        newPassword,
      });
      setForgotSuccess(res.message || "Password reset successfully!");
      setTimeout(() => {
        setForgotModalOpen(false);
        setForgotStep("email");
        setEmail(forgotEmail);
        setSuccessMsg("Password reset successfully. You can now log in.");
      }, 1500);
    } catch (err: any) {
      setForgotError(err.message || "Failed to reset password");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#fcfbfa] min-h-[75vh] py-10 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 mb-6">
          <Breadcrumbs items={[{ label: "Account", href: "/login" }, { label: "Login" }]} />
        </div>

        <div className="max-w-[440px] mx-auto px-5">
          <div className="bg-white border border-[#e5dfd8] p-6 sm:p-10 shadow-sm">
            <div className="text-center mb-8">
              <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-[#c5a47e] uppercase block mb-1">
                Account Access
              </span>
              <h1 className="text-[26px] sm:text-[30px] font-serif font-light text-[#2c2420]">
                Sign In
              </h1>
              <p className="text-[12px] font-sans text-[#6b5e54] mt-1.5">
                Sign in to view your orders and saved wishlist.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-[12px] font-sans">
                <p>{errorMsg}</p>
                {unverifiedEmail && (
                  <div className="mt-2 pt-2 border-t border-red-200 flex items-center justify-between">
                    <span className="text-[11px] text-red-600">Need to enter verification OTP?</span>
                    <Link
                      href="/signup"
                      className="text-[11px] font-semibold text-[#c5a47e] underline hover:text-[#2c2420]"
                    >
                      Verify Now →
                    </Link>
                  </div>
                )}
              </div>
            )}

            {successMsg && (
              <div className="mb-5 p-3 bg-green-50 border border-green-200 text-green-700 text-[12px] font-sans flex items-center gap-2">
                <FiCheckCircle className="text-[16px] text-green-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-sans font-medium text-[#2c2420] tracking-wide uppercase mb-1.5 block">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-[#6b5e54]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@example.com"
                    className="w-full h-11 pl-10 pr-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-sans font-medium text-[#2c2420] tracking-wide uppercase mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-[#6b5e54]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full h-11 pl-10 pr-10 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b5e54] hover:text-[#2c2420] transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <FiEyeOff className="text-[14px]" /> : <FiEye className="text-[14px]" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-sans pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[#6b5e54]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-[#c5a47e]"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email);
                    setForgotError("");
                    setForgotSuccess("");
                    setForgotStep("email");
                    setForgotModalOpen(true);
                  }}
                  className="text-[#c5a47e] hover:text-[#2c2420] transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#2c2420] text-white text-[11px] font-sans font-medium tracking-[0.12em] uppercase hover:bg-[#1a1614] active:bg-[#0d0b0a] transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e5dfd8]" />
              </div>
              <span className="relative bg-white px-3 text-[11px] font-sans text-[#6b5e54]">
                New to Aura Gems?
              </span>
            </div>

            <Link
              href="/signup"
              className="w-full h-11 border border-[#2c2420] text-[#2c2420] text-[11px] font-sans font-medium tracking-[0.12em] uppercase hover:bg-[#2c2420] hover:text-white transition-colors flex items-center justify-center"
            >
              Create Account
            </Link>

            <div className="mt-6 text-center">
              <Link
                href="/collections"
                className="text-[11px] font-sans text-[#6b5e54] hover:text-[#c5a47e] transition-colors underline"
              >
                Continue browsing as guest
              </Link>
            </div>
          </div>
        </div>

        {/* Forgot Password Modal */}
        {forgotModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="bg-white border border-[#e5dfd8] w-full max-w-[420px] p-6 sm:p-8 shadow-xl relative animate-in fade-in zoom-in-95">
              <button
                onClick={() => setForgotModalOpen(false)}
                className="absolute right-4 top-4 text-[#8c7e74] hover:text-[#2c2420] transition-colors"
              >
                <FiX className="text-[18px]" />
              </button>

              <div className="text-center mb-6">
                <div className="w-10 h-10 rounded-full bg-[#faf8f5] border border-[#c5a47e]/30 flex items-center justify-center mx-auto mb-2.5">
                  <FiKey className="text-[18px] text-[#c5a47e]" />
                </div>
                <h3 className="text-[20px] font-serif font-light text-[#2c2420]">
                  Reset Your Password
                </h3>
                <p className="text-[11px] font-sans text-[#6b5e54] mt-1">
                  {forgotStep === "email"
                    ? "Enter your email to receive a 6-digit password reset OTP."
                    : `Enter the code sent to ${forgotEmail}`}
                </p>
              </div>

              {forgotError && (
                <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-700 text-[11px] font-sans text-center">
                  {forgotError}
                </div>
              )}

              {forgotSuccess && (
                <div className="mb-4 p-2.5 bg-green-50 border border-green-200 text-green-700 text-[11px] font-sans text-center flex items-center justify-center gap-1.5">
                  <FiCheckCircle className="text-[14px] text-green-600 shrink-0" />
                  <span>{forgotSuccess}</span>
                </div>
              )}

              {forgotStep === "email" ? (
                <form onSubmit={handleSendResetOtp} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-sans font-medium text-[#2c2420] uppercase mb-1 block">
                      Account Email
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-[#6b5e54]" />
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                        placeholder="name@example.com"
                        className="w-full h-10 pl-10 pr-3 text-[12px] font-sans border border-[#e5dfd8] outline-none focus:border-[#c5a47e]"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full h-10 bg-[#2c2420] text-white text-[10px] font-sans font-medium tracking-[0.14em] uppercase hover:bg-[#1a1614] transition-colors disabled:opacity-70"
                  >
                    {forgotLoading ? "Sending OTP..." : "Send Reset Code"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleConfirmReset} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-sans font-medium text-[#2c2420] uppercase mb-1 block text-center">
                      6-Digit OTP Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value.replace(/\D/g, ""))}
                      required
                      placeholder="• • • • • •"
                      className="w-full h-11 text-center font-mono text-[20px] tracking-[6px] font-bold border-2 border-[#c5a47e] bg-[#faf8f5] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-sans font-medium text-[#2c2420] uppercase mb-1 block">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      placeholder="At least 6 characters"
                      className="w-full h-10 px-3 text-[12px] font-sans border border-[#e5dfd8] outline-none focus:border-[#c5a47e]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={forgotLoading || forgotOtp.length !== 6}
                    className="w-full h-10 bg-[#2c2420] text-white text-[10px] font-sans font-medium tracking-[0.14em] uppercase hover:bg-[#1a1614] transition-colors disabled:opacity-50"
                  >
                    {forgotLoading ? "Updating..." : "Update Password"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setForgotStep("email")}
                    className="w-full text-center text-[11px] font-sans text-[#8c7e74] hover:text-[#2c2420] underline"
                  >
                    Change Email Address
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
