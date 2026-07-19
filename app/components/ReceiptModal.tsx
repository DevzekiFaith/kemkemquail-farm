"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CartItem } from "./Cart";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkoutItems: CartItem[];
  subtotal: number;
  totalEggs: number;
}

export default function ReceiptModal({
  isOpen,
  onClose,
  checkoutItems,
  subtotal,
  totalEggs,
}: ReceiptModalProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const receiptId = useRef("");

  useEffect(() => {
    if (isOpen && !receiptId.current) {
      // Generate a random unique receipt ID
      const num = Math.floor(1000 + Math.random() * 9000);
      receiptId.current = `KK-${new Date().getFullYear()}-${num}`;
    }
  }, [isOpen]);

  const handlePrint = () => {
    // Standard window.print() handles print media query styles
    window.print();
  };

  const handleDownloadTxt = () => {
    // Generate ASCII Text Receipt
    const dateStr = new Date().toLocaleString();
    let text = "==========================================\n";
    text += "           KEMKEM QUAIL FARM              \n";
    text += "           OFFICIAL PURCHASE RECEIPT      \n";
    text += "==========================================\n";
    text += `Receipt ID : ${receiptId.current}\n`;
    text += `Date       : ${dateStr}\n`;
    text += "==========================================\n\n";
    text += "Items Ordered:\n";

    checkoutItems.forEach((ci) => {
      const itemTotalUsd = ci.item.price * ci.quantity;
      const itemTotalNgn = itemTotalUsd * 1600;
      const typeLabel = ci.item.type === "crate" ? `${ci.item.size}-Egg Crate` : "Combo Pack";
      text += `• ${ci.item.name} (${typeLabel})\n`;
      text += `  Qty: ${ci.quantity} x $${ci.item.price.toFixed(2)} (₦${(ci.item.price * 1600).toLocaleString()})\n`;
      text += `  Total: $${itemTotalUsd.toFixed(2)} (₦${itemTotalNgn.toLocaleString()})\n\n`;
    });

    const subtotalNgn = subtotal * 1600;
    text += "------------------------------------------\n";
    text += `Total Eggs Ordered : ${totalEggs} fresh quail eggs\n`;
    text += `Subtotal (USD)     : $${subtotal.toFixed(2)}\n`;
    text += `Subtotal (NGN)     : ₦${subtotalNgn.toLocaleString()}\n`;
    text += "==========================================\n";
    text += "Thank you for supporting our organic farm!\n";
    text += "Inquiries: kemkemquailfarm@gmail.com\n";
    text += "==========================================\n";

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt_${receiptId.current}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCsv = () => {
    // Generate CSV for Seller Record keeping
    const dateStr = new Date().toISOString();
    let csv = "ReceiptID,Timestamp,ItemName,ItemType,Quantity,UnitPriceUSD,UnitPriceNGN,ItemTotalUSD,ItemTotalNGN\n";

    checkoutItems.forEach((ci) => {
      const itemTotalUsd = ci.item.price * ci.quantity;
      csv += `"${receiptId.current}","${dateStr}","${ci.item.name}","${ci.item.type}",${ci.quantity},${ci.item.price},${ci.item.price * 1600},${itemTotalUsd},${itemTotalUsd * 1600}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice_record_${receiptId.current}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  const subtotalNgn = subtotal * 1600;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Print media specific custom stylesheet inside modal to hide other parts of DOM */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-receipt-area, #print-receipt-area * {
            visibility: visible;
          }
          #print-receipt-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none;
            box-shadow: none;
            padding: 0;
            margin: 0;
          }
        }
      `}</style>

      {/* Backdrop */}
      <div className="fixed inset-0 bg-secondary/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Modal Card */}
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative z-10 border border-secondary/5 animate-fade-in flex flex-col justify-between max-h-[90vh]">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary/40 hover:text-secondary hover:bg-secondary/5 p-1.5 rounded-full cursor-pointer transition-colors print:hidden"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Receipt Area */}
        <div className="overflow-y-auto pr-2 no-scrollbar flex-1 mb-8">
          <div 
            ref={receiptRef}
            id="print-receipt-area" 
            className="p-6 border border-dashed border-secondary/15 rounded-2xl bg-cream/10"
          >
            {/* Receipt Header */}
            <div className="text-center pb-6 border-b border-dashed border-secondary/10 mb-6">
              <span className="inline-flex h-10 w-10 rounded-full bg-primary items-center justify-center text-cream font-bold text-lg mb-2">
                K
              </span>
              <h3 className="font-serif text-xl font-bold text-secondary">
                Kemkem Quail Farm
              </h3>
              <p className="text-[10px] text-secondary/50 font-medium tracking-wide uppercase mt-1">
                Purchase Order Receipt
              </p>
            </div>

            {/* Receipt Details */}
            <div className="space-y-2.5 text-xs text-secondary/70 mb-6 pb-6 border-b border-dashed border-secondary/10">
              <div className="flex justify-between">
                <span className="text-secondary/40">Receipt Code:</span>
                <span className="font-bold text-secondary">{receiptId.current}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary/40">Order Date:</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary/40">Status:</span>
                <span className="text-primary font-bold">Checkout Pending (WhatsApp)</span>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-4 mb-6 pb-6 border-b border-dashed border-secondary/10">
              <span className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest block">Ordered Items</span>
              {checkoutItems.map((ci) => {
                const itemTotalUsd = ci.item.price * ci.quantity;
                const itemTotalNgn = itemTotalUsd * 1600;
                return (
                  <div key={ci.item.id} className="flex justify-between items-start text-xs">
                    <div>
                      <h4 className="font-bold text-secondary">{ci.item.name}</h4>
                      <p className="text-[10px] text-secondary/40">
                        Qty: {ci.quantity} &times; ${ci.item.price.toFixed(2)} (₦{(ci.item.price * 1600).toLocaleString()})
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-secondary">${itemTotalUsd.toFixed(2)}</span>
                      <span className="block text-[10px] text-secondary/50">₦{itemTotalNgn.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Totals */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-secondary/60">
                <span>Fresh Egg Quantity</span>
                <span className="font-bold text-secondary">{totalEggs} eggs</span>
              </div>
              
              <div className="flex justify-between items-baseline pt-3 border-t border-secondary/10">
                <span className="text-sm font-bold text-secondary">Total Value</span>
                <div className="text-right">
                  <span className="block text-lg font-extrabold text-primary">${subtotal.toFixed(2)}</span>
                  <span className="block text-xs font-bold text-primary/80">₦{subtotalNgn.toLocaleString()}</span>
                </div>
              </div>

              {/* Bank Transfer Details inside the receipt card */}
              <div className="mt-4 pt-3 border-t border-dashed border-secondary/10 text-[10px] text-secondary/70 bg-cream/10 p-3 rounded-lg flex gap-4 items-center">
                <div className="flex-1 space-y-1">
                  <p className="font-bold text-primary text-[11px] mb-1">Transfer Payment Instructions</p>
                  <p><strong>Bank Name:</strong> FCMB</p>
                  <p><strong>Account Name:</strong> KEMKEM QUAIL FARMS ENTERPRISE</p>
                  <p><strong>Account Number:</strong> 2007744689</p>
                  <p className="text-[8px] text-secondary/40 italic pt-1">Provide proof of transfer on WhatsApp.</p>
                </div>
                <div className="relative h-14 w-14 bg-white border border-secondary/10 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src="/qr-code.png"
                    alt="Scan to Pay QR"
                    fill
                    sizes="56px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Community Sign-up invitation in modal (Hidden on Print) */}
          <div className="mt-4 p-5 border border-secondary/5 rounded-2xl bg-primary/5 text-xs text-secondary/80 space-y-2.5 print:hidden">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
              <h4 className="font-serif font-bold text-primary">Join the Coop Community</h4>
            </div>
            <p className="text-[11px] text-secondary/65 leading-relaxed">
              Want early restock alerts when fresh egg batches are collected? Join our WhatsApp community list below for regular follow-ups and nutritional tips!
            </p>
            <button
              onClick={() => {
                const url = "https://wa.me/2349021012556?text=Hello%20Kemkem%20Quail%20Farm!%20I'm%20interested%20in%20joining%20the%20Coop%20Club%20community%20updates.";
                window.open(url, "_blank");
              }}
              className="w-full bg-white hover:bg-cream border border-secondary/10 text-[11px] font-bold py-2.5 rounded-xl text-primary flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm"
            >
              <svg className="h-3.5 w-3.5 fill-[#25D366]" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.95 9.95 0 0 0 4.887 1.33c5.508 0 9.99-4.478 9.991-9.985a9.97 9.97 0 0 0-2.928-7.057 9.97 9.97 0 0 0-7.08-2.941zM6.88 18.062l-.307-.182a8.21 8.21 0 0 1-1.258-1.026l-.168-.182a8.3 8.3 0 0 1-1.328-4.708 8.32 8.32 0 0 1 8.31-8.31 8.28 8.28 0 0 1 5.88 2.43 8.28 8.28 0 0 1 2.43 5.88 8.32 8.32 0 0 1-8.31 8.31 8.22 8.22 0 0 1-4.053-1.058l-.348-.203-3.13.82.842-3.081zm7.746-4.502c-.266-.134-1.57-.775-1.813-.863-.243-.089-.42-.133-.596.133-.177.266-.685.864-.84 1.04-.155.177-.31.199-.576.066a7.25 7.25 0 0 1-2.138-1.32 7.97 7.97 0 0 1-1.479-1.84c-.155-.266-.016-.41.117-.542.121-.12.266-.31.4-.465.133-.155.177-.266.266-.443.089-.177.044-.332-.022-.465-.067-.133-.597-1.439-.818-1.97-.215-.518-.465-.448-.596-.454-.15-.008-.321-.01-.492-.01a.948.948 0 0 0-.686.321c-.243.266-.929.908-.929 2.215 0 1.307.952 2.568 1.085 2.746.133.177 1.874 2.862 4.542 4.012.635.273 1.13.436 1.516.559.64.203 1.222.174 1.68.106.512-.077 1.57-.642 1.792-1.262.221-.62.221-1.15.155-1.262-.067-.111-.243-.177-.51-.311z"/>
              </svg>
              Join WhatsApp Coop List
            </button>
          </div>
        </div>

        {/* Downloads & Printing Options (Hidden on Print) */}
        <div className="space-y-3 print:hidden">
          <button
            onClick={handlePrint}
            className="w-full bg-primary text-cream text-xs font-bold py-3 rounded-full hover:bg-primary-light transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Receipt / Save PDF
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDownloadTxt}
              className="border border-secondary/10 bg-cream/10 text-secondary hover:bg-cream text-xs font-semibold py-2.5 rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download .TXT (Customer)
            </button>
            
            <button
              onClick={handleDownloadCsv}
              className="border border-secondary/10 bg-cream/10 text-secondary hover:bg-cream text-xs font-semibold py-2.5 rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download .CSV (Seller Log)
            </button>
          </div>

          <button
            onClick={() => {
              const dateStr = new Date().toLocaleDateString();
              const subtotalNgn = subtotal * 1600;
              const msg = `🥚 *KEMKEM QUAIL FARM - PAYMENT CONFIRMATION* 🥚\n` +
                          `====================================\n` +
                          `Receipt ID: *${receiptId.current}*\n` +
                          `Date: *${dateStr}*\n` +
                          `Amount Paid: *$${subtotal.toFixed(2)} (₦${subtotalNgn.toLocaleString()})*\n` +
                          `Total Eggs: *${totalEggs} fresh quail eggs*\n\n` +
                          `I have made a bank transfer to FCMB (KEMKEM QUAIL FARMS ENTERPRISE). Attached is my receipt proof for confirmation!`;
              const url = `https://wa.me/2349021012556?text=${encodeURIComponent(msg)}`;
              window.open(url, "_blank");
            }}
            className="w-full bg-[#25D366] text-white text-xs font-bold py-3.5 rounded-full hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg mt-2"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.95 9.95 0 0 0 4.887 1.33c5.508 0 9.99-4.478 9.991-9.985a9.97 9.97 0 0 0-2.928-7.057 9.97 9.97 0 0 0-7.08-2.941zM6.88 18.062l-.307-.182a8.21 8.21 0 0 1-1.258-1.026l-.168-.182a8.3 8.3 0 0 1-1.328-4.708 8.32 8.32 0 0 1 8.31-8.31 8.28 8.28 0 0 1 5.88 2.43 8.28 8.28 0 0 1 2.43 5.88 8.32 8.32 0 0 1-8.31 8.31 8.22 8.22 0 0 1-4.053-1.058l-.348-.203-3.13.82.842-3.081zm7.746-4.502c-.266-.134-1.57-.775-1.813-.863-.243-.089-.42-.133-.596.133-.177.266-.685.864-.84 1.04-.155.177-.31.199-.576.066a7.25 7.25 0 0 1-2.138-1.32 7.97 7.97 0 0 1-1.479-1.84c-.155-.266-.016-.41.117-.542.121-.12.266-.31.4-.465.133-.155.177-.266.266-.443.089-.177.044-.332-.022-.465-.067-.133-.597-1.439-.818-1.97-.215-.518-.465-.448-.596-.454-.15-.008-.321-.01-.492-.01a.948.948 0 0 0-.686.321c-.243.266-.929.908-.929 2.215 0 1.307.952 2.568 1.085 2.746.133.177 1.874 2.862 4.542 4.012.635.273 1.13.436 1.516.559.64.203 1.222.174 1.68.106.512-.077 1.57-.642 1.792-1.262.221-.62.221-1.15.155-1.262-.067-.111-.243-.177-.51-.311z"/>
            </svg>
            Confirm Payment on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
