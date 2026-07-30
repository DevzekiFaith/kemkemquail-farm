"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { CRATES, COMBOS, CatalogueItem } from "../data/products";
import { TiltCard, ScrollReveal, Parallax } from "./Parallax";

export type { CatalogueItem };

interface CatalogueProps {
  onAddToCart: (item: CatalogueItem, quantity: number) => void;
  activeTab: "crates" | "combos";
  setActiveTab: (tab: "crates" | "combos") => void;
}

export default function Catalogue({ onAddToCart, activeTab, setActiveTab }: CatalogueProps) {
  const [currency, setCurrency] = useState<"both" | "usd" | "ngn">("both");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQtyChange = (id: string, delta: number) => {
    const current = quantities[id] || 1;
    const next = Math.max(1, current + delta);
    setQuantities((prev) => ({ ...prev, [id]: next }));
  };

  const handleAdd = (item: CatalogueItem) => {
    const qty = quantities[item.id] || 1;
    onAddToCart(item, qty);
    setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
  };

  const formatPrice = (usd: number) => {
    const ngn = usd * 1600;
    if (currency === "usd") {
      return `$${usd.toFixed(2)}`;
    }
    if (currency === "ngn") {
      return `₦${ngn.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `$${usd.toFixed(2)} (₦${ngn.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })})`;
  };

  return (
    <section id="catalogue" className="py-32 bg-cream/30 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Section Header with Side-by-Side Business QR Code Card */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-16 bg-white/70 border border-secondary/5 rounded-3xl p-8 sm:p-10 shadow-sm backdrop-blur-md relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Text Header, Currency & Tabs */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-sm font-semibold tracking-wider text-primary uppercase mb-2">
                  The Coop Shop
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-secondary tracking-tight mb-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <span>Choose Your Fresh Selection</span>
                  <Parallax speed={-0.15}>
                    <motion.span 
                      animate={{ y: [0, -6, 0], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="relative inline-block h-10 w-10 sm:h-14 sm:w-14 select-none flex-shrink-0 cursor-pointer"
                    >
                      <Image
                        src="/single-egg.png"
                        alt="Single organic quail egg"
                        fill
                        sizes="56px"
                        className="object-contain mix-blend-multiply"
                      />
                    </motion.span>
                  </Parallax>
                </h2>
                <p className="text-secondary/70 max-w-xl text-sm leading-relaxed mb-6">
                  Select standard individual crates or opt for our affordable combined crate packs to save on your weekly supply. Hand-picked, inspected, and shipped in cushioned eco-packaging.
                </p>

                {/* Pricing Currency Switcher */}
                <div className="flex items-center gap-1.5 mb-6 bg-secondary/5 rounded-full p-1 border border-secondary/5 text-[10px] font-bold text-secondary/70 shadow-inner">
                  <span className="pl-3 pr-1 text-secondary/40 uppercase tracking-widest text-[8px]">Currency:</span>
                  <button
                    onClick={() => setCurrency("both")}
                    className={`px-3 py-1.5 rounded-full cursor-pointer transition-all ${currency === "both" ? "bg-white text-secondary shadow-sm font-extrabold" : "hover:text-secondary/90"}`}
                  >
                    Both ($ & ₦)
                  </button>
                  <button
                    onClick={() => setCurrency("usd")}
                    className={`px-3 py-1.5 rounded-full cursor-pointer transition-all ${currency === "usd" ? "bg-white text-secondary shadow-sm font-extrabold" : "hover:text-secondary/90"}`}
                  >
                    $ USD
                  </button>
                  <button
                    onClick={() => setCurrency("ngn")}
                    className={`px-3 py-1.5 rounded-full cursor-pointer transition-all ${currency === "ngn" ? "bg-white text-secondary shadow-sm font-extrabold" : "hover:text-secondary/90"}`}
                  >
                    ₦ NGN
                  </button>
                </div>

                {/* Selection Tabs with Animated Pill indicator */}
                <div className="inline-flex rounded-full bg-secondary/5 p-1.5 border border-secondary/5 relative">
                  <button
                    onClick={() => setActiveTab("crates")}
                    className={`relative rounded-full px-6 sm:px-8 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer z-10 ${
                      activeTab === "crates" ? "text-cream" : "text-secondary/70 hover:text-secondary"
                    }`}
                  >
                    {activeTab === "crates" && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-primary rounded-full shadow-md -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    Crates Selection
                  </button>
                  <button
                    onClick={() => setActiveTab("combos")}
                    className={`relative rounded-full px-6 sm:px-8 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer z-10 ${
                      activeTab === "combos" ? "text-cream" : "text-secondary/70 hover:text-secondary"
                    }`}
                  >
                    {activeTab === "combos" && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-primary rounded-full shadow-md -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    Crate Combinations
                  </button>
                </div>
              </div>

              {/* Right Column: Business Scannable & Printable QR Code Card with 3D Tilt */}
              <div className="lg:col-span-5 flex justify-center">
                <TiltCard maxTilt={6} scale={1.02} className="w-full max-w-sm">
                  <div className="bg-gradient-to-b from-white via-cream/20 to-cream/50 border-2 border-primary/20 rounded-3xl p-6 shadow-xl w-full flex flex-col items-center text-center relative overflow-hidden group">
                    {/* Decorative top ribbon badge */}
                    <div className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                      Official Business QR Code
                    </div>

                    <h3 className="font-serif font-extrabold text-secondary text-base mb-1">
                      Kemkem Quail Farm
                    </h3>
                    <p className="text-secondary/60 text-[11px] mb-4">
                      Scan to Pay & Order or Download PNG to Print
                    </p>

                    {/* Active Scannable QR Code Container */}
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      className="relative h-44 w-44 bg-white border-2 border-secondary/10 rounded-2xl p-3 mb-4 shadow-md flex items-center justify-center cursor-pointer"
                    >
                      <QRCodeSVG
                        value="https://wa.me/2347062664288?text=Hello%20Kemkem%20Quail%20Farm!%20I%20would%20like%20to%20order%20fresh%20quail%20eggs."
                        size={152}
                        bgColor="#FFFFFF"
                        fgColor="#1C271E"
                        level="H"
                      />
                    </motion.div>

                    {/* Bank Quick Account Info */}
                    <div className="w-full bg-white/80 border border-secondary/10 rounded-2xl p-3 mb-4 text-[11px] text-secondary/80 font-sans shadow-2xs space-y-1">
                      <div className="font-bold text-primary text-[11px]">FCMB BANK TRANSFER</div>
                      <div className="font-mono text-[11px]">A/C: <span className="font-bold text-secondary select-all">2007744689</span></div>
                      <div className="text-[9px] text-secondary/50 italic">KEMKEM QUAIL FARMS ENTERPRISE</div>
                    </div>

                    {/* Print & Download PNG Button */}
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      href="/kemkem-qr-code.png"
                      download="Kemkem_Quail_Farm_QR_Code.png"
                      className="w-full bg-secondary hover:bg-primary text-cream hover:text-white text-xs font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                    >
                      <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download & Print QR PNG
                    </motion.a>

                    <span className="text-[9px] text-secondary/50 font-medium mt-2">
                      📷 Point camera to scan & pay directly
                    </span>
                  </div>
                </TiltCard>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* Catalog Grid with Staggered Motion Entry & 3D Tilt Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center"
          >
            {(activeTab === "crates" ? CRATES : COMBOS).map((item, index) => {
              const qty = quantities[item.id] || 1;
              return (
                <ScrollReveal key={item.id} delay={index * 0.08} direction="up">
                  <TiltCard maxTilt={5} scale={1.02} className="h-full">
                    <div className="group flex flex-col justify-between rounded-[32px] bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(28,39,30,0.08)] transition-all duration-500 ease-out relative overflow-hidden h-full">
                      {/* Badge for crate size / saving */}
                      {item.size && (
                        <span className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full z-10">
                          {item.size} Eggs
                        </span>
                      )}

                      <div>
                        {/* Image Container with Link */}
                        <Link href={`/crates/${item.id}`} className="block relative h-44 w-full rounded-2xl overflow-hidden bg-cream mb-6 flex items-center justify-center cursor-pointer">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                        </Link>

                        {/* Title & Price */}
                        <div className="flex flex-col gap-1 mb-2">
                          <Link href={`/crates/${item.id}`} className="hover:text-primary transition-colors">
                            <h3 className="font-serif text-lg font-bold text-secondary tracking-tight">
                              {item.name} {item.size && <span className="font-sans font-extrabold text-accent ml-1">({item.size} Eggs)</span>}
                            </h3>
                          </Link>
                          <span className="text-primary font-bold text-base whitespace-nowrap">
                            {formatPrice(item.price)}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-secondary/60 text-xs mb-4 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>

                        {/* Detailed Specs */}
                        <ul className="space-y-1.5 mb-6">
                          {item.details.map((d, i) => (
                            <li key={i} className="flex items-center gap-2 text-[11px] text-secondary/70">
                              <svg
                                className="h-3.5 w-3.5 text-primary flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="2.5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Interactive Buying Bar */}
                      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-secondary/5">
                        <div className="flex items-center border border-secondary/10 rounded-full bg-cream/20">
                          <button
                            onClick={() => handleQtyChange(item.id, -1)}
                            className="px-3 py-1.5 hover:text-primary transition-colors text-secondary/60 cursor-pointer font-bold select-none"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-secondary">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleQtyChange(item.id, 1)}
                            className="px-3 py-1.5 hover:text-primary transition-colors text-secondary/60 cursor-pointer font-bold select-none"
                          >
                            +
                          </button>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAdd(item)}
                          className="flex-1 bg-secondary text-cream text-xs font-semibold py-2.5 px-4 rounded-full hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow text-center select-none"
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
