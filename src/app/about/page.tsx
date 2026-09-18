"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrustBadges from "@/components/TrustBadges";
import BackToTop from "@/components/BackToTop";

const values = [
  { title: "Authenticity", desc: "Every piece is crafted with genuine, ethically-sourced gemstones and precious metals." },
  { title: "Craftsmanship", desc: "Our master artisans combine centuries-old techniques with modern precision." },
  { title: "Sustainability", desc: "We are committed to responsible sourcing and environmentally conscious practices." },
  { title: "Trust", desc: "Each piece comes with a certificate of authenticity and lifetime warranty." },
];

const milestones = [
  { year: "2018", title: "Founded", desc: "Aura Gems was born from a passion for handcrafted jewelry from Thailand's gem capital." },
  { year: "2019", title: "First Collection", desc: "Launched our debut collection of 50 unique gemstone pieces." },
  { year: "2021", title: "Global Reach", desc: "Expanded to serve customers in over 20 countries worldwide." },
  { year: "2023", title: "10,000+ Happy Customers", desc: "Reached a milestone of 10,000 satisfied customers globally." },
  { year: "2025", title: "Sustainability Pledge", desc: "Committed to 100% ethical sourcing and carbon-neutral operations." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        {/* Hero Banner */}
        <section className="relative h-[240px] sm:h-[300px] md:h-[400px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1440&h=500&fit=crop"
            alt="Aura Gems Craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-5">
              <h1 className="text-[28px] sm:text-[36px] md:text-[48px] font-serif font-light mb-2 sm:mb-3">Our Story</h1>
              <div className="w-10 sm:w-12 h-[1px] bg-[#c5a47e] mx-auto" />
            </div>
          </div>
        </section>

        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "Our Story" }]} />

          {/* Brand Story */}
          <section className="py-10 sm:py-12 md:py-16 max-w-[800px] mx-auto text-center">
            <p className="text-[9px] sm:text-[10px] md:text-[11px] font-sans tracking-[0.22em] text-[#6b5e54] uppercase mb-2.5 sm:mb-3">
              Since 2018
            </p>
            <h2 className="text-[24px] sm:text-[28px] md:text-[34px] font-serif font-light text-[#2c2420] mb-4 sm:mb-6">
              Born from Nature&apos;s Own Hand
            </h2>
            <div className="w-10 sm:w-12 h-[1.5px] bg-[#c5a47e] mx-auto mb-4 sm:mb-6" />
            <p className="text-[12px] sm:text-[13px] font-sans text-[#6b5e54] leading-[1.9] mb-3 sm:mb-4">
              Aura Gems was founded with a singular vision: to bring the extraordinary beauty of Thailand&apos;s
              gemstones to the world. From the sapphire mines of Chanthaburi to the gem workshops of Bangkok,
              every piece tells a story of nature&apos;s artistry and human craftsmanship.
            </p>
            <p className="text-[12px] sm:text-[13px] font-sans text-[#6b5e54] leading-[1.9]">
              Our master artisans, with generations of expertise, transform raw gemstones into wearable works
              of art. Each piece is meticulously handcrafted, ensuring that no two are exactly alike — making
              your jewelry as unique as you are.
            </p>
          </section>

          {/* Values */}
          <section className="py-10 sm:py-12 md:py-16 bg-[#f8f5f1] -mx-5 md:-mx-8 lg:-mx-12 px-5 md:px-8 lg:px-12 mb-12 sm:mb-16">
            <h2 className="text-center text-[22px] sm:text-[24px] md:text-[28px] font-serif font-light text-[#2c2420] mb-8 sm:mb-10">
              Our Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-[1100px] mx-auto">
              {values.map((v) => (
                <div key={v.title} className="text-center p-5 sm:p-6 bg-white">
                  <h3 className="text-[13px] sm:text-[14px] font-serif font-semibold text-[#2c2420] mb-1.5 sm:mb-2">{v.title}</h3>
                  <p className="text-[10px] sm:text-[11px] font-sans text-[#6b5e54] leading-[1.7]">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="py-10 sm:py-12 md:py-16 max-w-[700px] mx-auto mb-12 sm:mb-16">
            <h2 className="text-center text-[22px] sm:text-[24px] md:text-[28px] font-serif font-light text-[#2c2420] mb-8 sm:mb-10">
              Our Journey
            </h2>
            <div className="space-y-6 sm:space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-4 sm:gap-6">
                  <div className="shrink-0 w-[50px] sm:w-[60px] text-right">
                    <span className="text-[12px] sm:text-[14px] font-sans font-semibold text-[#c5a47e]">{m.year}</span>
                  </div>
                  <div className="border-l border-[#e5dfd8] pl-4 sm:pl-6 pb-1.5 sm:pb-2">
                    <h3 className="text-[13px] sm:text-[14px] font-serif font-semibold text-[#2c2420] mb-0.5 sm:mb-1">{m.title}</h3>
                    <p className="text-[11px] sm:text-[12px] font-sans text-[#6b5e54] leading-[1.7]">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Craftsmanship Section */}
          <section className="py-10 sm:py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=700&h=525&fit=crop"
                alt="Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[9px] sm:text-[10px] md:text-[11px] font-sans tracking-[0.22em] text-[#6b5e54] uppercase mb-2.5 sm:mb-3">
                The Aura Gems Difference
              </p>
              <h2 className="text-[24px] sm:text-[28px] md:text-[34px] font-serif font-light text-[#2c2420] mb-3 sm:mb-4">
                Master Craftsmanship
              </h2>
              <div className="w-10 sm:w-12 h-[1.5px] bg-[#c5a47e] mb-4 sm:mb-5" />
              <p className="text-[12px] sm:text-[13px] font-sans text-[#6b5e54] leading-[1.9] mb-3 sm:mb-4">
                Every Aura Gems piece passes through the hands of skilled artisans who have perfected their
                craft over decades. From stone selection to final polishing, each step is performed with
                precision and care.
              </p>
              <p className="text-[12px] sm:text-[13px] font-sans text-[#6b5e54] leading-[1.9]">
                We use only the finest materials — GIA-certified gemstones, 925 sterling silver, and
                14K/18K gold — ensuring that every piece meets our exacting standards of quality and beauty.
              </p>
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
