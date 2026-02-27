"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        <Link href="/" className="text-xl font-black tracking-tighter text-ristek-purple uppercase">
          RISTEK<span className="text-black">FORMS</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-right">
            <Button className="bg-ristek-purple hover:bg-purple-500 transition-colors text-xs md:text-sm">Login Here!</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}