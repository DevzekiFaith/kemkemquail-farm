"use client";

import Image from "next/image";

interface HeroProps {
  onExploreClick: () => void;
  onPlayVideoClick: () => void;
}

export default function Hero({ onExploreClick, onPlayVideoClick }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-background py-12 lg:py-20 flex items-center min-h-[85vh]">
      {/* Organic radial background glow from globals.css */}
      <div className="organic-bg" />

      {/* Quail Bird background watermarked overlay */}
      <div 
        onClick={onPlayVideoClick}
        title="Watch Farm Video"
        className="absolute bottom-0 left-0 lg:left-[5%] h-[320px] w-[320px] sm:h-[450px] sm:w-[450px] opacity-[0.06] hover:opacity-[0.14] pointer-events-auto cursor-pointer transition-opacity z-0 group"
      >
        <Image
          src="/quail.png"
          alt="Watermarked Quail bird"
          fill
          sizes="(max-width: 640px) 320px, 450px"
          className="object-contain object-left-bottom mix-blend-multiply select-none"
        />
        {/* Subtle floating hint above quail on hover */}
        <div className="absolute top-10 left-10 opacity-0 group-hover:opacity-100 transition-opacity bg-secondary/80 text-cream text-[9px] font-bold px-2.5 py-1 rounded-full pointer-events-none uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
          Watch Video
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 w-full z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Massive Typography */}
          <div className="flex flex-col justify-center lg:col-span-4 z-20">
            <span className="text-sm font-semibold tracking-widest text-primary uppercase mb-3">
              Established 2025
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-secondary leading-[1.1] mb-6">
              Nourishing <br />
              <span className="text-primary italic font-normal">Tomorrow's</span> <br />
              Health Today
            </h1>
            <p className="text-secondary/60 text-sm max-w-sm mb-8 sm:hidden block">
              Where agriculture meets premium nutrition. Our farm is dedicated to supplying standard, high-grade organic quail eggs in custom crate counts.
            </p>
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:gap-4 transition-all duration-300 group cursor-pointer w-fit"
            >
              Order Farm-Fresh Eggs
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Center Column: Beautiful Circular Frame (Agrono Reference Style) */}
          <div className="relative flex items-center justify-center lg:col-span-5 h-[320px] sm:h-[480px]">
            {/* Dark green backdrop circle */}
            <div className="absolute h-[250px] w-[250px] xs:h-[300px] xs:w-[300px] sm:h-[400px] sm:w-[400px] rounded-full organic-circle-primary shadow-2xl animate-pulse duration-[8000ms]" />
            
            {/* Secondary offset olive outline circle */}
            <div className="absolute h-[270px] w-[270px] xs:h-[320px] xs:w-[320px] sm:h-[430px] sm:w-[430px] rounded-full border border-primary-light/30 animate-spin-slow" />
            
            {/* Center image cutout */}
            <div 
              onClick={onPlayVideoClick}
              title="Watch Farm Video"
              className="absolute h-[210px] w-[210px] xs:h-[260px] xs:w-[260px] sm:h-[350px] sm:w-[350px] rounded-full overflow-hidden border-4 sm:border-8 border-background shadow-inner z-10 transition-transform duration-500 hover:scale-105 cursor-pointer group"
            >
              <Image
                src="/hero.png"
                alt="Fresh Organic Quail Eggs"
                fill
                priority
                sizes="(max-width: 640px) 210px, 350px"
                className="object-cover object-center group-hover:scale-110 group-hover:brightness-90 transition-all duration-700"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/35 transition-colors duration-300">
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-white/95 text-primary flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 fill-current ml-1" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Tiny accent gold bubble */}
            <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-4 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-accent flex items-center justify-center text-white font-bold text-[10px] sm:text-xs shadow-lg animate-float">
              100% Organic
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="flex flex-col justify-center lg:col-span-3 z-20">
            <div className="border-l-2 border-primary/20 pl-6 sm:block hidden">
              <p className="text-secondary/70 text-base leading-relaxed mb-6">
                Where agriculture meets premium nutrition. Our platform is dedicated to supplying standard, high-grade organic quail eggs in flexible crates. Enjoy maximum freshness directly from our coop to your kitchen table.
              </p>
              <button 
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors cursor-pointer"
              >
                Explore Crate Options <span className="text-xs">→</span>
              </button>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-secondary/10">
              <div>
                <span className="block text-3xl font-extrabold text-primary">4+</span>
                <span className="text-xs text-secondary/60">Crate Sizes Available</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-primary">24h</span>
                <span className="text-xs text-secondary/60">Freshness Delivery Guarantee</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
