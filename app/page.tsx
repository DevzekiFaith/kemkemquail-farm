"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalogue, { CatalogueItem } from "./components/Catalogue";
import Benefits from "./components/Benefits";
import Cart, { CartItem } from "./components/Cart";
import Footer from "./components/Footer";
import ComboPopup from "./components/ComboPopup";
import ReceiptModal from "./components/ReceiptModal";
import VideoModal from "./components/VideoModal";
import Community from "./components/Community";
import PaymentPoster from "./components/PaymentPoster";
import AdminDashboard, { TransactionRecord } from "./components/AdminDashboard";
import { ScrollProgress, ScrollReveal, TiltCard } from "./components/Parallax";

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"crates" | "combos">("crates");
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [receiptSubtotal, setReceiptSubtotal] = useState(0);
  const [receiptTotalEggs, setReceiptTotalEggs] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Admin Desk State
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("kemkem_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage on updates
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("kemkem_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // Open cart drawer on mount if openCart query parameter is present
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("openCart") === "true") {
        setIsCartOpen(true);
        // Clear query parameters from URL history without reloading
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    }
  }, [isLoaded]);

  const handleAddToCart = (item: CatalogueItem, quantity: number) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prevItems.map((ci) =>
          ci.item.id === item.id
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        );
      }
      return [...prevItems, { item, quantity }];
    });
    // Auto-open cart for feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((ci) =>
        ci.item.id === itemId ? { ...ci, quantity: newQuantity } : ci
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((ci) => ci.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    setCheckoutItems(cartItems);
    const sub = cartItems.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);
    setReceiptSubtotal(sub);
    const eggs = cartItems.reduce((acc, ci) => {
      const eggsInItem = ci.item.size || 0;
      return acc + eggsInItem * ci.quantity;
    }, 0);
    setReceiptTotalEggs(eggs);

    // Record checkout to Real-Time Admin Transaction Ledger
    if (typeof window !== "undefined") {
      try {
        const num = Math.floor(1000 + Math.random() * 9000);
        const newRecord: TransactionRecord = {
          id: `tx-${Date.now()}`,
          receiptId: `KK-2026-${num}`,
          timestamp: new Date().toLocaleString(),
          items: cartItems.map((ci) => ({
            name: ci.item.name,
            quantity: ci.quantity,
            priceUsd: ci.item.price,
            eggs: (ci.item.size || 0) * ci.quantity,
          })),
          totalEggs: eggs,
          subtotalUsd: sub,
          subtotalNgn: sub * 1600,
          paymentMethod: "FCMB Bank Transfer",
          status: "Pending Verification",
          customerName: "Online Store Customer",
          customerPhone: "WhatsApp Order",
        };

        const existingRaw = localStorage.getItem("kemkem_admin_transactions");
        let existingList: TransactionRecord[] = [];
        if (existingRaw) {
          existingList = JSON.parse(existingRaw);
        }
        localStorage.setItem(
          "kemkem_admin_transactions",
          JSON.stringify([newRecord, ...existingList])
        );
      } catch (e) {
        console.error("Failed to log admin transaction", e);
      }
    }

    setIsCartOpen(false);
    setIsReceiptOpen(true);
  };

  const cartItemCount = cartItems.length;

  const scrollToCatalogue = () => {
    setActiveTab("crates");
    const el = document.getElementById("catalogue");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigateToCombos = () => {
    setActiveTab("combos");
    const el = document.getElementById("catalogue");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-secondary selection:bg-primary/20 selection:text-primary">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Header / Navbar */}
      <Navbar 
        cartItemCount={cartItemCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero 
          onExploreClick={scrollToCatalogue} 
          onPlayVideoClick={() => setIsVideoOpen(true)}
        />

        {/* Catalogue Section (Store) */}
        <Catalogue 
          onAddToCart={handleAddToCart} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Benefits & Practices Section */}
        <Benefits />

        {/* Scan & Pay Station Section */}
        <section id="payment-station" className="py-24 bg-cream/15 relative overflow-hidden border-t border-secondary/5">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <ScrollReveal direction="left" delay={0.1} className="lg:col-span-6 space-y-6">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest block">
                  Scan & Pay Station
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
                  Seamless Bank Transfers
                </h2>
                <p className="text-secondary/70 text-sm leading-relaxed">
                  To complete your orders, scan the QR code using your mobile banking application or make a transfer directly to our corporate bank account details.
                </p>
                <p className="text-secondary/70 text-sm leading-relaxed">
                  Once payment is completed, download your receipt and share it with our WhatsApp representative using the links inside the shopping cart.
                </p>
                
                <div className="pt-4 flex flex-wrap gap-4">
                  <div className="bg-white border border-secondary/5 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
                    <span className="text-xs font-bold text-secondary">Instant Confirmation on WhatsApp</span>
                  </div>
                  <div className="bg-white border border-secondary/5 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs font-bold text-secondary">Eco-Friendly Cushioned Delivery</span>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="right" delay={0.25} className="lg:col-span-6 flex justify-center">
                <TiltCard maxTilt={5} scale={1.02} className="w-full flex justify-center">
                  <PaymentPoster className="hover:shadow-2xl transition-all duration-500" />
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CEO / Founder Spotlight Banner */}
        <section className="py-20 bg-background border-t border-secondary/5 relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="bg-gradient-to-br from-cream/40 via-white to-cream/20 border border-secondary/10 rounded-[36px] p-8 sm:p-12 shadow-md relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <ScrollReveal direction="left" delay={0.1} className="lg:col-span-4 flex justify-center">
                  <TiltCard maxTilt={6} scale={1.03} className="w-full max-w-xs">
                    <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden border-2 border-primary/20 shadow-lg">
                      <Image
                        src="/ceo.jpg"
                        alt="CEO Kemkem Quail Farm holding quail"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </TiltCard>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={0.2} className="lg:col-span-8 space-y-5">
                  <span className="text-xs font-bold text-accent uppercase tracking-widest block">
                    Meet Our Founder & CEO
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
                    "We don't just farm quails — we nurture pure organic wellness."
                  </h2>
                  <p className="text-secondary/70 text-sm leading-relaxed">
                    Learn about our CEO's hands-on commitment to sustainable quail farming, 100% plant-based organic feeding, and why quail eggs are nature's most potent superfood.
                  </p>
                  
                  <div className="pt-2 flex flex-wrap items-center gap-3.5">
                    <Link
                      href="/ceo"
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-cream font-bold text-xs py-3.5 px-8 rounded-full transition-all shadow-sm hover:shadow cursor-pointer"
                    >
                      Read Founder's Story & Quail Benefits →
                    </Link>

                    {/* Social Media Badges */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <a
                        href="https://www.instagram.com/kemkemfarm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-white hover:bg-cream border border-secondary/10 px-3.5 py-2.5 rounded-full text-xs font-bold text-secondary transition-all shadow-2xs hover:scale-102 cursor-pointer"
                        title="Follow Kemkem Farm on Instagram"
                      >
                        <span className="text-[#E4405F]">📸</span> IG: kemkem Farm
                      </a>

                      <a
                        href="https://www.tiktok.com/@kemkemquaileggs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-white hover:bg-cream border border-secondary/10 px-3.5 py-2.5 rounded-full text-xs font-bold text-secondary transition-all shadow-2xs hover:scale-102 cursor-pointer"
                        title="Follow Kemkem Quail Eggs on TikTok"
                      >
                        <span>🎵</span> TikTok: @kemkemquaileggs
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Community Sign-up Section */}
        <Community />
      </main>

      {/* Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />

      {/* Footer & FAQ Section */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Promo Combo Popup */}
      <ComboPopup 
        onAddComboToCart={(item) => handleAddToCart(item, 1)}
        onNavigateToCombos={handleNavigateToCombos}
      />

      {/* Checkout Receipt Modal with Print & Downloads */}
      <ReceiptModal 
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        checkoutItems={checkoutItems}
        subtotal={receiptSubtotal}
        totalEggs={receiptTotalEggs}
      />

      {/* Video Player Modal */}
      <VideoModal 
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      {/* Real-Time Admin Sales Desk Modal */}
      <AdminDashboard 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
}
