"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CartDrawer from "@/components/CartDrawer";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";
import { api } from "@/services/api";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setErrorMsg("Please agree to the Terms & Conditions.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.register({ name, email, password });
      try {
        localStorage.setItem("aura-gems-user", JSON.stringify(res.user));
        localStorage.setItem("aura-gems-token", res.token);
      } catch {}
      setSuccessMsg("Account created successfully! Redirecting...");
      setTimeout(() => {
        router.push("/collections");
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#fcfbfa] min-h-[75vh] py-10 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 mb-6">
          <Breadcrumbs items={[{ label: "Account", href: "/login" }, { label: "Create Account" }]} />
        </div>

        <div className="max-w-[460px] mx-auto px-5">
          <div className="bg-white border border-[#e5dfd8] p-6 sm:p-10 shadow-sm">
            <div className="text-center mb-8">
              <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-[#c5a47e] uppercase block mb-1">
                Join Aura Gems
              </span>
              <h1 className="text-[26px] sm:text-[30px] font-serif font-light text-[#2c2420]">
                Create Account
              </h1>
              <p className="text-[12px] font-sans text-[#6b5e54] mt-1.5">
                Experience bespoke jewelry shopping and exclusive preview access.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-[12px] font-sans">
                {errorMsg}
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
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-[#6b5e54]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Jane Doe"
                    className="w-full h-11 pl-10 pr-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors"
                  />
                </div>
              </div>

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
                    placeholder="At least 6 characters"
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

              <div>
                <label className="text-[10px] font-sans font-medium text-[#2c2420] tracking-wide uppercase mb-1.5 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-[#6b5e54]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Re-enter password"
                    className="w-full h-11 pl-10 pr-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors"
                  />
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-[11px] font-sans text-[#6b5e54]">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="accent-[#c5a47e] mt-0.5"
                  />
                  <span>
                    I agree to the{" "}
                    <span className="text-[#2c2420] underline">Terms of Service</span> and{" "}
                    <span className="text-[#2c2420] underline">Privacy Policy</span>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#2c2420] text-white text-[11px] font-sans font-medium tracking-[0.12em] uppercase hover:bg-[#1a1614] active:bg-[#0d0b0a] transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#e5dfd8] text-center">
              <p className="text-[12px] font-sans text-[#6b5e54]">
                Already have an account?{" "}
                <Link href="/login" className="text-[#c5a47e] font-medium hover:underline ml-1">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
