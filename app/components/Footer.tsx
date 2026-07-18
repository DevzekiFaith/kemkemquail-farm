"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    const phoneNumber = "2348000000000"; // Default farm contact number
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
            <div className="flex items-center gap-2">
              <span className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-cream font-bold text-lg">
                K
              </span>
              <span className="font-sans text-xl font-bold tracking-tight text-white">
                KEMKEM <span className="text-olive font-semibold text-base">QUAIL FARM</span>
              </span>
            </div>
            
            <p className="text-xs text-cream/70 leading-relaxed max-w-sm">
              We raise healthy, pasture-fed quails to produce delicious, nutrient-dense eggs. Hand-sorted and delivered fresh daily directly from our clean coops.
            </p>

            <div className="space-y-3 pt-4 text-xs text-cream/80">
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Green Valley Agriculture Estate, Block B-12</span>
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+234 (800) 000-0000 (WhatsApp Line)</span>
              </div>

              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>kemkemquail@gmail.com</span>
              </div>
            </div>
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
          <div className="flex gap-6 mt-4 sm:mt-0">
            <span className="hover:text-cream cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-cream cursor-pointer transition-colors">Terms of Purchase</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
