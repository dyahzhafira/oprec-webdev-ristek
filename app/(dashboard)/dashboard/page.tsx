"use client"

import { useState, useEffect } from "react"; 
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Mail, 
  ArrowRight,
} from "lucide-react";
import FormCard from "@/components/FormCard";

interface FormData {
  id: string;
  title: string;
  response: number;
  status: string;
  lastActivity: string;
}

export default function Dashboard() {
  const [myForms, setMyForms] = useState<FormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [user, setUser] = useState({
    name: "Loading...",
    email: "...",
    initials: ".."
  });

  const fetchForms = async () => {
    try {
      const res = await fetch("/api/forms");
      if (!res.ok){
        if (res.status===401){
          console.error("Belum login atau session habis")
        }
        setMyForms([])
        return;
      }
      const data= await res.json();
      setMyForms(Array.isArray(data)?data:[])
    } catch (err) {
      console.error("Gagal ambil data:", err);
      setMyForms([]);
    }
  };

  const fetchUserData = async () => {
    const res = await fetch("/api/auth/me");
    if (res.ok) {
      const data = await res.json();
      setUser(data);
    }
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await Promise.all([fetchUserData(), fetchForms()]);
      setIsLoading(false);
    };
    init();
  }, []);

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST"});
    if (res.ok) {
      window.location.href = "/"; 
    }
  };

  const handleCreate = async () => {
  const title = prompt("Enter Form Title:"); 
  if (!title) return; 
  try {
    const response = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        title,
        status: "Draft" 
      }),
    });
    if (response.ok) {
      fetchForms(); 
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error("Gagal buat form:", errorData.error || response.statusText);
      alert("Gagal membuat form. Pastikan Anda sudah login.");
    }
  } catch (err) {
    console.error("Network Error:", err);
  }
};

  return (
    <div className="min-h-screen bg-[#FAFAFB] font-sans pb-20 overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-20">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900">
              Your Activity Here!
            </h2>
            <p className="text-zinc-500 font-medium text-sm md:text-base">
              Manage your forms and view insights all in one place.
            </p>
          </div>
          
          <Button 
            onClick={handleCreate}
            className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 md:px-8 py-6 md:py-7 rounded-lg font-bold text-sm md:text-lg"
          >
            <Plus className="mr-2 w-5 h-5 md:w-6 md:h-6" /> 
            Create New Form
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
          <div className="lg:col-span-8 space-y-6 w-full min-w-0"> 
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-bold text-zinc-900 uppercase text-lg">Recent Forms</h3>
              <span className="text-sm font-bold text-zinc-700 uppercase px-2 py-1 rounded">
                Total: {myForms.length} Forms
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {isLoading ? (
                <p className="p-10 text-center text-zinc-400">Loading your forms...</p>
              ) : myForms.length > 0 ? (
                myForms.map((form) => (
                  <FormCard 
                    key={form.id}
                    id={form.id}
                    title={form.title}
                    response={form.response || 0}
                    status={form.status as any}
                    lastActivity={form.lastActivity || "Recently"} 
                  />
                ))
              ) : (
                <div className="p-20 text-center bg-white border-2 border-dashed rounded-3xl text-zinc-400">
                  No forms yet. Click "Create New Form" to start.
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6 w-full">
            <div className="bg-white border border-zinc-100 rounded-xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                  {user.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-xl md:text-2xl text-zinc-900">{user.name}</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t-2 border-zinc-300">
                <div className="flex items-center gap-3 text-zinc-500 overflow-hidden">
                  <Mail size={14} />
                  <span className="text-xs md:text-sm font-bold truncate">{user.email}</span>
                </div>
              </div>

              <Button 
                onClick={handleLogout}
                variant="ghost" 
                className="w-full mt-4 text-red-500 hover:text-red-600 hover:bg-red-50 font-bold">
                Logout
              </Button>
            </div>

            <div className="bg-white border border-zinc-100 rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden group">
                <p className="text-zinc-500 text-sm font-bold uppercase mb-6">Insights</p>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="space-y-1">
                    <p className="text-3xl md:text-4xl font-bold text-zinc-900">{myForms.length}</p>
                    <p className="text-sm font-semibold text-zinc-500 uppercase leading-tight">Forms Created</p>
                  </div>
                  <div className="space-y-1 border-l-2 border-zinc-100 pl-4">
                    <p className="text-3xl md:text-4xl font-bold text-purple-700">

                      {myForms.reduce((acc, curr) => acc + (curr.response || 0), 0)}
                    </p>
                    <p className="text-sm font-semibold text-zinc-500 uppercase leading-tight">Total Responses</p>
                  </div>
                </div>
                <button className="w-full mt-8 flex items-center justify-between text-xs font-bold uppercase text-zinc-400 hover:text-purple-600 transition-colors">
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