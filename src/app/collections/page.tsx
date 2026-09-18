"use client";

import { useState, useMemo } from "react";
import { products, allCategories } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import TrustBadges from "@/components/TrustBadges";
import BackToTop from "@/components/BackToTop";
import { FiSliders, FiX, FiChevronDown } from "react-icons/fi";

type SortOption = "featured" | "price-low" | "price-high" | "rating";

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = selectedCategory === "All"
      ? [...products]
      : products.filter((p) => p.category === selectedCategory);

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return result;
  }, [selectedCategory, sortBy]);

  const sortLabel = (v: SortOption) => {
    switch (v) {
      case "price-low": return "Price: Low to High";
      case "price-high": return "Price: High to Low";
      case "rating": return "Top Rated";
      default: return "Featured";
    }
  };

  const FilterSidebar = () => (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h4 className="text-[10px] sm:text-[11px] font-sans font-semibold text-[#2c2420] tracking-[0.1em] uppercase mb-2.5 sm:mb-3">
          Categories
        </h4>
        <div className="space-y-1 sm:space-y-2">
          {["All", ...allCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setMobileFilterOpen(false); }}
              className={`block w-full text-left text-[11px] sm:text-[12px] font-sans py-2 sm:py-1.5 px-3 rounded-sm transition-colors ${
                selectedCategory === cat
                  ? "bg-[#2c2420] text-white"
                  : "text-[#6b5e54] hover:text-[#2c2420] hover:bg-[#f8f5f1]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[10px] sm:text-[11px] font-sans font-semibold text-[#2c2420] tracking-[0.1em] uppercase mb-2.5 sm:mb-3">
          Sort By
        </h4>
        <div className="space-y-1 sm:space-y-2">
          {(["featured", "price-low", "price-high", "rating"] as SortOption[]).map((opt) => (
            <button
              key={opt}
              onClick={() => setSortBy(opt)}
              className={`block w-full text-left text-[11px] sm:text-[12px] font-sans py-2 sm:py-1.5 px-3 rounded-sm transition-colors ${
                sortBy === opt
                  ? "bg-[#2c2420] text-white"
                  : "text-[#6b5e54] hover:text-[#2c2420] hover:bg-[#f8f5f1]"
              }`}
            >
              {sortLabel(opt)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "Collections" }]} />

          <div className="flex items-end justify-between pb-4">
            <div>
              <h1 className="text-[24px] sm:text-[28px] md:text-[34px] font-serif font-light text-[#2c2420] mb-1 sm:mb-2">
                All Collections
              </h1>
              <p className="text-[11px] sm:text-[12px] font-sans text-[#6b5e54]">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Mobile Sort */}
            <div className="relative md:hidden">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-1.5 text-[11px] font-sans text-[#2c2420] border border-[#e5dfd8] px-3 py-2"
              >
                {sortLabel(sortBy)}
                <FiChevronDown className="text-[12px]" />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-[#e5dfd8] shadow-lg z-30 w-[180px]">
                  {(["featured", "price-low", "price-high", "rating"] as SortOption[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setSortOpen(false); }}
                      className={`block w-full text-left text-[11px] font-sans py-2.5 px-3 hover:bg-[#f8f5f1] transition-colors ${
                        sortBy === opt ? "text-[#c5a47e] font-medium" : "text-[#6b5e54]"
                      }`}
                    >
                      {sortLabel(opt)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 pb-12 sm:pb-16">
          <div className="flex gap-6 lg:gap-10">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-[200px] lg:w-[220px] shrink-0 pt-2">
              <FilterSidebar />
            </aside>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden fixed bottom-5 left-5 z-40 bg-[#2c2420] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform"
              aria-label="Open filters"
            >
              <FiSliders className="text-[16px]" />
            </button>

            {/* Mobile Filter Drawer */}
            {mobileFilterOpen && (
              <div className="md:hidden fixed inset-0 z-50">
                <div className="fixed inset-0 bg-black/50" onClick={() => setMobileFilterOpen(false)} />
                <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] flex flex-col z-10 animate-slide-up">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5dfd8] shrink-0">
                    <h3 className="text-[15px] font-serif text-[#2c2420]">Filters & Sort</h3>
                    <button onClick={() => setMobileFilterOpen(false)} className="w-8 h-8 flex items-center justify-center" aria-label="Close filters">
                      <FiX className="text-[18px] text-[#2c2420]" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto px-5 py-5">
                    <FilterSidebar />
                  </div>
                  <div className="px-5 py-4 border-t border-[#e5dfd8] shrink-0">
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="w-full h-11 bg-[#2c2420] text-white text-[11px] font-sans font-medium tracking-[0.1em] uppercase hover:bg-[#1a1614] transition-colors"
                    >
                      Show {filtered.length} Results
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-16 sm:py-20">
                  <p className="text-[14px] sm:text-[16px] font-serif text-[#6b5e54]">No products found.</p>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="mt-3 sm:mt-4 text-[11px] sm:text-[12px] font-sans text-[#c5a47e] underline hover:text-[#2c2420] transition-colors"
                  >
                    View All Products
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <TrustBadges />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
