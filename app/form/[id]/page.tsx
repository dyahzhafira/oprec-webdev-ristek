"use client"

import { useState, useEffect } from "react"; 
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, FileText, Loader2 } from "lucide-react";

interface Question {
  id: string;
  label: string;
  placeholder: string;
}

interface FormData {
  title: string;
  status: string;
  deadline?: string;
  questions: Question[];
}

export default function FormDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormDetail = async () => {
      try {
        const res = await fetch(`/api/forms/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData(data);
        }
      } catch (error) {
        console.error("Error fetching form:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchFormDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFB]">
        <Loader2 className="animate-spin text-ristek-purple w-10 h-10" />
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFB] space-y-4">
        <p className="font-bold text-zinc-500">Form not found or access denied.</p>
        <Link href="/dashboard" className="text-ristek-purple font-bold underline">Back to Dashboard</Link>
      </div>
    );
  }

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
                    <Calendar size={14} /> {formData.status || "Draft"}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-start gap-3">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-ristek-purple">
                  <FileText size={20} />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-zinc-900 uppercase">Status</p>
                  <p className="text-zinc-500 font-medium">{formData.status}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
               <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] flex-1 bg-zinc-100" />
                <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Form Preview</span>
                <div className="h-[1px] flex-1 bg-zinc-100" />
              </div>

              {formData.questions && formData.questions.length > 0 ? (
                formData.questions.map((q) => (
                  <div key={q.id} className="group space-y-3">
                    <label className="text-sm font-bold text-zinc-400 uppercase ml-1">
                      {q.label}
                    </label>
                    <div className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-5 py-4 text-zinc-500">
                      <span className="text-sm font-medium italic opacity-80">
                        "{q.placeholder || "Enter response..."}"
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-zinc-100 rounded-2xl">
                   <p className="text-zinc-400 font-medium">No questions added to this form yet.</p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-zinc-50 flex flex-col sm:flex-row justify-end items-center gap-4">
              <Button 
                variant="ghost" 
                className="rounded-2xl px-8 font-bold text-zinc-500 hover:text-zinc-900 h-14" 
                asChild
              >
                <Link href="/dashboard">Close Preview</Link>
              </Button>
              <Button 
                className="bg-ristek-purple text-white rounded-2xl px-5 h-10 font-bold"
              >
                Submit Now
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center items-center gap-2 text-zinc-400">
          <p className="text-sm font-bold uppercase">
            Read-Only Mode Active
          </p>
        </div>
      </div>
    </div>
  );
}