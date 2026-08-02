import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kemkemquailfarm.com.ng"),
  title: "Kemkem Quail Farm | Organic Quail Eggs & Fresh Produce Nigeria",
  description: "Order fresh, NAFDAC certified organic quail eggs in custom crates (4, 6, 12, and 30 eggs) or bulk supermarket supply directly from Kemkem Quail Farm Enterprise. Hand-sorted and delivered fresh daily.",
  keywords: [
    "Kemkem Quail Farm",
    "Quail Eggs Nigeria",
    "Organic Quail Eggs",
    "Coturnix Quail Eggs Enugu",
    "Fresh Quail Eggs Supermarket",
    "Quail Farm Enterprise NAFDAC",
    "Quail Egg Benefits"
  ],
  authors: [{ name: "Kemkem Quail Farm Enterprise" }],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Kemkem Quail Farm | Organic Quail Eggs & Fresh Produce",
    description: "Hand-inspected, NAFDAC certified organic quail eggs in eco-cushioned crates. CAC: 9071156 | NAFDAC: A8-123266L.",
    url: "https://www.kemkemquailfarm.com.ng",
    siteName: "Kemkem Quail Farm Enterprise",
    images: [
      {
        url: "/logo-new.jpg",
        width: 800,
        height: 800,
        alt: "Kemkem Quail Farm Logo",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  alternates: {
    canonical: "https://www.kemkemquailfarm.com.ng",
  },
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
