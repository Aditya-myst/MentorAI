import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {
  ClerkProvider,
} from "@clerk/nextjs";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MentoraAI",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: '#8b5cf6' } }}>
      <html lang="en" className="dark">
        <body className={`${outfit.variable} antialiased bg-background text-foreground min-h-screen selection:bg-primary selection:text-primary-foreground`}>
          <Navbar />
          <div className="pt-24 pb-10">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
