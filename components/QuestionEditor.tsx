"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function QuestionEditor({ formId }: { formId: string }) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("text");
  const [loading, setLoading] = useState(false);
  const [required, setRequired] = useState(false);
  const [options, setOptions] = useState("");

  const handleAdd = async () => {
    if (!label) return alert("Label tidak boleh kosong!");
    
    setLoading(true);
    try {
      const res = await fetch(`/api/forms/${formId}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label,
          type,
          required,
          options,
        }),
      });

      if (res.ok) {
        setLabel("");
        setOptions("");
        setRequired(false);
        alert("Pertanyaan berhasil ditambahkan!");
        window.location.reload(); 
      } else {
        const err = await res.json();
        alert(err.error || "Gagal menambah pertanyaan");
      }
    } catch (error) {
      alert("Koneksi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 rounded-xl w-full bg-white shadow-sm">
      <h3 className="font-bold text-zinc-800">Add New Question</h3>
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Write your question here!"
        className="w-full p-2 rounded-lg text-bold outline-none focus:ring-2 focus:ring-purple-500"
      />

      <div className="flex gap-3 items-center">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 rounded-lg bg-zinc-50 text-sm"
        >
          <option value="text" >Text</option>
          <option value="number">Number</option>
          <option value="multiple_choice">Multiple chocice</option>
          <option value="checkbox">Checkbox</option>
          <option value="dropdown">Dropdown</option>
        </select>

        <label className="flex items-center gap-2 text-sm font-bold text-zinc-600 cursor-pointer">
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
            className="w-4 h-4"
          />
          Required
        </label>
      </div>

      {["multiple_choice", "checkbox", "dropdown"].includes(type) && (
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-purple-600 uppercase">Input Opsi</p>
          <input
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            placeholder="Opsi (pisahkan dengan koma, cth: Pria, Wanita)"
            className="w-full p-2 border border-purple-200 bg-purple-50 rounded-lg text-black outline-none"
          />
        </div>
      )}

      <Button
        onClick={handleAdd}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
      >
        {loading ? "Saving..." : "Save Question"}
      </Button>
    </div>
  );
}