import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

import Footer from "@/components/Footer";
import NavbarDashboard from "@/components/NavbarDashboard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RistekForms",
  description: "Platform form builder Ristek",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarDashboard />
        <main className="min-h-screen bg-[#FAFAFB]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}