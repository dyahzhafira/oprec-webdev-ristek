"use client"

import Link from "next/link";
import { FileText, ChevronRight, Users, Activity } from "lucide-react";

interface FormCardProps {
  id: string;
  title: string;
  responses: number;
  status: "Published" | "Draft" | "Closed";
  lastActivity: string;
}

export default function FormCard({ id, title, responses, status, lastActivity }: FormCardProps) {
  const statusStyles = {
    Published: "bg-purple-50 text-ristek-purple",
    Draft: "bg-purple-50 text-zinc-500 ",
    Closed: "bg-purple-50 text-red-400 ", 
  };

  return (
    <Link href={`/form/${id}`} className="group block">
      <div className="bg-white border border-zinc-100 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-8" 
           style={{ borderLeftColor: status === 'Published' ? '#6366f1' : '#e4e4e7' }}>
        
        <div className="flex gap-5 items-center">
          <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400">
            <FileText size={28} />
          </div>


          <div className="space-y-1">
            <h3 className="font-bold text-2xl text-zinc-900 group-hover:text-ristek-purple transition-colors">
              {title}
            </h3>
            <div className="flex flex-col md:flex-wrap gap-2 mt-2">
              <span className="text-sm text-zinc-400 flex  items-center gap-2">
                <Users size={14} className="text-ristek-purple" /> {responses} Responses
              </span>
              
              <span className="text-sm text-zinc-400  flex gap-2 items-center">
                <Activity size={14} /> Edited {lastActivity}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6 border-t-2 border-t-zinc-300 md:border-t-0 pt-4 md:pt-0">
          <div className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase ${statusStyles[status]}`}>
            {status}
          </div>
          
          <div className="flex items-center gap-2 text-ristek-purple font-bold text-sm uppercase opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex">
            Manage <ChevronRight size={14}  />
          </div>

          <ChevronRight className="w-5 h-5 text-zinc-500 md:hidden" />
        </div>
      </div>
    </Link>
  );
}