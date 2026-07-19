"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Benefits() {
  const slides = [
    { src: "/farm.png", caption: "Sanitized Eco-Coop Setup for Coturnix Breed" },
    { src: "/coop-real1.jpg", caption: "Premium Selection and Official Branded Outlets" },
    { src: "/farm2.png", caption: "Healthy Feeding & Organic Hydration Methods" },
    { src: "/coop-real2.jpg", caption: "Freshly Sorted Cartons Ready for Customer Deliveries" },
    { src: "/farm3.png", caption: "Daily Fresh Collection and Egg Care" },
  ];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="benefits" className="py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Top Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-sm font-semibold tracking-wider text-primary uppercase mb-2 block">
            Egg Benefits & Quality
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-secondary tracking-tight">
            Tiny Eggs, Mighty Nutrition
          </h2>
          <p className="mt-4 text-secondary/60 text-base leading-relaxed">
            Despite their small size, quail eggs are packed with vitamins and minerals, outperforming standard chicken eggs in core nutrient densities. Discover what makes them a powerhouse.
          </p>
        </div>

        {/* The Split Grid (Agrono Bottom Style) */}
        <div id="farm" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Card: White Background, Bright details */}
          <div className="lg:col-span-7 bg-white border border-secondary/5 rounded-[32px] p-8 sm:p-12 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 ease-out">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Nutritional Breakdown
                </span>
              </div>
              
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-secondary mb-6 leading-tight">
                Purely Organic, Premium Sourced Superfood
              </h3>
              
              <p className="text-secondary/60 text-sm leading-relaxed mb-8">
                Quail eggs are an excellent alternative for those seeking premium protein, offering rich minerals and organic elements that support metabolic functions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-secondary mb-1">High Iron Content</h4>
                    <p className="text-[11px] text-secondary/60 leading-normal">
                      Contains more than double the iron compared to chicken eggs, boosting oxygen levels and reducing fatigue.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-secondary mb-1">Vitamin B12 Power</h4>
                    <p className="text-[11px] text-secondary/60 leading-normal">
                      Over 3x the concentration of Vitamin B12, crucial for neural pathways and daily energy production.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-secondary mb-1">Ovomucoid Proteins</h4>
                    <p className="text-[11px] text-secondary/60 leading-normal">
                      Rich in ovomucoid proteins which act as natural anti-allergens, making them gentle on sensitive stomachs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-secondary mb-1">Perfect Crate Delivery</h4>
                    <p className="text-[11px] text-secondary/60 leading-normal">
                      Delivered in specialized impact-resistant pulp trays of 4, 6, 12, or 30 eggs to keep shells unbroken.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Swiper/Carousel Slideshow inside Left Card */}
            <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-cream group/slide select-none mt-8">
              {slides.map((slide, index) => (
                <div
                  key={slide.src}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.caption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-[10000ms] scale-105 group-hover/slide:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4 sm:p-6">
                    <span className="text-white text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
                      {slide.caption}
                    </span>
                  </div>
                </div>
              ))}

              {/* Prev / Next arrows (Visible on Hover) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 bg-black/45 text-white hover:bg-black/70 hover:scale-105 transition-all opacity-0 group-hover/slide:opacity-100 cursor-pointer hidden sm:flex"
                aria-label="Previous Slide"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlide((prev) => (prev + 1) % slides.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 bg-black/45 text-white hover:bg-black/70 hover:scale-105 transition-all opacity-0 group-hover/slide:opacity-100 cursor-pointer hidden sm:flex"
                aria-label="Next Slide"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSlide(i);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      i === activeSlide ? "w-6 bg-accent" : "w-2 bg-white/50"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Card: Dark Forest Green Background, premium contrasting typography */}
          <div className="lg:col-span-5 bg-dark text-cream rounded-[32px] p-8 sm:p-12 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 ease-out relative overflow-hidden">
            {/* Soft decorative light circular background */}
            <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full organic-circle-light" />

            <div>
              <span className="text-xs font-semibold text-olive uppercase tracking-wider block mb-6">
                Our Services & Practices
              </span>
              
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-6 leading-tight">
                Coop Monitoring & Egg Safety
              </h3>
              
              <p className="text-cream/65 text-sm leading-relaxed mb-8">
                Egg safety starts at the coop. We employ high sanitation standards, organic feeding schedules, and rapid hand inspection to guarantee the absolute best quail eggs on the market.
              </p>

              {/* Steps or services */}
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="text-olive font-extrabold text-sm pt-0.5">01</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Temperature Controlled Laying</h4>
                    <p className="text-xs text-cream/60 leading-relaxed">
                      Quails lay eggs in clean, temperature-regulated nesting boxes, preventing environmental stress and shell fragility.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-olive font-extrabold text-sm pt-0.5">02</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Hormone-Free Feed</h4>
                    <p className="text-xs text-cream/60 leading-relaxed">
                      100% plant-based organic feeding. No artificial coloring or antibiotics ever enter our quails' diets.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-olive font-extrabold text-sm pt-0.5">03</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Safe-Cushion Sorting</h4>
                    <p className="text-xs text-cream/60 leading-relaxed">
                      Each egg is manually examined for micro-cracks before packing into custom-fitted 4, 6, 12, or 30-egg compartments.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-cream/10 flex items-center justify-between">
              <span className="text-xs text-cream/50">Need custom bulk delivery?</span>
              <a
                href="https://wa.me/2349021012556?text=Hello%20Kemkem%20Quail%20Farm!%20I'm%20interested%20in%20custom%20bulk%20orders."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-olive hover:text-white transition-colors"
              >
                Inquire Bulk Orders →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
