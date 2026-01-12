"use client";
import { createNotice } from "@/app/action/noticeAction";
import React, { useState, useRef } from "react";
import { 
  ChevronLeft,  Paperclip, X, Check, ChevronDown, UploadCloud 
} from "lucide-react";

export default function CreateNotice() {
  const [noticeTypeOpen, setNoticeTypeOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const noticeOptions = [
    "Warning / Disciplinary",
    "Performance Improvement",
    "Appreciation / Recognition",
    "Attendance / Leave Issue",
    "Payroll / Compensation",
    "Contract / Role Update",
    "Advisory / Personal Reminder",
  ];

  const handleToggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100">
        
        {/* --- Header Section --- */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button type="button" className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-slate-800">Create a Notice</h1>
          </div>
        </div>

        {/* --- Form Body --- */}
        {/* Note: Server action works with FormData */}
        <form action={createNotice} className="p-8">
          <p className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-wider">
            Please fill in the details below
          </p>

          <div className="space-y-8">
            {/* Hidden Inputs for Custom States */}
            <input type="hidden" name="noticeTypes" value={JSON.stringify(selectedTypes)} />

            {/* 1. Target Department */}
            <div className="bg-[#F8FAFF] p-6 rounded-2xl border border-[#E2E8F0]">
              <label className="text-[12px] font-bold text-slate-700 uppercase mb-3 block">
                <span className="text-red-500 mr-1">*</span> Target Department or Individual
              </label>
              <div className="relative">
                <select
                  name="target"
                  className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="Individual">Individual</option>
                  <option value="Finance">Finance</option>
                  <option value="Web Team">Web Team</option>
                  <option value="HR">HR Department</option>
                </select>
                <ChevronDown className="absolute right-4 top-3.5 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>

            {/* 2. Notice Title */}
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-slate-700 uppercase block">
                <span className="text-red-500 mr-1">*</span> Notice Title
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="Write the Title of Notice"
                className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm focus:border-[#FF5722] outline-none transition-all"
              />
            </div>

            {/* 3. Triple Grid (ID, Name, Position) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-700 uppercase block">
                  <span className="text-red-500 mr-1">*</span> Select Employee ID
                </label>
                <input
                  name="employeeId"
                  placeholder="e.g. EMP-102"
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-700 uppercase block">
                  <span className="text-red-500 mr-1">*</span> Employee Name
                </label>
                <input
                  type="text"
                  name="employeeName"
                  placeholder="Full Name"
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-700 uppercase block">
                  <span className="text-red-500 mr-1">*</span> Position
                </label>
                <input
                  name="position"
                  type="text"
                  placeholder="e.g. UI/UX Designer"
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm outline-none"
                />
              </div>
            </div>

            {/* 4. Notice Type & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-700 uppercase block">
                  <span className="text-red-500 mr-1">*</span> Notice Type
                </label>
                <div
                  onClick={() => setNoticeTypeOpen(!noticeTypeOpen)}
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm text-slate-600 flex justify-between items-center cursor-pointer bg-white"
                >
                  <span className="truncate">
                    {selectedTypes.length > 0 ? selectedTypes.join(", ") : "Select Notice Type"}
                  </span>
                  <ChevronDown size={18} className={`transition-transform ${noticeTypeOpen ? "rotate-180" : ""}`} />
                </div>

                {noticeTypeOpen && (
                  <div className="absolute left-0 top-[75px] w-full bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 p-3 space-y-1">
                    {noticeOptions.map((opt) => (
                      <div
                        key={opt}
                        onClick={() => handleToggleType(opt)}
                        className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer group"
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedTypes.includes(opt) ? "bg-[#FF5722] border-[#FF5722]" : "border-slate-200"}`}>
                          {selectedTypes.includes(opt) && <Check size={12} className="text-white stroke-[4px]" />}
                        </div>
                        <span className="text-sm text-slate-600">{opt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-700 uppercase block">
                  <span className="text-red-500 mr-1">*</span> Publish Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="publishDate"
                    className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm outline-none text-slate-600"
                  />
                </div>
              </div>
            </div>

            {/* 5. Upload Box */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase text-[12px]">Upload Attachment</h3>
              <input 
                type="file" 
                name="attachment" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-emerald-200 rounded-2xl p-10 bg-emerald-50/10 text-center cursor-pointer hover:bg-emerald-50/30 transition-all"
              >
                <UploadCloud className="mx-auto text-emerald-400 mb-2" size={32} />
                <p className="text-sm text-slate-600">
                  <span className="text-emerald-600 font-bold">Click to upload</span> or drag and drop.
                </p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase">JPG, PNG or PDF (Max 5MB)</p>
              </div>
            </div>

            {/* 6. Selected File Show */}
            {fileName && (
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 w-fit animate-in fade-in zoom-in duration-200">
                <Paperclip size={16} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-600">{fileName}</span>
                <button type="button" onClick={() => setFileName("")} className="text-red-400 hover:text-red-600">
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* --- Footer Buttons --- */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3">
            <button type="button" className="px-8 py-3 rounded-full border border-slate-300 text-sm font-bold text-slate-500 hover:bg-slate-50">
              Cancel
            </button>
            
            {/* Action based Buttons */}
            <button 
              name="status" 
              value="Draft" 
              className="px-8 py-3 rounded-full border border-blue-200 bg-blue-50 text-sm font-bold text-blue-500 hover:bg-blue-100"
            >
              Save as Draft
            </button>
            
            <button 
              name="status" 
              value="Published" 
              className="px-8 py-3 rounded-full bg-[#FF5722] text-sm font-bold text-white shadow-lg shadow-orange-100 hover:bg-[#E64A19] flex items-center justify-center gap-2"
            >
              <Check size={18} strokeWidth={3} />
              Publish Notice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}