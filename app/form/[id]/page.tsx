"use client"

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, FileText } from "lucide-react";


const FORMS_DATA: Record<string, { title: string; deadline: string }> = {
  "web-dev": { title: "Web Development Task", deadline: "28 Feb 2026" },
  "data-science": { title: "Data Science Selection", deadline: "02 Mar 2026" },
  "ui-ux": { title: "UI/UX Design Challenge", deadline: "05 Mar 2026" },
};

export default function FormDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;


  const formData = FORMS_DATA[id as string] || { 
    title: "General Recruitment", 
    deadline: "TBA" 
  };

  const questions = [
    { id: 1, label: "Nama Lengkap", val: "Enter your full name" },
    { id: 2, label: "Motivasi Bergabung", val: "Enter text here" },
    { id: 3, label: "Link Portofolio", val: "https://" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFB] font-sans pb-20">
      <div className="max-w-3xl mx-auto px-6 pt-10">
        
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-ristek-purple mb-8 font-bold text-sm transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Kembali ke Dashboard
        </Link>

        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="h-2 bg-ristek-purple w-full" />

          <div className="p-8 md:p-12">

            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-12">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">
                  {formData.title}
                </h1>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 mt-3 text-ristek-purple border-2 px-2 py-1 rounded-full text-sm font-bold uppercase">
                    <Calendar size={14} /> Unsubmitted
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-start gap-3">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-ristek-purple">
                  <FileText size={20} />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-zinc-900 uppercase">Deadline</p>
                  <p className="text-zinc-500 font-medium">{formData.deadline}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] flex-1 bg-zinc-100" />
                <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Form Preview</span>
                <div className="h-[1px] flex-1 bg-zinc-100" />
              </div>

              {questions.map((q) => (
                <div key={q.id} className="group space-y-3">
                  <label className="text-sm font-bold text-zinc-400 uppercase ml-1">
                    {q.label}
                  </label>
                  <div className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-5 py-4 text-zinc-500 flex justify-between items-start gap-4 transition-colors group-hover:border-zinc-200">
                    <span className="text-sm font-medium leading-relaxed italic opacity-80">
                      "{q.val}"
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-zinc-50 flex flex-col sm:flex-row justify-end gap-4">
              <Button 
                variant="ghost" 
                className="rounded-2xl px-8 font-bold text-zinc-500 hover:text-zinc-900 h-14" 
                asChild
              >
                <Link href="/dashboard">Close Preview</Link>
              </Button>
              <Button 
                className="bg-ristek-purple hover:bg-[#4a3ab0] text-white rounded-2xl px-10 h-14 font-bold transition-all hover:scale-[1.02] active:scale-95"
              >
                Submit Now
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center items-center gap-2 text-zinc-400">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" />
          <p className="text-[11px] font-black uppercase tracking-widest">
            Read-Only Mode Active
          </p>
        </div>
      </div>
    </div>
  );
}