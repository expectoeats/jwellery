"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SignaturePieces from "@/components/SignaturePieces";
import ShopByCategory from "@/components/ShopByCategory";
import PetalAndStone from "@/components/PetalAndStone";
import CustomerReviews from "@/components/CustomerReviews";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import InstagramFeed from "@/components/InstagramFeed";
import BackToTop from "@/components/BackToTop";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <SignaturePieces />
        <ShopByCategory />
        <PetalAndStone />
        <CustomerReviews />
        <Newsletter />
        <TrustBadges />
        <InstagramFeed />
      </main>
      <Footer />
      <BackToTop />
      <CartDrawer />
    </>
  );
}
