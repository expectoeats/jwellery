"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrustBadges from "@/components/TrustBadges";
import BackToTop from "@/components/BackToTop";
import { FiMapPin, FiPhone, FiMail, FiClock, FiCheck, FiChevronDown } from "react-icons/fi";

const stores = [
  { name: "Aura Gems Flagship Store", address: "42/3 Silom Road, Bang Rak, Bangkok 10500, Thailand", phone: "+66 2 123 4567", hours: "Mon - Sat: 10:00 AM - 8:00 PM" },
  { name: "Aura Gems Chanthaburi", address: "15 Thetsaban Road, Mueang, Chanthaburi 22000, Thailand", phone: "+66 39 123 456", hours: "Mon - Sat: 9:00 AM - 6:00 PM" },
  { name: "Aura Gems Mumbai", address: "Bandra West, Mumbai, Maharashtra 400050, India", phone: "+91 22 1234 5678", hours: "Mon - Sat: 10:30 AM - 8:30 PM" },
];

const faqs = [
  { q: "What is your return policy?", a: "We offer a 30-day return policy for all unworn items in their original packaging. Simply contact our customer care team to initiate a return." },
  { q: "Are your gemstones certified?", a: "Yes, all our gemstones come with a certificate of authenticity. Diamonds over 0.5 carats include GIA certification." },
  { q: "How long does shipping take?", a: "Domestic orders typically arrive within 3-5 business days. International shipping takes 7-14 business days depending on your location." },
  { q: "Do you offer custom designs?", a: "Yes, we offer bespoke jewelry design services. Visit our flagship store or contact us to discuss your vision with our design team." },
  { q: "How do I care for my jewelry?", a: "Store pieces in the provided pouch, avoid harsh chemicals, and clean gently with a soft cloth. We also offer professional cleaning services." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        {/* Hero Banner */}
        <section className="relative h-[240px] sm:h-[300px] md:h-[400px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1440&h=500&fit=crop"
            alt="Contact Aura Gems"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-5">
              <h1 className="text-[28px] sm:text-[36px] md:text-[48px] font-serif font-light mb-2 sm:mb-3">Contact Us</h1>
              <div className="w-10 sm:w-12 h-[1px] bg-[#c5a47e] mx-auto" />
            </div>
          </div>
        </section>

        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "Contact Us" }]} />

          {/* Contact Info + Form */}
          <section className="py-10 sm:py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
            {/* Left - Info */}
            <div>
              <h2 className="text-[22px] sm:text-[24px] md:text-[28px] font-serif font-light text-[#2c2420] mb-4 sm:mb-6">
                Get in Touch
              </h2>
              <p className="text-[12px] sm:text-[13px] font-sans text-[#6b5e54] leading-[1.8] mb-6 sm:mb-8">
                Have a question about our jewelry, need assistance with an order, or want to explore
                a custom design? We&apos;re here to help.
              </p>

              <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                {[
                  { icon: FiPhone, label: "Call Us", lines: ["+66 2 123 4567 (Thailand)", "+91 22 1234 5678 (India)"] },
                  { icon: FiMail, label: "Email Us", lines: ["support@auragems.com", "custom@auragems.com"] },
                  { icon: FiClock, label: "Business Hours", lines: ["Mon - Sat: 10:00 AM - 8:00 PM (ICT)", "Sunday: Closed"] },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f8f5f1] flex items-center justify-center shrink-0">
                      <item.icon className="text-[14px] sm:text-[15px] text-[#c5a47e]" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-[12px] font-sans font-semibold text-[#2c2420] mb-0.5">{item.label}</p>
                      {item.lines.map((l, i) => (
                        <p key={i} className="text-[11px] sm:text-[12px] font-sans text-[#6b5e54]">{l}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Store Locations */}
              <h3 className="text-[15px] sm:text-[16px] font-serif text-[#2c2420] mb-3 sm:mb-4">Our Stores</h3>
              <div className="space-y-3 sm:space-y-4">
                {stores.map((store) => (
                  <div key={store.name} className="flex items-start gap-2.5 sm:gap-3 p-3.5 sm:p-4 bg-[#f8f5f1]">
                    <FiMapPin className="text-[13px] sm:text-[14px] text-[#c5a47e] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] sm:text-[12px] font-sans font-semibold text-[#2c2420] mb-0.5">{store.name}</p>
                      <p className="text-[10px] sm:text-[11px] font-sans text-[#6b5e54]">{store.address}</p>
                      <p className="text-[10px] sm:text-[11px] font-sans text-[#6b5e54]">{store.phone}</p>
                      <p className="text-[10px] sm:text-[11px] font-sans text-[#6b5e54]">{store.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Form */}
            <div>
              <h2 className="text-[22px] sm:text-[24px] md:text-[28px] font-serif font-light text-[#2c2420] mb-4 sm:mb-6">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="text-[10px] sm:text-[11px] font-sans font-medium text-[#2c2420] mb-1.5 block">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full h-11 px-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] sm:text-[11px] font-sans font-medium text-[#2c2420] mb-1.5 block">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full h-11 px-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="text-[10px] sm:text-[11px] font-sans font-medium text-[#2c2420] mb-1.5 block">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full h-11 px-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] sm:text-[11px] font-sans font-medium text-[#2c2420] mb-1.5 block">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full h-11 px-4 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors bg-white appearance-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="custom">Custom Design</option>
                      <option value="returns">Returns & Exchange</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] sm:text-[11px] font-sans font-medium text-[#2c2420] mb-1.5 block">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full sm:w-auto h-12 px-8 text-[11px] font-sans font-medium tracking-[0.12em] uppercase transition-all duration-300 ${
                    submitted
                      ? "bg-green-600 text-white"
                      : "bg-[#2c2420] text-white hover:bg-[#1a1614] active:bg-[#0d0b0a]"
                  }`}
                >
                  {submitted ? (
                    <span className="flex items-center gap-2 justify-center"><FiCheck className="text-[14px]" /> Message Sent</span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-10 sm:py-12 md:py-16 border-t border-[#e5dfd8]">
            <h2 className="text-center text-[22px] sm:text-[24px] md:text-[28px] font-serif font-light text-[#2c2420] mb-8 sm:mb-10">
              Frequently Asked Questions
            </h2>
            <div className="max-w-[700px] mx-auto space-y-2.5 sm:space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-[#e5dfd8]">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 text-left gap-3"
                  >
                    <span className="text-[12px] sm:text-[13px] font-sans font-medium text-[#2c2420]">{faq.q}</span>
                    <FiChevronDown className={`text-[14px] sm:text-[16px] text-[#6b5e54] shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[300px]" : "max-h-0"}`}>
                    <div className="px-4 sm:px-5 pb-3.5 sm:pb-4">
                      <p className="text-[11px] sm:text-[12px] font-sans text-[#6b5e54] leading-[1.8]">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <TrustBadges />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
