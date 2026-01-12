"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updateNoticeAction } from "@/app/action/noticeAction"; 
import { Notice } from "@/app/types/notice";
import { Calendar, User, Briefcase, Hash, Info, Tag, CheckCircle2 } from "lucide-react";

export default function EditNoticeForm({ notice }: { notice: Notice }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const id = notice._id;
    
    // সার্ভার অ্যাকশন কল করা
    const result = await updateNoticeAction(id, formData);

    if (result.success) {
      router.push(`/notice-board/${id}`); // এডিট শেষে ডিটেইলস পেজে নিয়ে যাবে
      router.refresh();
    } else {
      alert(result.error || "Update failed");
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-8">
        
        <div className="flex items-center gap-2 border-b pb-4">
          <Info className="text-blue-500" size={20} />
          <h2 className="text-lg font-bold text-gray-800">Edit Notice Information</h2>
        </div>

        {/* 1. Notice Title */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <Tag size={14} /> Notice Title
          </label>
          <input
            type="text"
            name="noticeTitle"
            defaultValue={notice.noticeTitle}
            className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
        </div>

        {/* 2. Employee Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
              <Hash size={14} /> Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              defaultValue={notice.employeeId}
              className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
              <User size={14} /> Employee Name
            </label>
            <input
              type="text"
              name="employeeName"
              defaultValue={notice.employeeName}
              className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
              <Briefcase size={14} /> Position
            </label>
            <input
              type="text"
              name="position"
              defaultValue={notice.position}
              className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 3. Dept & Date Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Target Department</label>
            <select
              name="targetDept"
              defaultValue={notice.targetDept}
              className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="All Department">Global / All Department</option>
              <option value="IT Support">IT Support</option>
              <option value="Web Team">Web Team</option>
              <option value="Finance">Finance</option>
              <option value="Human Resource">Human Resource</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
              <Calendar size={14} /> Publish Date
            </label>
            <input
              type="date"
              name="publishDate"
              defaultValue={notice.publishDate ? notice.publishDate.split('T')[0] : ""}
              className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 4. Description */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase">Notice Description</label>
          <textarea
            name="noticeDescription"
            defaultValue={notice.noticeDescription}
            rows={6}
            className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Write details..."
          ></textarea>
        </div>

        {/* 5. Status Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
          <div className="flex gap-4">
            {["Published", "Draft"].map((status) => (
              <label key={status} className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value={status}
                  defaultChecked={notice.status === status}
                  className="hidden peer"
                />
                <div className="text-center p-3 border rounded-xl peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600 transition-all font-semibold text-sm text-gray-500">
                  {status}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 h-14 bg-white border border-gray-300 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-[2] h-14 bg-slate-900 text-white rounded-2xl font-bold hover:bg-[#FF5722] disabled:bg-gray-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
        >
          {loading ? "Saving Changes..." : <><CheckCircle2 size={20} /> Update Notice</>}
        </button>
      </div>
    </form>
  );
}