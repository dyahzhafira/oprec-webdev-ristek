import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-zinc-100 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="space-y-2 text-center md:text-left">
            <div className="text-lg font-black tracking-tighter text-ristek-purple">
              RISTEK<span className="text-black">FORMS</span>
            </div>
            <p className="text-zinc-400 text-sm font-medium">
              Simplifying your recruitment process since 2026.
            </p>
          </div>

          <div className="flex gap-8 text-sm font-bold text-zinc-400">
            <Link href="#" className="hover:text-ristek-purple transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-ristek-purple transition-colors">Terms</Link>
            <Link href="#" className="hover:text-ristek-purple transition-colors">Contact</Link>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-50 text-center">
          <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em]">
            &copy; 2026 Ristek Fasilkom UI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}