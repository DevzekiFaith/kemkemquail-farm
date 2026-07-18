"use client";

import { useEffect } from "react";
import Image from "next/image";
import { CatalogueItem } from "./Catalogue";

export interface CartItem {
  item: CatalogueItem;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}: CartProps) {
  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const subtotal = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.item.price * cartItem.quantity;
  }, 0);

  const totalEggs = cartItems.reduce((acc, cartItem) => {
    const size = cartItem.item.size || 0;
    let eggsInItem = size;
    if (cartItem.item.id === "combo-double-dozen") eggsInItem = 24;
    if (cartItem.item.id === "combo-master-duet") eggsInItem = 60;
    if (cartItem.item.id === "combo-sampler-trio") eggsInItem = 48;
    return acc + eggsInItem * cartItem.quantity;
  }, 0);

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    // Default farm phone number (Change as required by the client)
    const phoneNumber = "2348000000000"; 
    
    let message = "🥚 *KEMKEM QUAIL FARM - EGG ORDER* 🥚\n";
    message += "====================================\n\n";
    message += "*Items in Order:*\n";
    
    cartItems.forEach((cartItem) => {
      const itemTotalUsd = cartItem.item.price * cartItem.quantity;
      const itemTotalNgn = itemTotalUsd * 1600;
      const typeLabel = cartItem.item.type === "crate" ? `${cartItem.item.size} Eggs Crate` : "Combined Crate Pack";
      message += `• *${cartItem.item.name}* (${typeLabel})\n`;
      message += `  Qty: ${cartItem.quantity} x $${cartItem.item.price.toFixed(2)} (₦${(cartItem.item.price * 1600).toLocaleString()}) = *$${itemTotalUsd.toFixed(2)} (₦${itemTotalNgn.toLocaleString()})*\n\n`;
    });

    const subtotalNgn = subtotal * 1600;
    message += "====================================\n";
    message += `*Total Order Value:* $${subtotal.toFixed(2)} (₦${subtotalNgn.toLocaleString()})\n`;
    message += `*Total Fresh Eggs:* ${totalEggs} eggs\n\n`;
    message += "Please let me know the payment details and delivery schedule!\n";

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
    onCheckout();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark overlay backdrop */}
      <div 
        className="absolute inset-0 bg-secondary/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        {/* Cart Slide Panel */}
        <div className="w-screen max-w-md transform bg-white shadow-2xl flex flex-col justify-between h-full border-l border-secondary/5">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-secondary/5 px-6 py-5 bg-cream/20">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-cream font-bold text-xs">
                K
              </span>
              <h2 className="font-serif text-lg font-bold text-secondary">
                Shopping Cart
              </h2>
            </div>
            
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-secondary/60 hover:bg-secondary/5 hover:text-secondary transition-colors cursor-pointer"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="h-16 w-16 rounded-full bg-cream/40 flex items-center justify-center text-secondary/40 mb-4 animate-bounce">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="font-serif text-base font-bold text-secondary mb-1">
                  Your cart is empty
                </h3>
                <p className="text-secondary/50 text-xs max-w-xs mb-6">
                  Add fresh quail egg crates or saver combos from our catalogue to place an order.
                </p>
                <button
                  onClick={onClose}
                  className="bg-primary text-cream text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-primary-light transition-all cursor-pointer shadow-sm"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-2 border-b border-secondary/5">
                  <span className="text-xs text-secondary/50 font-medium">
                    {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"} Selected
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-xs text-accent hover:text-accent/80 font-semibold cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-secondary/5">
                  {cartItems.map((cartItem) => {
                    const itemTotal = cartItem.item.price * cartItem.quantity;
                    return (
                      <div key={cartItem.item.id} className="flex py-4 gap-4 items-center">
                        <div className="relative h-16 w-16 rounded-xl bg-cream flex-shrink-0 overflow-hidden">
                          <Image
                            src={cartItem.item.image}
                            alt={cartItem.item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-sm font-bold text-secondary truncate">
                            {cartItem.item.name}
                          </h4>
                          <p className="text-[10px] text-secondary/50 mb-1">
                            {cartItem.item.type === "crate" ? `${cartItem.item.size} Eggs per Crate` : "Special Combo"}
                          </p>

                          <div className="flex items-center gap-2">
                            {/* Quantity buttons */}
                            <div className="flex items-center border border-secondary/10 rounded-full bg-cream/10">
                              <button
                                onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                                className="px-2 py-0.5 hover:text-primary transition-colors text-secondary/60 cursor-pointer text-xs font-bold"
                              >
                                −
                              </button>
                              <span className="w-5 text-center text-xs font-semibold text-secondary">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                                className="px-2 py-0.5 hover:text-primary transition-colors text-secondary/60 cursor-pointer text-xs font-bold"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(cartItem.item.id)}
                              className="text-[10px] text-accent hover:text-accent/80 font-medium cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="text-right min-w-[90px]">
                          <span className="block text-xs font-bold text-primary">
                            ${itemTotal.toFixed(2)}
                          </span>
                          <span className="block text-[10px] text-primary/75">
                            ₦{(itemTotal * 1600).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                          </span>
                          <span className="block text-[8px] text-secondary/40">
                            ${cartItem.item.price.toFixed(2)} each
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkouts */}
          {cartItems.length > 0 && (
            <div className="border-t border-secondary/5 px-6 py-6 bg-cream/10 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-secondary/60">
                  <span>Fresh Egg Count</span>
                  <span className="font-semibold text-secondary">{totalEggs} eggs</span>
                </div>
                <div className="flex justify-between text-base font-bold text-secondary">
                  <span>Subtotal</span>
                  <div className="text-right">
                    <span className="block text-primary">${subtotal.toFixed(2)}</span>
                    <span className="block text-xs text-primary/80">₦{(subtotal * 1600).toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-secondary/50 text-center leading-relaxed">
                Prices exclude delivery. Order is confirmed with the farm representative over WhatsApp.
              </p>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-[#25D366] text-white py-3.5 rounded-full hover:bg-[#20ba59] transition-all cursor-pointer font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                {/* Custom WhatsApp SVG Icon */}
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.95 9.95 0 0 0 4.887 1.33c5.508 0 9.99-4.478 9.991-9.985a9.97 9.97 0 0 0-2.928-7.057 9.97 9.97 0 0 0-7.08-2.941zM6.88 18.062l-.307-.182a8.21 8.21 0 0 1-1.258-1.026l-.168-.182a8.3 8.3 0 0 1-1.328-4.708 8.32 8.32 0 0 1 8.31-8.31 8.28 8.28 0 0 1 5.88 2.43 8.28 8.28 0 0 1 2.43 5.88 8.32 8.32 0 0 1-8.31 8.31 8.22 8.22 0 0 1-4.053-1.058l-.348-.203-3.13.82.842-3.081zm7.746-4.502c-.266-.134-1.57-.775-1.813-.863-.243-.089-.42-.133-.596.133-.177.266-.685.864-.84 1.04-.155.177-.31.199-.576.066a7.25 7.25 0 0 1-2.138-1.32 7.97 7.97 0 0 1-1.479-1.84c-.155-.266-.016-.41.117-.542.121-.12.266-.31.4-.465.133-.155.177-.266.266-.443.089-.177.044-.332-.022-.465-.067-.133-.597-1.439-.818-1.97-.215-.518-.465-.448-.596-.454-.15-.008-.321-.01-.492-.01a.948.948 0 0 0-.686.321c-.243.266-.929.908-.929 2.215 0 1.307.952 2.568 1.085 2.746.133.177 1.874 2.862 4.542 4.012.635.273 1.13.436 1.516.559.64.203 1.222.174 1.68.106.512-.077 1.57-.642 1.792-1.262.221-.62.221-1.15.155-1.262-.067-.111-.243-.177-.51-.311z"/>
                </svg>
                Checkout on WhatsApp
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
