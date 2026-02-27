"use client"

import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Mail, 
  Phone, 
  ArrowRight,
  LayoutDashboard
} from "lucide-react";
import Link from "next/link";
import FormCard from "@/components/FormCard";

export default function Dashboard() {
  const myForms = [
    { id: "web-dev", title: "Form Pendaftaran Oprec Web Dev", division: "Web Development", response: 29, status: "Published", lastActivity: "2 hours ago" },
    { id: "data-science", title: "Tugas Seleksi Data Science", division: "Data Science", response: 0, status: "Draft", lastActivity: "1 day ago" },
    { id: "ui-ux", title: "Design Challenge 2026", division: "UI/UX Designer", response: 150, status: "Closed", lastActivity: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFB] font-sans pb-20 overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-20">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900">
              Your Activity Here!
            </h2>
            <p className="text-zinc-500 font-medium text-sm md:text-base">
              Manage your forms and view insights all in one place. Create, edit, and analyze your forms with ease.
            </p>
          </div>
         
          <Button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 md:px-8 py-6 md:py-7 rounded-ristek md:rounded-ristek font-bold text-sm md:text-lg ">
            <Plus className="mr-2 w-5 h-5 md:w-6 md:h-6" /> 
            Create New Form
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
          <div className="lg:col-span-8 space-y-6 w-full min-w-0"> 
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-black text-zinc-900 uppercase text-lg">Recent Forms</h3>
              <span className="text-sm font-black text-zinc-700 uppercase  px-2 py-1 rounded">
                Total: {myForms.length} Forms
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {myForms.map((form) => (
                <FormCard 
                  key={form.id}
                  id={form.id}
                  title={form.title}
                  responses={form.response}
                  status={form.status as any}
                  lastActivity={form.lastActivity} 
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6 w-full">
            <div className="bg-white border border-zinc-100 rounded-xl md:rounded-xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-5 mb-8">
                <div className="relative group">
                  <div className="w-14 h-14 bg-purple-600 rounded-2xl"></div>
                </div>
                <div className="min-w-0">
                  <p className="font-black text-xl md:text-2xl text-zinc-900">
                    Dyah Zhafira
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t-2 border-zinc-300">
                <div className="flex items-center gap-3 text-zinc-500 cursor-pointer overflow-hidden">
                  <div className="w-9 h-9 rounded-xl bg-zinc-50 flex items-center justify-center  border border-zinc-100">
                    <Mail size={14} />
                  </div>
                  <span className="text-xs md:text-sm font-bold">dyahzhafira@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-500 group cursor-pointer hover:text-zinc-900 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-zinc-50 flex items-center justify-center group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors border border-zinc-100">
                    <Phone size={14} />
                  </div>
                  <span className="text-xs md:text-sm font-bold ">0812345678</span>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-8 rounded-2xl border-2 border-zinc-100 font-black text-[10px] uppercase tracking-widest h-12 hover:bg-zinc-50 hover:border-zinc-200 transition-all" asChild>
                <Link href="#">Account Settings</Link>
              </Button>
            </div>

            <div className="bg-secondary rounded-xl md:rounded-xl p-6 md:p-8 text-white shadow-2xl shadow-zinc-200 relative overflow-hidden group">
                <p className="text-zinc-500 text-sm font-black uppercase mb-6">Insights</p>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="space-y-1">
                    <p className="text-3xl md:text-4xl font-bold text-zinc-900">12</p>
                    <p className="text-sm font-semibold text-zinc-500 uppercase">Forms Created</p>
                  </div>
                  <div className="space-y-1 border-l border-zinc-800 pl-4">
                    <p className="text-3xl md:text-4xl font-bold text-purple-700">148</p>
                    <p className="text-sm font-semibold text-zinc-500 uppercase">Total Responses</p>
                  </div>
                </div>
                <button className="w-full mt-8 flex items-center justify-between text-xs font-bolduppercase text-zinc-400">
                  View Full Analytics 
                  <ArrowRight size={14} />
                </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}