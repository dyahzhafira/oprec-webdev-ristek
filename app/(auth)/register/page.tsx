"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [error, setError]=useState("");
  const [success, setSuccess]=useState(false);

  const handleRegister = async (e: React.FormEvent)=>{
    e.preventDefault();
    setError("");

    const res = await fetch("api/auth/register",{
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({name, email, password}),
    });

    if (res.ok){
      setSuccess(true);
      setTimeout(()=>router.push("/login"),2000);
    }
    else{
      const data = await res.json();
      setError(data.error||"Pendaftaran gagal!");
    }
  };
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
          <h2 className="text-4xl font-bold text-zinc-900 tracking-tight">
            Create <span className="text-ristek-purple">Your Account</span>
          </h2>
        </div>


        <div className="bg-white p-8 md:p-10 rounded-[32px] border border-zinc-100 shadow-xl shadow-zinc-200/50">
          <form
            onSubmit={handleRegister} 
            className="space-y-5">
            {success && (
              <div className="bg-green-100 text-green-700 p-3 rounded-xl text-md font-bold text-center">
                Akun berhasil dibuat! Mengalihkan ke Login...
              </div>
            )}

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-xl text-md font-bold text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-zinc-500 uppercase ml-1">
                Full Name
              </Label>
              <Input 
                type="text"
                value={name}
                onChange={(e)=> setName(e.target.value)}
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
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="name@example.com" 
                className="text-zinc-400 rounded-2xl border-zinc-100 bg-zinc-50/50 h-14" 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-zinc-400 uppercase ml-1">
                Password
              </Label>
              <Input 
                type="password" 
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="••••••••" 
                className="text-zinc-400 rounded-2xl border-zinc-100 bg-zinc-50/50 h-14"
              />
            </div>

            <Button type="submit" className="w-full h-14 bg-ristek-purple hover:bg-[#4a3ab0] text-white rounded-2xl font-bold text-lg shadow-lg shadow-purple-100 transition-all mt-4">
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