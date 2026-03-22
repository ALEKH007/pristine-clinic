import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pristine Dental and Heart Care Clinic | Expert Care in Nagpur",
  description: "Experience world-class dental and heart care with our expert specialists in Nagpur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-white text-slate-800 antialiased`}>
        {children}
      </body>
    </html>
  );
}
