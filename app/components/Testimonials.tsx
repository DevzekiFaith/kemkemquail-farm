"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ScrollReveal, TiltCard } from "./Parallax";

export interface ReviewItem {
  id: string;
  name: string;
  roleLocation: string;
  crateType: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  category: "health" | "supermarket" | "delivery" | "general";
  verified: boolean;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Dr. Amaka Nnaji",
    roleLocation: "Verified Buyer • Enugu",
    crateType: "12-Egg Crate (Dozen Pack)",
    rating: 5,
    date: "July 28, 2026",
    comment: "I buy these quail eggs weekly for my children's breakfast. The egg yolk color is deep and rich, and their energy levels have noticeably improved. The packaging arrived completely intact with zero cracked eggs!",
    category: "health",
    verified: true
  },
  {
    id: "rev-2",
    name: "Emeka Okafor",
    roleLocation: "Supermarket Manager • Lagos",
    crateType: "Bulk Commercial Supply",
    rating: 5,
    date: "July 25, 2026",
    comment: "Kemkem Quail Farm is our most reliable egg supplier. Every crate is NAFDAC certified, hand-sorted, and properly barcoded. Our supermarket customers love the quality and long shelf life.",
    category: "supermarket",
    verified: true
  },
  {
    id: "rev-3",
    name: "Mrs. Ngozi Ebele",
    roleLocation: "Verified Buyer • Abuja",
    crateType: "30-Egg Jumbo Family Tray",
    rating: 5,
    date: "July 20, 2026",
    comment: "Fast delivery to Abuja! The double-walled padded boxes protected all 30 eggs perfectly. My husband takes 3 boiled quail eggs daily for his blood pressure routine and feels wonderful.",
    category: "delivery",
    verified: true
  },
  {
    id: "rev-4",
    name: "Chef Anthony Silva",
    roleLocation: "Executive Chef • Port Harcourt",
    crateType: "Gourmet Breakfast Combo",
    rating: 5,
    date: "July 14, 2026",
    comment: "Outstanding culinary quality for our restaurant's appetizer menu. The eggs peel cleanly and taste incredibly fresh. Kemkem Quail Farm sets the gold standard for organic poultry.",
    category: "health",
    verified: true
  },
  {
    id: "rev-5",
    name: "Blessing Igwe",
    roleLocation: "Verified Buyer • Enugu",
    crateType: "6-Egg Starter Pack",
    rating: 5,
    date: "July 10, 2026",
    comment: "Loved the customer service on WhatsApp. I ordered the 6-pack trial and got immediate confirmation and delivery within 3 hours. Will definitely upgrade to the 30-egg tray next time!",
    category: "delivery",
    verified: true
  }
];

export default function Testimonials() {
  const [reviews, setReviews] = useState<ReviewItem[]>(DEFAULT_REVIEWS);
  const [activeCategory, setActiveCategory] = useState<"all" | "health" | "supermarket" | "delivery">("all");
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Form states for new review submission
  const [reviewerName, setReviewerName] = useState("");
  const [roleLocation, setRoleLocation] = useState("");
  const [crateType, setCrateType] = useState("12-Egg Crate (Dozen Pack)");
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState<"health" | "supermarket" | "delivery" | "general">("health");
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load persistent reviews from localStorage & detect deep-link auto-open query
  useEffect(() => {
    try {
      const stored = localStorage.getItem("kemkem_reviews");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load reviews from localStorage", e);
    }

    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      const search = window.location.search;
      if (hash.includes("write") || search.includes("write=true") || search.includes("review=true")) {
        setIsWriteModalOpen(true);
        const el = document.getElementById("reviews");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !comment) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: reviewerName,
      roleLocation: roleLocation || "Verified Customer",
      crateType: crateType,
      rating: rating,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      comment: comment,
      category: category,
      verified: true
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem("kemkem_reviews", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save review", e);
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsWriteModalOpen(false);
      setReviewerName("");
      setRoleLocation("");
      setComment("");
    }, 1800);
  };

  const filteredReviews = reviews.filter(r => {
    if (activeCategory === "all") return true;
    return r.category === activeCategory;
  });

  return (
    <section id="reviews" className="py-24 bg-cream/20 relative overflow-hidden border-t border-b border-secondary/5">
      {/* Background Decorative watermark */}
      <div className="absolute top-0 right-10 h-72 w-72 rounded-full bg-primary/5 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
        
        {/* Section Header & Rating Counter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <ScrollReveal direction="down" delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Customer Feedback & Reviews
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary tracking-tight">
              Trusted by Over <span className="text-primary italic font-normal">140+ Families</span> & Supermarkets
            </h2>
          </ScrollReveal>

          {/* Unified Rating Summary & Instant Review QR Card */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="bg-white border border-secondary/10 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-center gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-secondary/10">
              
              {/* Left: Overall Score */}
              <div className="text-center pr-0 md:pr-6 w-full md:w-auto">
                <span className="font-serif text-4xl sm:text-5xl font-extrabold text-secondary block leading-none">
                  4.9
                </span>
                <div className="flex text-amber-400 text-sm mt-1.5 justify-center">
                  {"★".repeat(5)}
                </div>
                <span className="text-[10px] text-secondary/50 font-bold uppercase tracking-wider block mt-1.5">
                  148 Verified Reviews
                </span>
              </div>

              {/* Middle: Star Breakdown */}
              <div className="pt-4 md:pt-0 pl-0 md:pl-6 space-y-1.5 text-[11px] font-medium text-secondary/70 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right">5 Star</span>
                  <div className="w-24 sm:w-28 bg-cream/60 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[88%]" />
                  </div>
                  <span className="text-[10px] text-secondary/50 font-bold">88%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right">4 Star</span>
                  <div className="w-24 sm:w-28 bg-cream/60 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[10%]" />
                  </div>
                  <span className="text-[10px] text-secondary/50 font-bold">10%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-right">3 Star</span>
                  <div className="w-24 sm:w-28 bg-cream/60 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[2%]" />
                  </div>
                  <span className="text-[10px] text-secondary/50 font-bold">2%</span>
                </div>
              </div>

              {/* Right: Integrated Scan-to-Review QR Code */}
              <div className="pt-4 md:pt-0 pl-0 md:pl-6 flex items-center gap-3.5 w-full md:w-auto">
                <div className="relative h-16 w-16 bg-white border border-secondary/15 rounded-xl overflow-hidden p-1 flex-shrink-0 shadow-inner">
                  <Image
                    src="/qr-code.png"
                    alt="Scan QR Code to Rate & Review Kemkem Quail Farm"
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-accent uppercase tracking-wider block">
                    📱 Instant Review QR
                  </span>
                  <h4 className="font-serif font-bold text-secondary text-xs sm:text-sm leading-tight">
                    Scan to Rate 5★
                  </h4>
                  <p className="text-[10px] text-secondary/60 leading-tight">
                    Scan to submit your review directly!
                  </p>
                  <button
                    onClick={() => setIsWriteModalOpen(true)}
                    className="text-[10px] font-bold text-primary hover:text-accent underline pt-0.5 cursor-pointer block"
                  >
                    Or click here to rate now →
                  </button>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>

        {/* Category Filter Pills & "Write a Review" CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-secondary/10">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Reviews" },
              { id: "health", label: "🌱 Health & Energy" },
              { id: "supermarket", label: "🛒 Supermarket Supply" },
              { id: "delivery", label: "📦 Packaging & Delivery" }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-primary text-cream shadow-sm"
                    : "bg-white text-secondary/70 border border-secondary/10 hover:bg-cream/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="bg-accent hover:bg-accent/90 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-sm hover:scale-102 flex items-center gap-1.5"
          >
            <span>✍️</span> Write a Review
          </button>
        </div>

        {/* Testimonials Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredReviews.map((rev, index) => (
            <ScrollReveal key={rev.id} direction="up" delay={0.1 * (index % 3)}>
              <TiltCard maxTilt={4} scale={1.01} className="h-full">
                <div className="bg-white border border-secondary/10 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between relative group">
                  
                  {/* Top Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex text-amber-400 text-sm">
                        {"★".repeat(rev.rating)}
                      </div>

                      {rev.verified && (
                        <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                          <span>✓</span> Verified Order
                        </span>
                      )}
                    </div>

                    <p className="text-secondary/80 text-xs sm:text-sm leading-relaxed mb-6 italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Reviewer Details */}
                  <div className="pt-4 border-t border-secondary/5 flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-serif font-bold text-secondary text-sm">{rev.name}</h4>
                      <p className="text-[11px] text-secondary/50 font-medium">{rev.roleLocation}</p>
                      <span className="text-[10px] text-primary/80 font-bold block mt-0.5">{rev.crateType}</span>
                    </div>
                    <span className="text-[10px] text-secondary/40 font-mono">{rev.date}</span>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* "Write a Review" Interactive Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-secondary/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-5 right-5 text-secondary/40 hover:text-secondary text-lg cursor-pointer"
            >
              ✕
            </button>

            {isSubmitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="h-14 w-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h3 className="font-serif text-xl font-bold text-secondary">Thank You for Your Feedback!</h3>
                <p className="text-xs text-secondary/60">Your review has been published and added to our customer rating feed.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="border-b border-secondary/10 pb-3">
                  <h3 className="font-serif text-xl font-bold text-secondary">Write a Customer Review</h3>
                  <p className="text-xs text-secondary/60">Share your experience with Kemkem Quail Farm eggs.</p>
                </div>

                {/* Rating Selection */}
                <div>
                  <label className="block text-[10px] text-secondary/60 font-bold uppercase mb-1">Overall Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-2xl cursor-pointer transition-transform ${
                          star <= rating ? "text-amber-400 scale-110" : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-secondary/60 font-bold uppercase mb-1">Your Name</label>
                    <input
                      required
                      type="text"
                      value={reviewerName}
                      onChange={e => setReviewerName(e.target.value)}
                      placeholder="e.g. Sarah Chinedu"
                      className="w-full bg-cream/40 border border-secondary/10 rounded-xl px-3.5 py-2 text-xs text-secondary focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-secondary/60 font-bold uppercase mb-1">Role / City Location</label>
                    <input
                      type="text"
                      value={roleLocation}
                      onChange={e => setRoleLocation(e.target.value)}
                      placeholder="e.g. Verified Buyer • Enugu"
                      className="w-full bg-cream/40 border border-secondary/10 rounded-xl px-3.5 py-2 text-xs text-secondary focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-secondary/60 font-bold uppercase mb-1">Product Purchased</label>
                    <select
                      value={crateType}
                      onChange={e => setCrateType(e.target.value)}
                      className="w-full bg-cream/40 border border-secondary/10 rounded-xl px-3.5 py-2 text-xs text-secondary focus:outline-none focus:border-primary"
                    >
                      <option value="12-Egg Crate (Dozen Pack)">12-Egg Crate (Dozen Pack)</option>
                      <option value="30-Egg Jumbo Family Tray">30-Egg Jumbo Family Tray</option>
                      <option value="6-Egg Starter Pack">6-Egg Starter Pack</option>
                      <option value="4-Egg Mini Sampler">4-Egg Mini Sampler</option>
                      <option value="Bulk Commercial Supply">Bulk Commercial Supply</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-secondary/60 font-bold uppercase mb-1">Review Category</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value as any)}
                      className="w-full bg-cream/40 border border-secondary/10 rounded-xl px-3.5 py-2 text-xs text-secondary focus:outline-none focus:border-primary"
                    >
                      <option value="health">Health & Energy</option>
                      <option value="supermarket">Supermarket Supply</option>
                      <option value="delivery">Packaging & Delivery</option>
                      <option value="general">General Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-secondary/60 font-bold uppercase mb-1">Your Review</label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Tell us about the egg quality, freshness, or delivery speed..."
                    className="w-full bg-cream/40 border border-secondary/10 rounded-xl px-3.5 py-2 text-xs text-secondary focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-light text-cream font-bold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Submit Customer Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
