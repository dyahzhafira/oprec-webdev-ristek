"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import {useState} from "react";
export default function NavbarDashboard() {
  const pathname = usePathname();
  const [user, setUser] = useState({
    name: "Loading...",
  });
  const fetchUserData = async () => {
    const res = await fetch("/api/auth/me");
    if (res.ok) {
      const data = await res.json();
      setUser(data);
    }
  };
  useState(() => {
    fetchUserData();
  });

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        <Link href="/" className="text-xl font-black tracking-tighter text-ristek-purple uppercase">
          RISTEK<span className="text-black">FORMS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-bold transition-colors ${
                pathname === link.href ? "text-ristek-purple" : "text-zinc-400 hover:text-zinc-900"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-md font-bold text-zinc-900 leading-none">{user.name}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-ristek-purple flex items-center justify-center"></div>
        </div>
      </div>
    </nav>
  );
}