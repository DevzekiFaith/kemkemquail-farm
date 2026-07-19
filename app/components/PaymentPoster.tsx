"use client";

import Image from "next/image";

interface PaymentPosterProps {
  className?: string;
}

export default function PaymentPoster({ className = "" }: PaymentPosterProps) {
  return (
    <div className={`bg-white border-8 border-secondary rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-secondary flex flex-col justify-between font-serif relative overflow-hidden select-none ${className}`}>
      
      {/* Decorative leaf branch or line headers */}
      <div className="text-center pt-2 pb-1.5">
        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-secondary/60">
          KEMKEM QUAIL FARM
        </span>
        <div className="flex justify-center items-center gap-1.5 my-2">
          <span className="h-[1px] w-12 bg-secondary/20" />
          {/* Simple leaf branch emoji representation */}
          <span className="text-xs text-primary">🌿</span>
          <span className="h-[1px] w-12 bg-secondary/20" />
        </div>
      </div>

      {/* Main Title Headers */}
      <div className="text-center border-t border-b border-secondary/20 py-4 my-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase leading-tight text-secondary">
          FRESH QUAIL EGGS
        </h3>
        <h4 className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-primary mt-1">
          SOLD HERE
        </h4>
      </div>

      <div className="text-center my-3">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider block text-secondary/80">
          FRESH HARVEST DAILY
        </span>
        <span className="text-[8px] sm:text-[9px] italic text-secondary/40 block">
          *WHILE SUPPLIES LAST*
        </span>
      </div>

      {/* Price Grid (Double Column matching the image layout) */}
      <div className="my-4 font-sans text-xs sm:text-sm px-2">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 pb-4 border-b border-dashed border-secondary/15">
          <div className="flex justify-between items-baseline border-b border-dotted border-secondary/20 pb-1">
            <span className="font-semibold">Petite (4)</span>
            <span className="font-bold text-primary">$2.50</span>
          </div>
          <div className="flex justify-between items-baseline border-b border-dotted border-secondary/20 pb-1">
            <span className="font-semibold">Naira Rate</span>
            <span className="font-bold text-primary/70">₦4,000</span>
          </div>

          <div className="flex justify-between items-baseline border-b border-dotted border-secondary/20 pb-1">
            <span className="font-semibold">Half-Dozen (6)</span>
            <span className="font-bold text-primary">$3.50</span>
          </div>
          <div className="flex justify-between items-baseline border-b border-dotted border-secondary/20 pb-1">
            <span className="font-semibold">Naira Rate</span>
            <span className="font-bold text-primary/70">₦5,600</span>
          </div>

          <div className="flex justify-between items-baseline border-b border-dotted border-secondary/20 pb-1">
            <span className="font-semibold">Dozen (12)</span>
            <span className="font-bold text-primary">$6.00</span>
          </div>
          <div className="flex justify-between items-baseline border-b border-dotted border-secondary/20 pb-1">
            <span className="font-semibold">Naira Rate</span>
            <span className="font-bold text-primary/70">₦9,600</span>
          </div>

          <div className="flex justify-between items-baseline border-b border-dotted border-secondary/20 pb-1">
            <span className="font-semibold">Master (30)</span>
            <span className="font-bold text-primary">$14.50</span>
          </div>
          <div className="flex justify-between items-baseline border-b border-dotted border-secondary/20 pb-1">
            <span className="font-semibold">Naira Rate</span>
            <span className="font-bold text-primary/70">₦23,200</span>
          </div>
        </div>

        <div className="flex justify-between items-baseline font-serif text-[10px] sm:text-xs text-secondary/50 pt-2 text-center w-full justify-center">
          <span>*Discount combos are available inside our Catalogue catalog.*</span>
        </div>
      </div>

      {/* QR Code and Instructions Block (Grey background footer matching the image) */}
      <div className="bg-cream/40 border border-secondary/10 rounded-2xl p-4 flex gap-4 items-center mt-2">
        <div className="relative h-20 w-20 bg-white border border-secondary/15 rounded-xl overflow-hidden flex-shrink-0 shadow-sm transition-transform hover:scale-105 duration-300">
          <Image
            src="/qr-code.png"
            alt="Scan to Pay QR Code"
            fill
            sizes="80px"
            className="object-contain"
          />
        </div>
        
        <div className="flex-1 space-y-1.5 font-serif text-[10px] text-secondary/80">
          <div className="font-bold uppercase tracking-wider text-secondary leading-tight text-center sm:text-left">
            FCMB BANK TRANSFER
          </div>
          <div className="font-sans text-[11px] leading-tight space-y-0.5">
            <p className="font-bold text-primary">KEMKEM QUAIL FARMS ENTERPRISE</p>
            <p className="font-mono text-secondary">A/C: <span className="font-bold select-all">2007744689</span></p>
          </div>
          <div className="text-[9px] leading-relaxed text-secondary/60 italic pt-1 border-t border-secondary/5">
            Please scan the QR code or use the account number to submit your payment. Thank you!
          </div>
        </div>
      </div>
      
    </div>
  );
}
