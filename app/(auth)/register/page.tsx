"use client"

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFB] font-sans p-6">
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-zinc-400 hover:text-ristek-purple font-bold text-sm transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="w-full max-w-[460px] space-y-8">
 
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-black text-zinc-900 tracking-tight">
            Create <span className="text-ristek-purple">Your Account</span>
          </h2>
        </div>


        <div className="bg-white p-8 md:p-10 rounded-[32px] border border-zinc-100 shadow-xl shadow-zinc-200/50">
          <form className="space-y-5">

            <div className="space-y-2">
              <Label className="text-sm font-bold text-zinc-500 uppercase ml-1">
                Full Name
              </Label>
              <Input 
                type="text"
                placeholder="Enter your full name"
                className="text-zinc-400 rounded-2xl border-zinc-100 bg-zinc-50/50 h-14 " 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-zinc-400 uppercase ml-1">
                Email Address
              </Label>
              <Input 
                type="email" 
                placeholder="name@example.com" 
                className="text-zinc-400 rounded-2xl border-zinc-100 bg-zinc-50/50 h-14" 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-zinc-400 uppercase tracking-[0.1em] ml-1">
                Password
              </Label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="text-zinc-400 rounded-2xl border-zinc-100 bg-zinc-50/50 h-14"
              />
              <p className="text-sm text-zinc-400 ml-1">Must be at least 8 characters.</p>
            </div>

            <Button className="w-full h-14 bg-ristek-purple hover:bg-[#4a3ab0] text-white rounded-2xl font-bold text-lg shadow-lg shadow-purple-100 transition-all mt-4">
              Get Started Now!
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-50">
            <p className="text-center text-sm text-zinc-500 font-medium">
              Already a member?{" "}
              <Link href="/login" className="text-ristek-purple font-bold hover:underline transition-all">
                Sign In here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}