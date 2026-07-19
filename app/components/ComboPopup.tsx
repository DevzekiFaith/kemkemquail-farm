"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ComboPopupProps {
  onAddComboToCart: (item: any) => void;
  onNavigateToCombos: () => void;
}

const POPUP_COMBO = {
  id: "combo-double-dozen",
  name: "Double Dozen Combo",
  price: 11.50,
  description: "Get 24 gourmet quail eggs (2 x 12-Egg Crates) for just $11.50 / ₦18,400. Limited weekly offer!",
  type: "combo",
  details: ["2 x 12-Egg Gourmet Crates", "Saves over 11% compared to single buying"],
  image: "/combo.png",
};

export default function ComboPopup({ onAddComboToCart, onNavigateToCombos }: ComboPopupProps) {
  const [isMinimized, setIsMinimized] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Determine whether to show the popup or keep it minimized on start
    const dismissed = localStorage.getItem("kemkem_promo_dismissed");
    if (dismissed === "true") {
      setIsMinimized(true);
      setHasMounted(true);
    } else {
      // Auto-expand after 3 seconds if never dismissed before
      const timer = setTimeout(() => {
        setIsMinimized(false);
        setHasMounted(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
    localStorage.setItem("kemkem_promo_dismissed", "true");
  };

  const handleCardClick = () => {
    onNavigateToCombos();
    setIsMinimized(true);
  };

  const handleClaim = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddComboToCart(POPUP_COMBO);
    setIsMinimized(true);
  };

  if (!hasMounted) return null;

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-40 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary text-cream flex items-center justify-center font-serif text-xl sm:text-2xl font-extrabold shadow-2xl hover:bg-primary-light hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/10 group animate-float"
        title="View Promo Offer"
        aria-label="Open Special Offer"
      >
        K
        {/* Pulsing alert ring */}
        <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-accent border-2 border-white flex items-center justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
        </span>
        {/* Tooltip on hover */}
        <span className="absolute right-full mr-3 bg-secondary text-cream text-[10px] font-bold py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow pointer-events-none">
          Special Offer! 🎁
        </span>
      </button>
    );
  }

  return (
    <div 
      onClick={handleCardClick}
      className="fixed bottom-6 right-6 z-40 max-w-sm rounded-3xl bg-white p-5 shadow-2xl border border-secondary/5 hover:border-primary/20 hover:shadow-primary/5 cursor-pointer transition-all duration-500 ease-out transform translate-y-0 scale-100 hover:scale-[1.03] animate-fade-in flex gap-4 items-center"
      role="alert"
    >
      {/* Close Button */}
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-secondary/40 hover:text-secondary hover:bg-secondary/5 p-1 rounded-full cursor-pointer transition-colors"
        aria-label="Dismiss Offer"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Combo Image */}
      <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-cream flex-shrink-0">
        <Image
          src={POPUP_COMBO.image}
          alt={POPUP_COMBO.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Combo Details */}
      <div className="flex-1 min-w-0 pr-4">
        <span className="inline-block bg-accent/15 text-accent text-[9px] font-bold px-2 py-0.5 rounded-full mb-1.5 uppercase tracking-wider">
          Best Seller Bundle
        </span>
        <h4 className="font-serif text-sm font-bold text-secondary tracking-tight mb-1 truncate">
          {POPUP_COMBO.name}
        </h4>
        <p className="text-secondary/60 text-[10px] leading-relaxed mb-2 line-clamp-2">
          {POPUP_COMBO.description}
        </p>

        {/* Claim Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleClaim}
            className="bg-primary text-cream text-[10px] font-bold py-1.5 px-4 rounded-full hover:bg-primary-light hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
          >
            Claim Deal
          </button>
          <span className="text-[10px] text-secondary/40 font-semibold hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}
