"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PaymentPoster from "./PaymentPoster";

interface FooterProps {
  onOpenAdmin?: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    const phoneNumber = "2349021012556"; // Default farm contact number
    const waText = encodeURIComponent(`Hello Kemkem Quail Farm! My email is ${email || "not provided"}.\nMessage: ${message}`);
    window.open(`https://wa.me/${phoneNumber}?text=${waText}`, "_blank");
    setMessage("");
  };

  const faqs = [
    {
      q: "How long do fresh quail eggs stay edible?",
      a: "When refrigerated, fresh unwashed quail eggs remain perfectly safe and delicious for up to 5 to 6 weeks due to their thick membrane."
    },
    {
      q: "Can I choose specific crates or only the listed combos?",
      a: "You can purchase any combination of individual crates (sizes of 4, 6, 12, and 30 eggs) or buy our discounted combo bundles."
    },
    {
      q: "How are the eggs packaged to prevent breakage?",
      a: "We use impact-absorbing cardboard pulp trays that lock securely. Our outer shipping cartons are double-walled and lined with shock-cushioning straw."
    }
  ];

  return (
    <footer id="contact" className="bg-secondary text-cream py-32 relative overflow-hidden">
      {/* Decorative dark circle */}
      <div className="absolute bottom-[-10%] left-[-10%] h-96 w-96 rounded-full bg-primary/10 pointer-events-none" />

      {/* Quail Bird background watermark overlay in Footer */}
      <div className="absolute right-0 bottom-0 h-[280px] w-[280px] sm:h-[380px] sm:w-[380px] opacity-[0.03] pointer-events-none z-0">
        <Image
          src="/quail.png"
          alt="Watermarked Quail bird footer"
          fill
          sizes="(max-width: 640px) 280px, 380px"
          className="object-contain object-right-bottom mix-blend-overlay select-none"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
        
        {/* FAQs Accordion/List Section */}
        <div className="border-b border-cream/10 pb-16 mb-16">
          <span className="text-xs font-semibold text-olive uppercase tracking-wider block mb-2">
            Got Questions?
          </span>
          <h3 className="font-serif text-3xl font-bold mb-10 text-white">
            Frequently Asked Questions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <h4 className="text-sm font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-xs text-cream/60 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact and Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Farm Details */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-11 w-11 rounded-full overflow-hidden border border-white/20 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo-new.jpg"
                  alt="Kemkem Quail Farm Logo"
                  fill
                  sizes="44px"
                  className="object-cover object-center"
                />
              </div>
              <span className="font-sans text-xl font-bold tracking-tight text-white">
                KEMKEM <span className="text-olive font-semibold text-base">QUAIL FARM</span>
              </span>
            </Link>
            
            <p className="text-xs text-cream/70 leading-relaxed max-w-sm">
              We raise healthy, pasture-fed quails to produce delicious, nutrient-dense eggs. Hand-sorted and delivered fresh daily directly from our clean coops.
            </p>

            {/* Official Trust Certifications */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="text-[9px] bg-white/5 border border-white/10 px-2.5 py-1 rounded font-mono font-bold tracking-wider text-cream/60">
                CAC Reg No: 9071156
              </span>
              <span className="text-[9px] bg-white/5 border border-white/10 px-2.5 py-1 rounded font-mono font-bold tracking-wider text-cream/60">
                NAFDAC Reg No: A8-123266L
              </span>
            </div>

            <div className="space-y-3 pt-4 text-xs text-cream/80">
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Plot 64 Owerre Ezukala Street, Independence Layout, Enugu State.</span>
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+234 902 101 2556 (WhatsApp Line)</span>
              </div>

              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>kemkemquailfarm@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="font-bold text-white">www.kemkemquailfarm.com.ng</span>
              </div>

              {/* Official Social Media Handles */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.instagram.com/kemkemfarm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/15 border border-white/10 px-3 py-1.5 rounded-full text-xs text-cream/90 hover:text-white transition-all group"
                  title="Follow Kemkem Farm on Instagram"
                >
                  <svg className="h-4 w-4 fill-current text-[#E4405F]" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>kemkem Farm</span>
                </a>

                <a
                  href="https://www.tiktok.com/@kemkemquaileggs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/15 border border-white/10 px-3 py-1.5 rounded-full text-xs text-cream/90 hover:text-white transition-all group"
                  title="Follow Kemkem Quail Eggs on TikTok"
                >
                  <svg className="h-4 w-4 fill-current text-[#25F4EE]" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.34V9.48a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.86-.91z"/>
                  </svg>
                  <span>@kemkemquaileggs</span>
                </a>
              </div>
            </div>

            {/* Scan & Pay Framed Board Poster */}
            <PaymentPoster className="mt-8 hover:scale-[1.02] transition-transform duration-300 mx-auto lg:mx-0" />
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white/5 border border-white/5 rounded-3xl p-8 w-full min-h-[340px] flex flex-col justify-center">
            {!isMounted ? (
              <div className="text-center py-10">
                <span className="text-xs text-cream/40 animate-pulse">Loading secure form...</span>
              </div>
            ) : (
              <>
                <h4 className="text-sm font-bold text-white mb-2">Send an Order Inquiry</h4>
                <p className="text-[11px] text-cream/60 mb-6">
                  Fill out this quick form, and it will generate a direct WhatsApp message to our representative.
                </p>

                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-cream/50 font-bold uppercase mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary-light transition-colors"
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-cream/50 font-bold uppercase mb-1.5">Preferred Contact</label>
                      <span className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-cream/40 block">
                        WhatsApp Redirect
                      </span>
                    </div>
                  </div>

                  <div suppressHydrationWarning>
                    <label className="block text-[10px] text-cream/50 font-bold uppercase mb-1.5">Your Message or Custom Request</label>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="I'd like to ask about weekly delivery schedules or request a custom packing size..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary-light transition-colors resize-none"
                      suppressHydrationWarning
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-primary text-cream text-xs font-semibold py-2.5 px-8 rounded-full hover:bg-primary-light transition-all cursor-pointer shadow-sm hover:shadow"
                  >
                    Send via WhatsApp
                  </button>
                </form>
              </>
            )}
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="border-t border-cream/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-cream/40">
          <span>&copy; {new Date().getFullYear()} Kemkem Quail Farm. All rights reserved.</span>
          <div className="flex gap-6 mt-4 sm:mt-0 items-center">
            <Link href="/ceo" className="text-olive hover:text-white font-bold transition-colors cursor-pointer">
              Meet Our CEO
            </Link>
            <span className="hover:text-cream cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-cream cursor-pointer transition-colors">Terms of Purchase</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-olive hover:text-white font-semibold transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>🔒</span> Admin Desk
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
