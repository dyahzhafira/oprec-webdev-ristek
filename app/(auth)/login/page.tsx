"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFB] font-sans p-6">
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-zinc-400 hover:text-ristek-purple font-bold text-sm transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="w-full max-w-110 `space-y-8`">
        <div className="text-center space-y-2">
          <div className="text-xl font-black text-ristek-purple uppercase ">
            RISTEK<span className="text-black">FORMS</span>
          </div>
          <h2 className="text-4xl font-black text-zinc-900">
            Welcome Back
          </h2>
          <p className="text-zinc-500 font-medium">
            Please enter your details to sign in.
          </p>
        </div>

        <div className="bg-white mt-5 p-8 md:p-10 rounded-xl border border-zinc-100 shadow-xl ">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-black text-zinc-500 uppercase ml-1">
                Email Address
              </Label>
              <Input 
                type="email"
                placeholder="name@example.com"
                className="text-zinc-400 rounded-2xl border-zinc-100 bg-zinc-50/50 h-14" 
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <Label className="text-sm font-bold text-zinc-500 uppercase">
                  Password
                </Label>
                <Link href="#" className=" text-sm font-bold text-ristek-purple hover:underline">
                  Forgot?
                </Link>
              </div>
              <Input 
                type="password" 
                placeholder="••••••••"
                className="text-zinc-400 rounded-2xl border-zinc-100 bg-zinc-50/50 h-14 " 
              />
            </div>

            <Button className="w-full h-14 bg-ristek-purple hover:bg-[#4a3ab0] active:scale-[0.98] text-white rounded-2xl font-bold text-lg shadow-lg shadow-purple-100 transition-all mt-2">
              Sign In
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-100"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-zinc-400 font-bold tracking-widest">Or</span>
            </div>
          </div>

          <p className="text-center text-sm text-zinc-500 font-medium">
            Don't have an account?{" "}
            <Link href="/register" className="text-ristek-purple font-bold hover:underline">
              Create one for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}