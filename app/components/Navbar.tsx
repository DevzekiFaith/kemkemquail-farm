"use client";

import { useState } from "react";

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ cartItemCount, onOpenCart }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/85 backdrop-blur-md shadow-[0_2px_18px_-8px_rgba(28,39,30,0.08)]">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 sm:px-8">
        
        {/* Brand Logo */}
        <div 
          onClick={() => scrollToSection("hero")}
          className="flex cursor-pointer items-center gap-2"
        >
          <span className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-cream font-bold text-lg shadow-sm">
            K
          </span>
          <span className="font-sans text-xl font-bold tracking-tight text-secondary">
            KEMKEM <span className="text-primary font-semibold text-base sm:inline hidden">QUAIL FARM</span>
          </span>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary/80">
          <button 
            onClick={() => scrollToSection("catalogue")}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Catalogue
          </button>
          <button 
            onClick={() => scrollToSection("benefits")}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Egg Benefits
          </button>
          <button 
            onClick={() => scrollToSection("farm")}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Our Farm
          </button>
          <button 
            onClick={() => scrollToSection("contact")}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Right Section: Cart, CTA and Burger */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-secondary/10 bg-cream/40 text-secondary hover:bg-cream hover:border-primary/20 transition-all cursor-pointer select-none"
            aria-label="Open Cart"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white animate-pulse">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Contact Us CTA Button */}
          <button
            onClick={() => scrollToSection("contact")}
            className="hidden sm:inline-flex h-10 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-white shadow-sm hover:bg-accent/90 transition-all hover:scale-102 cursor-pointer"
          >
            Order Inquiries
          </button>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-secondary/10 bg-cream/40 text-secondary hover:bg-cream cursor-pointer transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Links Slide-Down Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-secondary/5 bg-white py-4 px-6 space-y-3 shadow-inner flex flex-col text-sm font-semibold text-secondary/80 animate-fade-in">
          <button 
            onClick={() => scrollToSection("catalogue")}
            className="text-left py-2 hover:text-primary transition-colors cursor-pointer border-b border-secondary/5"
          >
            Catalogue
          </button>
          <button 
            onClick={() => scrollToSection("benefits")}
            className="text-left py-2 hover:text-primary transition-colors cursor-pointer border-b border-secondary/5"
          >
            Egg Benefits
          </button>
          <button 
            onClick={() => scrollToSection("farm")}
            className="text-left py-2 hover:text-primary transition-colors cursor-pointer border-b border-secondary/5"
          >
            Our Farm
          </button>
          <button 
            onClick={() => scrollToSection("contact")}
            className="text-left py-2 hover:text-primary transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
}
