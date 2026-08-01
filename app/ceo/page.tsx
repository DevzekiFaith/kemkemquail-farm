"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart, { CartItem } from "../components/Cart";
import ReceiptModal from "../components/ReceiptModal";
import AdminDashboard from "../components/AdminDashboard";
import { ScrollProgress, ScrollReveal, TiltCard, Parallax } from "../components/Parallax";

export default function CEOPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const cartItemCount = cartItems.length;

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-secondary selection:bg-primary/20 selection:text-primary flex flex-col justify-between">
      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Header / Navbar */}
      <Navbar 
        cartItemCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* CEO Hero Header */}
        <section className="relative bg-cream/30 py-16 sm:py-24 border-b border-secondary/5 overflow-hidden">
          <Parallax speed={0.15} className="absolute inset-0 pointer-events-none">
            <div className="organic-bg" />
          </Parallax>

          <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
            <div className="max-w-3xl">
              <ScrollReveal direction="down" delay={0.1}>
                <span className="text-xs font-bold tracking-widest text-accent uppercase bg-accent/10 px-3.5 py-1.5 rounded-full inline-block mb-4">
                  Meet Our Founder & CEO
                </span>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-secondary tracking-tight leading-[1.15] mb-6">
                  Driven by Passion for <br />
                  <span className="text-primary italic font-normal">Pure Organic</span> Nutrition
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-secondary/70 text-base sm:text-lg leading-relaxed">
                  Welcome to Kemkem Quail Farm Enterprise. Read about our founder's journey, her passion for sustainable quail farming, and why quail eggs are nature's most potent superfood.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Main CEO Profile & Message Grid */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: CEO Photo Card with 3D Tilt */}
              <ScrollReveal direction="left" delay={0.2} className="lg:col-span-5">
                <TiltCard maxTilt={6} scale={1.02} className="w-full">
                  <div className="bg-white p-4 sm:p-5 rounded-[36px] border border-secondary/10 shadow-xl relative overflow-hidden group">
                    <div className="relative aspect-[4/5] w-full rounded-[28px] overflow-hidden bg-cream">
                      <Image
                        src="/ceo.jpg"
                        alt="Kemkem Quail Farm CEO holding quail bird in farm coop"
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                    </div>

                    {/* Profile Caption Tag */}
                    <div className="pt-5 pb-2 text-center">
                      <h3 className="font-serif text-xl font-extrabold text-secondary">
                        Chief Executive Officer
                      </h3>
                      <p className="text-xs text-primary font-bold tracking-wider uppercase mt-0.5">
                        Kemkem Quail Farm Enterprise
                      </p>

                      <div className="mt-3 flex justify-center gap-2 text-[10px] text-secondary/50 font-mono font-bold uppercase">
                        <span>CAC: 9071156</span>
                        <span>•</span>
                        <span>NAFDAC: A8-123266L</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              {/* Right Column: Founder's Message & Quail Importance */}
              <ScrollReveal direction="right" delay={0.3} className="lg:col-span-7 space-y-8">
                
                {/* Quote Header */}
                <div className="bg-white border-l-4 border-primary rounded-2xl p-6 shadow-sm">
                  <blockquote className="font-serif text-lg sm:text-xl font-bold text-secondary italic leading-relaxed">
                    "Every egg that leaves our coop is a promise of pure, unadulterated health. We don't just farm quails — we nurture wellness for your family."
                  </blockquote>
                </div>

                {/* Narrative Sections */}
                <div className="space-y-6 text-sm text-secondary/80 leading-relaxed">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-secondary mb-3">
                      My Passion for Quail Farming
                    </h3>
                    <p className="mb-4">
                      My journey into quail farming began with a clear purpose: to bridge the gap between commercial agriculture and genuine, chemical-free superfood nutrition. As a farmer, I take pride in being hands-on inside our coops — ensuring our Coturnix quails live in spotless, climate-controlled environments and feed exclusively on 100% plant-based organic meals.
                    </p>
                    <p>
                      At Kemkem Quail Farm Enterprise, we reject artificial growth hormones, antibiotics, and synthetic coloring. Our birds thrive naturally, producing eggs that are as pure as nature intended.
                    </p>
                  </div>

                  {/* Why Quail Eggs Are Important */}
                  <div className="bg-cream/25 border border-secondary/5 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
                    <h3 className="font-serif text-xl font-bold text-primary flex items-center gap-2">
                      <span className="text-xl">🥚</span> Why Quail Eggs Are a Superfood Powerhouse
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="bg-white p-4 rounded-2xl border border-secondary/5 shadow-2xs">
                        <span className="text-xs font-bold text-primary block mb-1">Double the Iron</span>
                        <p className="text-[11px] text-secondary/65 leading-normal">
                          Contains over 2x the iron of standard chicken eggs, enhancing oxygen supply and boosting natural energy levels.
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-secondary/5 shadow-2xs">
                        <span className="text-xs font-bold text-primary block mb-1">3x Vitamin B12</span>
                        <p className="text-[11px] text-secondary/65 leading-normal">
                          High concentration of Vitamin B12 for vital neurological function, red blood cell growth, and stamina.
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-secondary/5 shadow-2xs">
                        <span className="text-xs font-bold text-primary block mb-1">Ovomucoid Proteins</span>
                        <p className="text-[11px] text-secondary/65 leading-normal">
                          Rich in ovomucoid proteins acting as natural anti-allergens, making them gentle on digestion for all ages.
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-secondary/5 shadow-2xs">
                        <span className="text-xs font-bold text-primary block mb-1">Immune Boosters</span>
                        <p className="text-[11px] text-secondary/65 leading-normal">
                          Packed with essential antioxidants, vitamin A, phosphorus, and high-density protein for cellular repair.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quality Commitment */}
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-secondary mb-3">
                      Our Promise to Supermarket Partners & Households
                    </h3>
                    <p className="mb-4">
                      Whether supplying individual family crates or fulfilling large regular shipments for retail supermarket chains (like SPAR Nigeria), we maintain strict NAFDAC-compliant sanitation and shock-absorbent eco-packaging.
                    </p>
                    <p>
                      Every egg is individually inspected by hand before placement into our specialized pulp trays, guaranteeing freshness from coop to kitchen table.
                    </p>
                  </div>
                </div>

                {/* Call to Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-secondary/10">
                  <Link
                    href="/#catalogue"
                    className="bg-primary hover:bg-primary-light text-cream font-bold text-xs py-3.5 px-8 rounded-full transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Order Farm-Fresh Crate Trays
                  </Link>

                  <a
                    href="https://wa.me/2349021012556?text=Hello%20CEO%20Kemkem%20Quail%20Farm!%20I'm%20interested%20in%20supermarket%20or%20bulk%20supply%20partnership."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary hover:bg-secondary/90 text-cream text-xs font-bold py-3.5 px-8 rounded-full transition-all shadow-sm cursor-pointer flex items-center gap-2"
                  >
                    <svg className="h-4 w-4 fill-[#25D366]" viewBox="0 0 24 24">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.95 9.95 0 0 0 4.887 1.33c5.508 0 9.99-4.478 9.991-9.985a9.97 9.97 0 0 0-2.928-7.057 9.97 9.97 0 0 0-7.08-2.941zM6.88 18.062l-.307-.182a8.21 8.21 0 0 1-1.258-1.026l-.168-.182a8.3 8.3 0 0 1-1.328-4.708 8.32 8.32 0 0 1 8.31-8.31 8.28 8.28 0 0 1 5.88 2.43 8.28 8.28 0 0 1 2.43 5.88 8.32 8.32 0 0 1-8.31 8.31 8.22 8.22 0 0 1-4.053-1.058l-.348-.203-3.13.82.842-3.081zm7.746-4.502c-.266-.134-1.57-.775-1.813-.863-.243-.089-.42-.133-.596.133-.177.266-.685.864-.84 1.04-.155.177-.31.199-.576.066a7.25 7.25 0 0 1-2.138-1.32 7.97 7.97 0 0 1-1.479-1.84c-.155-.266-.016-.41.117-.542.121-.12.266-.31.4-.465.133-.155.177-.266.266-.443.089-.177.044-.332-.022-.465-.067-.133-.597-1.439-.818-1.97-.215-.518-.465-.448-.596-.454-.15-.008-.321-.01-.492-.01a.948.948 0 0 0-.686.321c-.243.266-.929.908-.929 2.215 0 1.307.952 2.568 1.085 2.746.133.177 1.874 2.862 4.542 4.012.635.273 1.13.436 1.516.559.64.203 1.222.174 1.68.106.512-.077 1.57-.642 1.792-1.262.221-.62.221-1.15.155-1.262-.067-.111-.243-.177-.51-.311z"/>
                    </svg>
                    Partner / Supermarket Bulk Inquiries
                  </a>
                </div>

              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
        onClearCart={() => {}}
        onCheckout={() => {}}
      />

      {/* Admin Sales Desk Modal */}
      <AdminDashboard 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
}
