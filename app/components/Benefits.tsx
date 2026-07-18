"use client";

import Image from "next/image";

export default function Benefits() {
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

            {/* Farm coop image inside Left Card */}
            <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-cream">
              <Image
                src="/farm.png"
                alt="Modern Quail Coop and Farm"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                <span className="text-white text-xs font-semibold">
                  Inside Our Sanitized Eco-Coop Setup
                </span>
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
                href="https://wa.me/2348000000000?text=Hello%20Kemkem%20Quail%20Farm!%20I'm%20interested%20in%20custom%20bulk%20orders."
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
