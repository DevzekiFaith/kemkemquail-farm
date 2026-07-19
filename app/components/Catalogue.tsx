"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CRATES, COMBOS, CatalogueItem } from "../data/products";

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
    <section id="catalogue" className="py-32 bg-cream/30">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-sm font-semibold tracking-wider text-primary uppercase mb-2">
            The Coop Shop
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-secondary tracking-tight max-w-xl mb-6 flex items-center justify-center gap-3">
            Choose Your Fresh Selection
            <span className="relative inline-block h-12 w-12 sm:h-16 sm:w-16 animate-float select-none flex-shrink-0">
              <Image
                src="/single-egg.png"
                alt="Single organic quail egg"
                fill
                sizes="64px"
                className="object-contain mix-blend-multiply"
              />
            </span>
          </h2>
          <p className="text-secondary/60 max-w-xl text-sm leading-relaxed mb-8">
            Select standard individual crates or opt for our affordable combined crate packs to save on your weekly supply. Hand-picked, inspected, and shipped in cushioned eco-packaging.
          </p>

          {/* Pricing Currency Switcher */}
          <div className="flex items-center gap-1.5 mb-8 bg-secondary/5 rounded-full p-1 border border-secondary/5 text-[10px] font-bold text-secondary/70 shadow-inner">
            <span className="pl-3 pr-1 text-secondary/40 uppercase tracking-widest text-[8px]">Currency:</span>
            <button
              onClick={() => setCurrency("both")}
              className={`px-3 py-1.5 rounded-full cursor-pointer transition-all ${currency === "both" ? "bg-white text-secondary shadow-sm" : "hover:text-secondary/90"}`}
            >
              Both ($ & ₦)
            </button>
            <button
              onClick={() => setCurrency("usd")}
              className={`px-3 py-1.5 rounded-full cursor-pointer transition-all ${currency === "usd" ? "bg-white text-secondary shadow-sm" : "hover:text-secondary/90"}`}
            >
              $ USD
            </button>
            <button
              onClick={() => setCurrency("ngn")}
              className={`px-3 py-1.5 rounded-full cursor-pointer transition-all ${currency === "ngn" ? "bg-white text-secondary shadow-sm" : "hover:text-secondary/90"}`}
            >
              ₦ NGN
            </button>
          </div>

          {/* Selection Tabs */}
          <div className="inline-flex rounded-full bg-secondary/5 p-1.5 border border-secondary/5">
            <button
              onClick={() => setActiveTab("crates")}
              className={`rounded-full px-8 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "crates"
                  ? "bg-primary text-cream shadow-md"
                  : "text-secondary/70 hover:text-secondary"
              }`}
            >
              Crates Selection
            </button>
            <button
              onClick={() => setActiveTab("combos")}
              className={`rounded-full px-8 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "combos"
                  ? "bg-primary text-cream shadow-md"
                  : "text-secondary/70 hover:text-secondary"
              }`}
            >
              Crate Combinations
            </button>
          </div>
        </div>

        {/* Catalog Grid */}
        <div key={activeTab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center animate-fade-in">
          {(activeTab === "crates" ? CRATES : COMBOS).map((item) => {
            const qty = quantities[item.id] || 1;
            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between rounded-[32px] bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(28,39,30,0.05)] hover:-translate-y-2 active:scale-98 transition-all duration-500 ease-out relative overflow-hidden"
              >
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
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
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

                  <button
                    onClick={() => handleAdd(item)}
                    className="flex-1 bg-secondary text-cream text-xs font-semibold py-2.5 px-4 rounded-full hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow active:scale-95 text-center select-none"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
