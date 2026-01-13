"use client";
import { createNotice } from "@/app/action/noticeAction";
import React, { useState, useRef, useActionState} from "react";
import { ActionState } from "@/app/types/notice";
import SuccessModal from "@/components/notice/SuccessModel";
import {
  ChevronLeft,
  Paperclip,
  X,
  Check,
  ChevronDown,
  UploadCloud,
} from "lucide-react";
import { FormButtons } from "@/components/FromButton";

export default function CreateNotice() {
  const [noticeTypeOpen, setNoticeTypeOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);


  const [state, formAction] = useActionState<ActionState, FormData>(
    createNotice,
    null
  );

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



  const resetForm = () => {
    formRef.current?.reset();
    setSelectedTypes([]);
    setFileName("");
   
    window.location.reload();
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen p-4 ">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl border border-slate-200 text-slate-500"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-slate-800">
              Create a Notice
            </h1>
          </div>
        </div>

        <form action={formAction} ref={formRef} className="p-8">
          <p className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-wider">
            Please fill in the details below
          </p>

          <div className="space-y-8">
            <input
              type="hidden"
              name="noticeTypes"
              value={JSON.stringify(selectedTypes)}
            />

            {/* 1. Target Department */}
            <div className="bg-[#F8FAFF] p-6 rounded-2xl border border-[#E2E8F0]">
              <label className="text-[12px] font-bold text-slate-700 uppercase mb-3 block">
                <span className="text-red-500 mr-1">*</span> Target Department
                or Individual
              </label>
              <div className="relative">
                <select
                  name="targetDept"
                  required
                  className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select Department</option>
                  <option value="All Department">Global / Common</option>
                  <option value="Individual">Individual</option>
                  <option value="IT Support">IT Support</option>
                  <option value="Web Team">Web Team</option>
                  <option value="Finance">Finance</option>
                  <option value="Human Resource">Human Resource</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
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
                name="noticeTitle"
                required
                placeholder="Write the Title of Notice"
                className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm focus:border-[#FF5722] outline-none transition-all"
              />
            </div>

            {/* 3. Grid Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-700 uppercase block">
                  Employee ID
                </label>
                <input
                  name="employeeId"
                  placeholder="e.g. EMP-102"
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-700 uppercase block">
                  Employee Name
                </label>
                <input
                  name="employeeName"
                  placeholder="Full Name"
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-700 uppercase block">
                  Position
                </label>
                <input
                  name="position"
                  placeholder="e.g. UI/UX Designer"
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm outline-none"
                />
              </div>
            </div>

            {/* 4. Notice Type Multi-select */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-700 uppercase block">
                  Notice Type
                </label>
                <div
                  onClick={() => setNoticeTypeOpen(!noticeTypeOpen)}
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm text-slate-600 flex justify-between items-center cursor-pointer bg-white"
                >
                  <span className="truncate">
                    {selectedTypes.length > 0
                      ? selectedTypes.join(", ")
                      : "Select Notice Type"}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      noticeTypeOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {noticeTypeOpen && (
                  <div className="absolute left-0 top-[75px] w-full bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 p-3">
                    <div className="space-y-1 max-h-[250px] overflow-y-auto">
                      {noticeOptions.map((opt) => (
                        <div
                          key={opt}
                          onClick={() => handleToggleType(opt)}
                          className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer"
                        >
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              selectedTypes.includes(opt)
                                ? "bg-[#FF5722] border-[#FF5722]"
                                : "border-slate-200"
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
                    {selectedTypes.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTypes([]);
                          }}
                          className="w-full py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl flex items-center justify-center gap-2"
                        >
                          <X size={16} /> Clear Selection
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-700 uppercase block">
                  Publish Date
                </label>
                <input
                  type="date"
                  name="publishDate"
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm outline-none text-slate-600"
                />
              </div>
            </div>

            {/* 5. Description */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Notice Description
              </label>
              <textarea
                name="noticeDescription"
                rows={5}
                placeholder="Write the detailed notice content here..."
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-600"
                required
              />
            </div>

            {/* 6. File Upload */}
            <div className="mt-8">
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
                <UploadCloud
                  className="mx-auto text-emerald-400 mb-2"
                  size={32}
                />
                <p className="text-sm text-slate-600">
                  <span className="text-emerald-600 font-bold">
                    Click to upload
                  </span>{" "}
                  or drag and drop.
                </p>
              </div>
            </div>

            {fileName && (
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 w-fit">
                <Paperclip size={16} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-600">
                  {fileName}
                </span>
                <button
                  type="button"
                  onClick={() => setFileName("")}
                  className="text-red-400 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
          {state?.success === false && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <X size={18} className="text-red-600" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-bold uppercase tracking-wider">
                  Submission Error
                </p>
                <p className="text-sm font-medium">{state.message}</p>
              </div>
            </div>
          )}

          <FormButtons />
        </form>

        {/* PROPER MODAL LOGIC WITHOUT CASCADING RENDER */}
        {state?.success && (
          <SuccessModal
            noticeId={state._id || ""}
            noticeTitle={state.title || "Notice Published"}
            onClose={resetForm}
            resetForm={resetForm}
          />
        )}
      </div>
    </div>
  );
}
