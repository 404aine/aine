import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "aine, la meva web",
  description: "Opositora a Bombera 🚒 Next.js + Tailwind + shadcn/ui",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ca">
      <body className="min-h-dvh bg-red-400/50 text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}