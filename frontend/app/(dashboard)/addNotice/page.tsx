"use client";
import { createNotice } from "@/app/action/noticeAction";
import React, { useState, useRef } from "react";
import SuccessModal from "@/components/notice/SuccessModel";
import {
  ChevronLeft,
  Paperclip,
  X,
  Check,
  ChevronDown,
  UploadCloud,
} from "lucide-react";

export default function CreateNotice() {
  const [noticeTypeOpen, setNoticeTypeOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdNoticeData, setCreatedNoticeData] = useState({
    id: "",
    title: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  interface ActionResponse {
    success: boolean;
    _id?: string;
    message?: string;
  }
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
  const handleSubmit = async (formData: FormData) => {
    try {
      const result = (await createNotice(
        formData
      )) as unknown as ActionResponse;

      if (result && result.success) {
        setCreatedNoticeData({
          id: result._id || "",

          title: (formData.get("noticeTitle") as string) || "Notice Published",
        });

        setShowSuccess(true);
      } else {
        alert(result?.message || "Failed to create notice. Please try again.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("An unexpected error occurred while connecting to the server.");
    }
  };
  const resetForm = () => {
    setShowSuccess(false);
    window.location.reload();
  };
  return (
    <div className="bg-[#F8FAFC] min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100">
        {/* --- Header Section --- */}
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

        {/* --- Form Body --- */}
        {/* Note: Server action works with FormData */}
        <form action={handleSubmit} className="p-8">
          <p className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-wider">
            Please fill in the details below
          </p>

          <div className="space-y-8">
            {/* Hidden Inputs for Custom States */}
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
                  required // ভ্যালিডেশন নিশ্চিত করতে
                  className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select Department</option>

                  {/* ভ্যালু এবং টেক্সট ঠিক করা হয়েছে */}
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

            {/* 3. Triple Grid (ID, Name, Position) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-700 uppercase block">
                  <span className="text-red-500 mr-1">*</span> Select Employee
                  ID
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
                  <div className="absolute left-0 top-[75px] w-full bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 p-3 flex flex-col">
                    {/* অপশন লিস্ট */}
                    <div className="space-y-1 max-h-[250px] overflow-y-auto">
                      {noticeOptions.map((opt) => (
                        <div
                          key={opt}
                          onClick={() => handleToggleType(opt)}
                          className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer group"
                        >
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
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

                    {/* Cancel/Clear All Section */}
                    {selectedTypes.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // ড্রপডাউন ক্লোজ হওয়া বন্ধ করবে
                            setSelectedTypes([]); // স্টেট ক্লিয়ার করার ফাংশন
                          }}
                          className="w-full py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-colors flex items-center justify-center gap-2"
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
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Notice Description
              </label>
              <textarea
                name="noticeDescription"
                rows={5}
                placeholder="Write the detailed notice content here..."
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-sm text-gray-600"
                required
              ></textarea>
            </div>

            {/* 5. Upload Box */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase text-[12px]">
                Upload Attachment
              </h3>
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
                <p className="text-[10px] text-slate-400 mt-1 uppercase">
                  JPG, PNG or PDF (Max 5MB)
                </p>
              </div>
            </div>

            {/* 6. Selected File Show */}
            {fileName && (
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 w-fit animate-in fade-in zoom-in duration-200">
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

          {/* --- Footer Buttons --- */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              className="px-8 py-3 rounded-full border border-slate-300 text-sm font-bold text-slate-500 hover:bg-slate-50"
            >
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
        {/* --- Success Modal Integration --- */}
        {showSuccess && (
          <SuccessModal
            noticeId={createdNoticeData.id}
            noticeTitle={createdNoticeData.title}
            onClose={() => setShowSuccess(false)}
            resetForm={resetForm}
          />
        )}
      </div>
    </div>
  );
}
