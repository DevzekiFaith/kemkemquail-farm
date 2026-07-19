"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ALL_PRODUCTS, CatalogueItem } from "../../data/products";

interface CartItem {
  item: CatalogueItem;
  quantity: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [product, setProduct] = useState<CatalogueItem | null>(null);
  const [qty, setQty] = useState(1);
  const [currency, setCurrency] = useState<"both" | "usd" | "ngn">("both");

  // Load the product details on mount
  useEffect(() => {
    const found = ALL_PRODUCTS.find((p) => p.id === id);
    if (found) {
      setProduct(found);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-cream/20 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl font-bold text-secondary mb-2">Product Not Found</h2>
        <p className="text-secondary/60 text-xs mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link href="/" className="bg-primary text-cream text-xs font-bold py-3 px-8 rounded-full hover:bg-primary-light transition-all shadow-md">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleQtyChange = (delta: number) => {
    setQty((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    // Read current cart
    const savedCart = localStorage.getItem("kemkem_cart");
    let currentCart: CartItem[] = [];
    if (savedCart) {
      try {
        currentCart = JSON.parse(savedCart);
      } catch (e) {
        console.error(e);
      }
    }

    // Check if item already exists
    const existingIndex = currentCart.findIndex((ci) => ci.item.id === product.id);
    if (existingIndex > -1) {
      currentCart[existingIndex].quantity += qty;
    } else {
      currentCart.push({ item: product, quantity: qty });
    }

    // Save back to localStorage
    localStorage.setItem("kemkem_cart", JSON.stringify(currentCart));

    // Redirect to home page and trigger opening the cart
    router.push("/?openCart=true");
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
    <div className="min-h-screen bg-cream/20 flex flex-col justify-between text-secondary">
      
      {/* Header Bar */}
      <header className="bg-white border-b border-secondary/5 py-5 px-6 sm:px-8 shadow-sm">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-cream font-bold text-base">
              K
            </span>
            <span className="font-sans text-lg font-bold tracking-tight text-secondary">
              KEMKEM <span className="text-olive font-semibold text-sm">QUAIL FARM</span>
            </span>
          </Link>

          <Link
            href="/"
            className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1.5 transition-colors bg-cream/35 px-4 py-2 rounded-full border border-secondary/5"
          >
            ← Back to Shop
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full py-16 px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Image Card */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-[32px] overflow-hidden bg-white border border-secondary/5 p-6 shadow-md flex items-center justify-center group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 p-8"
                priority
              />
              {product.size && (
                <span className="absolute top-6 right-6 bg-primary text-cream text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                  {product.size} Eggs Crate
                </span>
              )}
            </div>
            
            <div className="text-[10px] text-center text-secondary/40 italic">
              *All crates are hand-packed with organic shock-absorbent cushioning.
            </div>
          </div>

          {/* Right Column: Narrative Info */}
          <div className="md:col-span-6 space-y-6">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-accent uppercase bg-accent/10 px-3 py-1 rounded-full">
                {product.type === "crate" ? "Store Crate Selection" : "Gourmet Combo Deal"}
              </span>
              
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight mt-4 leading-tight">
                {product.name} {product.size && <span className="font-sans font-extrabold text-accent ml-1">({product.size} Eggs)</span>}
              </h1>
              
              <div className="flex items-baseline gap-4 mt-3">
                <span className="text-2xl font-black text-primary">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-1.5 bg-secondary/5 rounded-full p-1 border border-secondary/5 text-[9px] font-bold text-secondary/70 shadow-inner w-fit">
              <button
                onClick={() => setCurrency("both")}
                className={`rounded-full px-3 py-1 transition-all cursor-pointer ${
                  currency === "both" ? "bg-white text-secondary shadow-sm" : ""
                }`}
              >
                USD & NGN
              </button>
              <button
                onClick={() => setCurrency("usd")}
                className={`rounded-full px-3 py-1 transition-all cursor-pointer ${
                  currency === "usd" ? "bg-white text-secondary shadow-sm" : ""
                }`}
              >
                USD Only
              </button>
              <button
                onClick={() => setCurrency("ngn")}
                className={`rounded-full px-3 py-1 transition-all cursor-pointer ${
                  currency === "ngn" ? "bg-white text-secondary shadow-sm" : ""
                }`}
              >
                NGN Only
              </button>
            </div>

            <p className="text-secondary/70 text-sm leading-relaxed border-t border-secondary/5 pt-4">
              {product.extendedDescription || product.description}
            </p>

            {/* Product bullet details */}
            <div className="space-y-3 bg-white p-6 rounded-2xl border border-secondary/5 shadow-sm">
              <h4 className="font-serif text-xs font-bold text-secondary uppercase tracking-wider mb-2">What is included:</h4>
              <div className="grid grid-cols-1 gap-2.5">
                {product.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-secondary/80">
                    <span className="h-4 w-4 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-[9px] mt-0.5 flex-shrink-0">✓</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Quantity and Add button wrapper */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-secondary/5">
              {/* Quantity Select Control */}
              <div className="flex items-center justify-between border border-secondary/15 rounded-full px-4 py-2 bg-white w-full sm:w-36">
                <button
                  onClick={() => handleQtyChange(-1)}
                  className="h-8 w-8 text-secondary/60 hover:text-secondary font-bold text-lg cursor-pointer transition-colors"
                >
                  −
                </button>
                <span className="font-sans font-bold text-sm">{qty}</span>
                <button
                  onClick={() => handleQtyChange(1)}
                  className="h-8 w-8 text-secondary/60 hover:text-secondary font-bold text-lg cursor-pointer transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Trigger */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-cream text-xs font-bold py-3.5 px-8 rounded-full hover:bg-primary-light transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                Add {qty} to Cart — {formatPrice(product.price * qty)}
              </button>
            </div>

          </div>

        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-white border-t border-secondary/5 py-8 text-center text-secondary/50 text-[10px]">
        <div className="mx-auto max-w-7xl px-6">
          <p>© {new Date().getFullYear()} Kemkem Quail Farm. CAC Reg: 9071156 | NAFDAC Reg: A8-123266L. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
