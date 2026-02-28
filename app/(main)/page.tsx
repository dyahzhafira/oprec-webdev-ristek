import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="bg-white font-sans selection:bg-purple-100 min-h-screen flex flex-col items-center justify-center">
      <main className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        
        <h1 className="text-5xl md:text-7xl font-black text-[#18181b] tracking-tighter leading-[1.05] mb-6">
          Ristek<span className="text-[#7c3aed]">Forms.</span> <br />
          Built for teams.
        </h1>

        <p className="text-zinc-500 text-base md:text-lg mb-10 max-w-md leading-relaxed">
          The simplest way to build forms and track submissions. 
          Streamline your recruitment process in one click.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Button 
            asChild
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-10 py-7 rounded-full text-lg font-semibold transition-all shadow-lg shadow-purple-100 active:scale-95"
          >
            <Link href="/login">Create your own form here!</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}