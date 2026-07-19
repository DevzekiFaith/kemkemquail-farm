"use client";

import { useState, useEffect } from "react";
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
      const size = ci.item.size || 0;
      let eggsInItem = size;
      if (ci.item.id === "combo-double-dozen") eggsInItem = 24;
      if (ci.item.id === "combo-master-duet") eggsInItem = 60;
      if (ci.item.id === "combo-sampler-trio") eggsInItem = 48;
      return acc + eggsInItem * ci.quantity;
    }, 0);
    setReceiptTotalEggs(eggs);
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
      {/* Header / Navbar */}
      <Navbar 
        cartItemCount={cartItemCount} 
        onOpenCart={() => setIsCartOpen(true)} 
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
              <div className="lg:col-span-6 space-y-6">
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
                    <span className="h-2 w-2 rounded-full bg-[#25D366]" />
                    <span className="text-xs font-bold text-secondary">Instant Confirmation on WhatsApp</span>
                  </div>
                  <div className="bg-white border border-secondary/5 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span className="text-xs font-bold text-secondary">Eco-Friendly Cushioned Delivery</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-6 flex justify-center">
                <PaymentPoster className="hover:-translate-y-1.5 transition-transform duration-500" />
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
      <Footer />

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
    </div>
  );
}
