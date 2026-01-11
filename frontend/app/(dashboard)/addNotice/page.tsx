"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  Calendar,
  Paperclip,
  X,
  Check,
  ChevronDown,
} from "lucide-react";

export default function CreateNotice() {
  const [noticeTypeOpen, setNoticeTypeOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const noticeOptions = [
    "Warning / Disciplinary",
    "Performance Improvement",
    "Appreciation / Recognitio",
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

  return (
    <div className=" bg-[#F8FAFC] min-h-screen">
      <div className="max-w-5xl  bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-visible">
        {/* --- Header Section --- */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between relative">
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl border border-slate-200 text-slate-500 transition-all">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-slate-800">
              Create a Notice
            </h1>
          </div>
        </div>

        {/* --- Form Body --- */}
        <div className="p-8">
          <p className="text-sm font-bold text-slate-500 mb-8">
            Please fill in the details below
          </p>

          <div className="space-y-8">
            {/* 1. Target Department Box */}
            <div className="bg-[#F8FAFF] p-6 rounded-2xl border border-[#E2E8F0]">
              <label className="text-[12px] font-bold text-slate-700 uppercase mb-3 block">
                <span className="text-red-500 mr-1">*</span> Target
                Department(s) or Individual
              </label>
              <div className="relative">
                <select className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm text-sky-500 font-semibold focus:outline-none appearance-none cursor-pointer">
                  <option>Individual</option>
                  <option>Finance</option>
                  <option>Web Team</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-3.5 text-slate-400 pointer-events-none"
                  size={18}
                />
              </div>
            </div>

            {/* 2. Notice Title */}
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-slate-700 uppercase block">
                <span className="text-red-500 mr-1">*</span> Notice Title
              </label>
              <input
                type="text"
                placeholder="Write the Title of Notice"
                className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 placeholder:text-slate-300 transition-all"
              />
            </div>

            {/* 3. Triple Grid (ID, Name, Position) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-700 uppercase block leading-relaxed">
                  <span className="text-red-500 mr-1">*</span> Select Employee
                  ID
                </label>
                <div className="relative">
                  <select className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm text-slate-400 appearance-none focus:outline-none">
                    <option>Select employee designation</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-3.5 text-slate-400"
                    size={18}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-700 uppercase block leading-relaxed">
                  <span className="text-red-500 mr-1">*</span> Employee Name
                </label>
                <input
                  type="text"
                  placeholder="Enter employee full name"
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-700 uppercase block leading-relaxed">
                  <span className="text-red-500 mr-1">*</span> Position
                </label>
                <input
                  type="text"
                  placeholder="Select employee department"
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* 4. Notice Type & Publish Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-700 uppercase block leading-relaxed">
                  <span className="text-red-500 mr-1">*</span> Notice Type
                </label>
                <div
                  onClick={() => setNoticeTypeOpen(!noticeTypeOpen)}
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm text-slate-400 flex justify-between items-center cursor-pointer bg-white"
                >
                  <span>
                    {selectedTypes.length > 0
                      ? `${selectedTypes.length} Selected`
                      : "Select Notice Type"}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      noticeTypeOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* --- Custom Multiselect Dropdown --- */}
                {noticeTypeOpen && (
                  <div className="absolute left-0 top-[80px] w-full bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 p-3 space-y-1 animate-in fade-in slide-in-from-top-4 duration-200">
                    {noticeOptions.map((opt) => (
                      <div
                        key={opt}
                        onClick={() => handleToggleType(opt)}
                        className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer group transition-colors"
                      >
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            selectedTypes.includes(opt)
                              ? "bg-[#FF5722] border-[#FF5722]"
                              : "border-slate-200 group-hover:border-orange-400"
                          }`}
                        >
                          {selectedTypes.includes(opt) && (
                            <Check
                              size={12}
                              className="text-white stroke-[4px]"
                            />
                          )}
                        </div>
                        <span className="text-sm text-slate-600 font-medium">
                          {opt}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-700 uppercase block leading-relaxed">
                  <span className="text-red-500 mr-1">*</span> Publish Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select Publishing Date"
                    className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm outline-none"
                  />
                  <Calendar
                    className="absolute right-4 top-3.5 text-slate-400"
                    size={18}
                  />
                </div>
              </div>
            </div>

            {/* 5. Upload Box */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-slate-700 mb-3">Upload</h3>
              <div className="border-2 border-dashed border-emerald-300 rounded-2xl p-12 bg-emerald-50/20 text-center cursor-pointer group hover:bg-emerald-50/40 transition-all">
                <p className="text-sm text-slate-600">
                  <span className="text-emerald-500 font-bold">Upload</span>{" "}
                  nominee profile image or drag and drop.
                </p>
                <p className="text-[11px] text-slate-400 mt-1 uppercase font-semibold">
                  Accepted File Type: jpg, png
                </p>
              </div>
            </div>

            {/* 6. Attached File Tag */}
            <div className="flex items-center gap-3 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 w-fit">
              <Paperclip size={16} className="text-slate-400 rotate-45" />
              <span className="text-xs font-bold text-slate-600">
                Policy_Document.pdf
              </span>
              <button className="text-red-400 hover:text-red-600 transition-colors ml-1">
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* --- Footer Buttons --- */}
        <div className="p-4 sm:p-6 lg:p-8 border-t border-slate-100">
          <div
            className="
    flex flex-col gap-3
    sm:flex-row sm:flex-wrap sm:justify-end sm:items-center
  "
          >
            {/* Cancel */}
            <button
              className="
        w-full sm:w-auto
        px-6 sm:px-8 lg:px-10
        py-3
        rounded-full
        border border-slate-400
        text-sm font-bold text-slate-500
        hover:bg-slate-50 transition
      "
            >
              Cancel
            </button>

            {/* Save Draft */}
            <button
              className="
        w-full sm:w-auto
        px-6 sm:px-8 lg:px-10
        py-3
        rounded-full
        border border-blue-200 bg-blue-50
        text-sm font-bold text-blue-500
        hover:bg-blue-100 transition
      "
            >
              Save as Draft
            </button>

            {/* Publish */}
            <button
              className="
        w-full sm:w-auto
        px-6 sm:px-8 lg:px-10
        py-3
        rounded-full
        bg-[#FF5722]
        text-sm font-bold text-white
        shadow-lg shadow-orange-200
        hover:bg-[#E64A19]
        transition
        flex items-center justify-center gap-2
      "
            >
              <Check size={18} strokeWidth={3} />
              Publish Notice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}