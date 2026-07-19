import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kemkem Quail Farm | Premium Fresh Quail Eggs",
  description: "Order fresh, organic, hand-inspected quail eggs in custom crate sizes (4, 6, 12, and 30 eggs) or discount combos directly from our farm coops. Freshness guaranteed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased font-sans"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
