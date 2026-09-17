"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SignaturePieces from "@/components/SignaturePieces";
import ShopByCategory from "@/components/ShopByCategory";
import PetalAndStone from "@/components/PetalAndStone";
import CustomerReviews from "@/components/CustomerReviews";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import CategoryProducts from "@/components/CategoryProducts";
import CartDrawer from "@/components/CartDrawer";
import { getProductById } from "@/data/products";

export default function Home() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const selectedProduct = selectedProductId ? getProductById(selectedProductId) : null;

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <SignaturePieces onProductClick={setSelectedProductId} />
        <ShopByCategory onCategoryClick={setSelectedCategory} />
        <PetalAndStone />
        <CustomerReviews />
        <Newsletter />
      </main>
      <Footer />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProductId(null)}
        />
      )}

      {/* Category Products Modal */}
      {selectedCategory && (
        <CategoryProducts
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onProductClick={(id) => {
            setSelectedCategory(null);
            setSelectedProductId(id);
          }}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
