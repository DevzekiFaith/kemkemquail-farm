"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartItem } from "./Cart";

export interface TransactionRecord {
  id: string;
  receiptId: string;
  timestamp: string;
  items: {
    name: string;
    quantity: number;
    priceUsd: number;
    eggs: number;
  }[];
  totalEggs: number;
  subtotalUsd: number;
  subtotalNgn: number;
  paymentMethod: "FCMB Bank Transfer" | "Scan & Pay QR" | "WhatsApp Direct";
  status: "Confirmed" | "Pending Verification";
  customerName?: string;
  customerPhone?: string;
}

// Initial demo seed data if local storage is empty
const INITIAL_DEMO_TRANSACTIONS: TransactionRecord[] = [
  {
    id: "tx-101",
    receiptId: "KK-2026-8941",
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toLocaleString(),
    items: [
      { name: "Double Dozen Crate (24 Eggs)", quantity: 1, priceUsd: 12.00, eggs: 24 },
      { name: "Sample Quad Crate (4 Eggs)", quantity: 2, priceUsd: 2.50, eggs: 8 },
    ],
    totalEggs: 32,
    subtotalUsd: 17.00,
    subtotalNgn: 27200,
    paymentMethod: "FCMB Bank Transfer",
    status: "Confirmed",
    customerName: "Chief Adewale O.",
    customerPhone: "+234 803 *** 1190",
  },
  {
    id: "tx-102",
    receiptId: "KK-2026-8942",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toLocaleString(),
    items: [
      { name: "Commercial Master Crate (30 Eggs)", quantity: 2, priceUsd: 15.00, eggs: 60 },
    ],
    totalEggs: 60,
    subtotalUsd: 30.00,
    subtotalNgn: 48000,
    paymentMethod: "Scan & Pay QR",
    status: "Confirmed",
    customerName: "Dr. Mrs. Nkechi E.",
    customerPhone: "+234 706 *** 4421",
  },
  {
    id: "tx-103",
    receiptId: "KK-2026-8943",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toLocaleString(),
    items: [
      { name: "Sampler Trio Bundle (14 Eggs)", quantity: 1, priceUsd: 7.50, eggs: 14 },
    ],
    totalEggs: 14,
    subtotalUsd: 7.50,
    subtotalNgn: 12000,
    paymentMethod: "WhatsApp Direct",
    status: "Pending Verification",
    customerName: "Babalola Farms Ltd",
    customerPhone: "+234 812 *** 8830",
  },
];

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [pinInput, setPinInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);

  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Confirmed" | "Pending Verification">("All");

  // Load transactions from localStorage or seed with demo data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("kemkem_admin_transactions");
      if (saved) {
        try {
          setTransactions(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse transactions", e);
          setTransactions(INITIAL_DEMO_TRANSACTIONS);
        }
      } else {
        setTransactions(INITIAL_DEMO_TRANSACTIONS);
        localStorage.setItem("kemkem_admin_transactions", JSON.stringify(INITIAL_DEMO_TRANSACTIONS));
      }
    }
  }, [isOpen]);

  // Persist transaction updates
  const saveTransactions = (updated: TransactionRecord[]) => {
    setTransactions(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("kemkem_admin_transactions", JSON.stringify(updated));
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "9071" || pinInput.toLowerCase() === "admin" || pinInput === "1234") {
      setIsUnlocked(true);
      setPinError(false);
      setPinInput("");
    } else {
      setPinError(true);
      setPinInput("");
    }
  };

  const handleToggleStatus = (id: string) => {
    const updated = transactions.map((t) => {
      if (t.id === id) {
        const nextStatus: "Confirmed" | "Pending Verification" =
          t.status === "Confirmed" ? "Pending Verification" : "Confirmed";
        return { ...t, status: nextStatus };
      }
      return t;
    });
    saveTransactions(updated);
  };

  const handleSimulateSale = () => {
    const sampleNames = ["Kemi A.", "Engr. Timothy U.", "Grace O.", "Pastor David M.", "Mrs. Folake S."];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const num = Math.floor(1000 + Math.random() * 9000);
    
    const newRecord: TransactionRecord = {
      id: `tx-${Date.now()}`,
      receiptId: `KK-2026-${num}`,
      timestamp: new Date().toLocaleString(),
      items: [
        { name: "Dozen Premium Crate (12 Eggs)", quantity: 1, priceUsd: 6.50, eggs: 12 },
        { name: "Half-Dozen Crate (6 Eggs)", quantity: 1, priceUsd: 3.50, eggs: 6 },
      ],
      totalEggs: 18,
      subtotalUsd: 10.00,
      subtotalNgn: 16000,
      paymentMethod: "FCMB Bank Transfer",
      status: "Confirmed",
      customerName: randomName,
      customerPhone: "+234 902 *** " + Math.floor(1000 + Math.random() * 8999),
    };

    saveTransactions([newRecord, ...transactions]);
  };

  const handleExportCsv = () => {
    if (transactions.length === 0) {
      alert("No transactions available to export.");
      return;
    }

    const headers = ["Receipt ID", "Timestamp", "Customer", "Total Eggs", "Subtotal (USD)", "Subtotal (NGN)", "Payment Method", "Status"];
    const rows = transactions.map((t) => [
      t.receiptId,
      `"${t.timestamp}"`,
      `"${t.customerName || "Customer"}"`,
      t.totalEggs,
      t.subtotalUsd.toFixed(2),
      t.subtotalNgn,
      `"${t.paymentMethod}"`,
      t.status,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Kemkem_Daily_Transactions_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear daily transaction logs?")) {
      saveTransactions([]);
    }
  };

  if (!isOpen) return null;

  // Filtered transactions
  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.receiptId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.customerName && t.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalRevenueUsd = transactions.reduce((acc, t) => acc + t.subtotalUsd, 0);
  const totalRevenueNgn = transactions.reduce((acc, t) => acc + t.subtotalNgn, 0);
  const totalEggsSold = transactions.reduce((acc, t) => acc + t.totalEggs, 0);
  const pendingCount = transactions.filter((t) => t.status === "Pending Verification").length;
  const confirmedCount = transactions.filter((t) => t.status === "Confirmed").length;
  const avgOrderUsd = transactions.length > 0 ? totalRevenueUsd / transactions.length : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 select-none">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-secondary/60 backdrop-blur-md"
      />

      {/* Main Admin Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-[32px] max-w-5xl w-full p-6 sm:p-8 shadow-2xl relative z-10 border border-secondary/10 flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-secondary/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-cream font-extrabold text-lg shadow-sm">
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-secondary tracking-tight">
                  Admin Real-Time Sales Desk
                </h2>
                <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                  Live Feed
                </span>
              </div>
              <p className="text-[11px] text-secondary/50 font-medium">
                Kemkem Quail Farm • Enterprise CAC: 9071156 | NAFDAC: A8-123266L
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isUnlocked && (
              <button
                onClick={() => setIsUnlocked(false)}
                className="text-xs font-bold text-secondary/60 hover:text-secondary bg-secondary/5 hover:bg-secondary/10 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                🔒 Lock Console
              </button>
            )}
            <button
              onClick={onClose}
              className="text-secondary/40 hover:text-secondary hover:bg-secondary/5 p-2 rounded-full cursor-pointer transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PIN Security Passcode Prompt (If Locked) */}
        {!isUnlocked ? (
          <div className="py-16 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
            <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mb-4 shadow-inner">
              🔒
            </div>
            <h3 className="font-serif text-2xl font-bold text-secondary mb-2">
              Admin Access Passcode Required
            </h3>
            <p className="text-xs text-secondary/60 mb-6 leading-relaxed">
              Enter your farm manager passcode to view real-time revenue stats, pending WhatsApp bank transfers, and sales ledgers.
            </p>

            <form onSubmit={handlePinSubmit} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter Passcode (e.g. 9071)"
                  autoFocus
                  className="w-full text-center tracking-widest text-lg font-bold border border-secondary/20 rounded-2xl p-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-cream/10"
                />
                {pinError && (
                  <p className="text-red-500 text-xs font-bold mt-2">
                    Invalid passcode! (Hint: use 9071 or admin)
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-light text-cream font-bold text-xs py-3.5 rounded-full transition-all shadow-md cursor-pointer"
              >
                Unlock Admin Desk
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Admin Dashboard Console */
          <div className="overflow-y-auto pr-1 flex-1 space-y-6 pt-6 no-scrollbar">
            
            {/* Real-time KPI Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-cream/20 border border-secondary/5 rounded-2xl p-4 shadow-2xs">
                <span className="text-[10px] font-bold text-secondary/50 uppercase tracking-widest block mb-1">
                  Today's Total Sales
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-primary block">
                  ${totalRevenueUsd.toFixed(2)}
                </span>
                <span className="text-[11px] font-bold text-secondary/70">
                  ₦{totalRevenueNgn.toLocaleString()} NGN
                </span>
              </div>

              <div className="bg-cream/20 border border-secondary/5 rounded-2xl p-4 shadow-2xs">
                <span className="text-[10px] font-bold text-secondary/50 uppercase tracking-widest block mb-1">
                  Fresh Eggs Volume
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-secondary block">
                  {totalEggsSold} <span className="text-xs font-normal text-secondary/60">Eggs</span>
                </span>
                <span className="text-[11px] font-bold text-accent">
                  {transactions.length} Orders Logged
                </span>
              </div>

              <div className="bg-cream/20 border border-secondary/5 rounded-2xl p-4 shadow-2xs">
                <span className="text-[10px] font-bold text-secondary/50 uppercase tracking-widest block mb-1">
                  WhatsApp Verifications
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-accent block">
                  {pendingCount} <span className="text-xs font-normal text-secondary/60">Pending</span>
                </span>
                <span className="text-[11px] font-bold text-primary">
                  {confirmedCount} Confirmed
                </span>
              </div>

              <div className="bg-cream/20 border border-secondary/5 rounded-2xl p-4 shadow-2xs">
                <span className="text-[10px] font-bold text-secondary/50 uppercase tracking-widest block mb-1">
                  Avg. Order Value
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-secondary block">
                  ${avgOrderUsd.toFixed(2)}
                </span>
                <span className="text-[11px] font-bold text-secondary/70">
                  ₦{(avgOrderUsd * 1600).toLocaleString()} Avg
                </span>
              </div>
            </div>

            {/* Action Bar & Search / Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/5">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search Receipt ID or Customer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border border-secondary/10 rounded-full px-4 py-2 text-xs font-medium text-secondary focus:outline-none focus:border-primary w-full sm:w-64"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="bg-white border border-secondary/10 rounded-full px-3 py-2 text-xs font-bold text-secondary focus:outline-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending Verification">Pending</option>
                </select>
              </div>

              {/* Admin Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  onClick={handleSimulateSale}
                  className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-bold px-3.5 py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  title="Generate a test incoming transaction"
                >
                  <span className="text-sm">⚡</span> Simulate Live Sale
                </button>

                <button
                  onClick={handleExportCsv}
                  className="bg-secondary text-cream hover:bg-primary text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <svg className="h-3.5 w-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export CSV Ledger
                </button>

                <button
                  onClick={handleClearData}
                  className="text-red-600 hover:text-red-800 text-[11px] font-bold px-3 py-2 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Clear Log
                </button>
              </div>
            </div>

            {/* Daily Real-Time Transactions Table */}
            <div className="border border-secondary/10 rounded-2xl overflow-hidden shadow-2xs bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-secondary">
                  <thead className="bg-cream/40 text-[10px] font-extrabold uppercase tracking-wider text-secondary/60 border-b border-secondary/10">
                    <tr>
                      <th className="p-3.5">Receipt ID</th>
                      <th className="p-3.5">Timestamp</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Items & Volume</th>
                      <th className="p-3.5 text-right">Amount</th>
                      <th className="p-3.5">Payment Method</th>
                      <th className="p-3.5 text-center">Status</th>
                      <th className="p-3.5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary/5 font-sans">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-secondary/40 text-xs italic">
                          No transactions found for current filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((t) => (
                        <tr key={t.id} className="hover:bg-cream/15 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-primary whitespace-nowrap">
                            {t.receiptId}
                          </td>
                          <td className="p-3.5 text-secondary/60 text-[11px] whitespace-nowrap">
                            {t.timestamp}
                          </td>
                          <td className="p-3.5 font-semibold text-secondary whitespace-nowrap">
                            {t.customerName || "Walk-in / Online"}
                            <span className="block text-[10px] text-secondary/40 font-normal">
                              {t.customerPhone || "Direct Order"}
                            </span>
                          </td>
                          <td className="p-3.5 max-w-xs">
                            <span className="font-bold block text-secondary">
                              {t.totalEggs} Fresh Eggs Total
                            </span>
                            <span className="text-[10px] text-secondary/60 line-clamp-1">
                              {t.items.map((i) => `${i.name} (x${i.quantity})`).join(", ")}
                            </span>
                          </td>
                          <td className="p-3.5 text-right whitespace-nowrap">
                            <span className="block font-extrabold text-secondary">${t.subtotalUsd.toFixed(2)}</span>
                            <span className="block text-[10px] font-bold text-primary">₦{t.subtotalNgn.toLocaleString()}</span>
                          </td>
                          <td className="p-3.5 text-secondary/70 font-medium whitespace-nowrap text-[11px]">
                            {t.paymentMethod}
                          </td>
                          <td className="p-3.5 text-center whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                t.status === "Confirmed"
                                  ? "bg-primary/10 text-primary border border-primary/20"
                                  : "bg-accent/10 text-accent border border-accent/20"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  t.status === "Confirmed" ? "bg-primary" : "bg-accent animate-ping"
                                }`}
                              />
                              {t.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-center whitespace-nowrap">
                            <button
                              onClick={() => handleToggleStatus(t.id)}
                              className="text-[10px] font-bold text-secondary/70 hover:text-primary border border-secondary/15 rounded-full px-2.5 py-1 bg-white hover:bg-cream/40 transition-all cursor-pointer shadow-2xs"
                              title="Toggle transaction status"
                            >
                              Toggle
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </motion.div>
    </div>
  );
}
