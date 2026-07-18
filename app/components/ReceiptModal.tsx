"use client";

import { useEffect, useRef } from "react";
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
    text += "Inquiries: kemkemquail@gmail.com\n";
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
            </div>
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
        </div>

      </div>
    </div>
  );
}
