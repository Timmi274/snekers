import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOLE & STYLE — Premium Sneakers & Clothing",
  description:
    "Shop the latest Nike, Jordan, Adidas, New Balance sneakers and premium streetwear. Authentic products, fast delivery.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">{children}</body>
    </html>
  );
}
