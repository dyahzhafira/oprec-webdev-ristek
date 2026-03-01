"use client";

import { useState, useEffect, useCallback } from "react"; 
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, FileText, Loader2 } from "lucide-react";
import QuestionEditor from "@/components/QuestionEditor";

interface Question {
  id: string;
  label: string;
  type: string;
  options?: string;
  required: boolean;
  _count?: { responses: number };
}

interface FormData {
  title: string;
  status: string;
  questions: Question[];
}

export default function FormDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchFormDetail = useCallback(async () => {
    if (!id) return;
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
  }, [id]);

  useEffect(() => {
    fetchFormDetail();
  }, [fetchFormDetail]);

  const handleDelete = async (questionId: string) => {
    if (!confirm("Hapus pertanyaan ini?")) return;
    
    try {
      const res = await fetch(`/api/questions/${questionId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchFormDetail();
      } else {
        const err = await res.json();
        alert(err.error || "Gagal menghapus");
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFB]">
        <Loader2 className="animate-spin text-purple-600 w-10 h-10" />
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFB] space-y-4">
        <p className="font-bold text-zinc-500">Form not found or access denied.</p>
        <Link href="/dashboard" className="text-purple-600 font-bold underline">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFB] font-sans pb-20">
      <div className="max-w-3xl mx-auto px-6 pt-10">
        
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-purple-600 mb-8 font-bold text-sm transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Kembali ke Dashboard
        </Link>

        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="h-2 bg-purple-600 w-full" />

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-12 border-b border-zinc-50 pb-8">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
                  {formData.title}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 mt-3 text-purple-600 border border-purple-100 bg-purple-50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    <Calendar size={12} /> {formData.status || "Draft"}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-purple-600">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase leading-none mb-1">Status Form</p>
                  <p className="text-sm font-bold text-zinc-700 leading-none">{formData.status}</p>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="bg-zinc-50/50 p-1 rounded-3xl ">
                <QuestionEditor formId={id as string} />
              </div>

              <div className="space-y-6">
                {formData.questions.map((q) => (
                  <div key={q.id} className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-zinc-800 uppercase tracking-wide">
                          {q.label} {q.required && <span className="text-red-500">*</span>}
                        </label>
                      </div>
                      {(q._count?.responses || 0) === 0 ? (
                        <button 
                          onClick={() => handleDelete(q.id)}
                          className="text-red-400 text-sm font-bold uppercase"
                        >
                          Hapus
                        </button>
                      ) : (
                        <span className="text-[9px] bg-zinc-100 text-zinc-400 px-2 py-1 rounded-md font-bold uppercase">Locked</span>
                      )}
                    </div>

                    <div className="w-full bg-zinc-50/30 border border-zinc-100 rounded-xl px-5 py-4">
                      {q.type === "multiple_choice" && q.options ? (
                        <RadioGroup defaultValue="">
                          {q.options.split(",").map((opt, i) => (
                            <div key={i} className="flex items-center space-x-3 mb-2">
                              <RadioGroupItem value={opt.trim()} id={`${q.id}-${i}`} />
                              <label htmlFor={`${q.id}-${i}`} className="text-sm text-zinc-600 cursor-pointer">{opt.trim()}</label>
                            </div>
                          ))}
                        </RadioGroup>
                      ) : q.type === "checkbox" && q.options ? (
                        <div className="space-y-3">
                          {q.options.split(",").map((opt, i) => (
                            <div key={i} className="flex items-center space-x-3">
                              <Checkbox id={`${q.id}-${i}`} />
                              <label htmlFor={`${q.id}-${i}`} className="text-sm text-zinc-600 cursor-pointer">{opt.trim()}</label>
                            </div>
                          ))}
                        </div>
                      ) : q.type === "dropdown" && q.options ? (
                        <Select>
                          <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Pilih jawaban..." />
                          </SelectTrigger>
                          <SelectContent>
                            {q.options.split(",").map((opt, i) => (
                              <SelectItem key={i} value={opt.trim()}>{opt.trim()}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <input 
                          type={q.type === "number" ? "number" : "text"}
                          disabled
                          className="w-full bg-transparent text-sm text-zinc-400 italic outline-none border-b border-zinc-100 pb-1"
                          placeholder={q.type === "number" ? "Contoh: 10" : "Jawaban teks singkat..."}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row justify-end items-center gap-4">
              <Button variant="ghost" className="rounded-xl px-8 font-bold text-zinc-400" asChild>
                <Link href="/dashboard">Tutup Preview</Link>
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-8 font-bold shadow-lg shadow-purple-100">
                Simpan Form
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}