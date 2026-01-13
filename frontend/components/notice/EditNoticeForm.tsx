"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updateNoticeAction } from "@/app/action/noticeAction"; 
import { Notice } from "@/app/types/notice";
import { 
  
  CheckCircle2, AlertCircle,  X, Upload, Plus
} from "lucide-react";

export default function EditNoticeForm({ notice }: { notice: Notice }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Notice Type-এর জন্য স্টেট (ট্যাগ সিস্টেম)
  const [noticeTypes, setNoticeTypes] = useState<string[]>(
    Array.isArray(notice.noticeType) ? notice.noticeType : [notice.noticeType].filter(Boolean)
  );
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() && !noticeTypes.includes(newTag.trim())) {
      setNoticeTypes([...noticeTypes, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNoticeTypes(noticeTypes.filter(tag => tag !== tagToRemove));
  };

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    
    
    formData.delete("noticeType");
    noticeTypes.forEach(type => formData.append("noticeType", type));

    const result = await updateNoticeAction(notice._id, formData);
    console.log("Update Result:", result);

    if (result.success) {
      router.push(`/notices/${notice._id}`);
      router.refresh();
    } else {
      alert(result.error || "Update failed");
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* Header Info Card */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-yellow-600 to-yellow-700 p-6 rounded-[2rem] text-white shadow-lg shadow-blue-200/50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
            <AlertCircle size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">Modify Notice</h2>
            <p className="text-blue-100 text-xs font-medium">Updating: {notice.noticeTitle}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 px-4 py-2 bg-black/10 backdrop-blur-sm rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-[0.2em]">
          Ref ID: {notice._id?.slice(-10)}
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 space-y-12">
        
        {/* Section 1: Title & Tags */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 text-slate-800 font-black uppercase text-xs tracking-widest">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-900 text-white text-[10px]">1</span>
            Basic Classification
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notice Title</label>
              <input
                type="text"
                name="noticeTitle"
                defaultValue={notice.noticeTitle}
                className="w-full h-16 px-6 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700 text-lg shadow-sm"
                required
              />
            </div>

            {/* Notice Type Tag UI */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notice Categories (Tags)</label>
              <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                {noticeTypes.map((tag) => (
                  <span key={tag} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 shadow-sm">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="text-slate-400 hover:text-red-500">
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <div className="flex items-center gap-2 ml-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag..."
                    className="bg-transparent outline-none text-xs font-bold w-24"
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                  />
                  <button type="button" onClick={addTag} className="p-1 hover:bg-slate-200 rounded-md transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Distribution Details */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 text-slate-800 font-black uppercase text-xs tracking-widest">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-white text-[10px]">2</span>
            Targeting & Distribution
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Department</label>
              <select
                name="targetDept"
                defaultValue={notice.targetDept}
                className="w-full h-16 px-6 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-600 appearance-none shadow-sm cursor-pointer"
              >
                <option value="All Department">All Department</option>
                <option value="IT Support">IT Support</option>
                <option value="Web Team">Web Team</option>
                <option value="Finance">Finance</option>
                <option value="Human Resource">Human Resource</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Publish Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="publishDate"
                  defaultValue={notice.publishDate ? notice.publishDate.split('T')[0] : ""}
                  className="w-full h-16 px-6 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-600 shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Content & Files */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 text-slate-800 font-black uppercase text-xs tracking-widest">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-600 text-white text-[10px]">3</span>
            Notice Body & Attachments
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Description</label>
            <textarea
              name="noticeDescription"
              defaultValue={notice.noticeDescription}
              rows={8}
              className="w-full p-8 bg-slate-50 rounded-[2.5rem] outline-none focus:ring-2 focus:ring-blue-500/20 resize-none font-bold text-slate-600 leading-relaxed shadow-sm"
              placeholder="Enter full notice content..."
            ></textarea>
          </div>

          {/* Attachment Upload (Optional functionality) */}
          <div className="p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 group hover:border-blue-400 transition-colors">
            <label className="flex flex-col items-center justify-center cursor-pointer gap-2">
              <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <Upload size={20} className="text-blue-500" />
              </div>
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Replace Attachment</span>
              <span className="text-[10px] text-slate-400 font-bold italic">Current: {notice.attachmentUrl ? "document_attached.pdf" : "No file"}</span>
              <input type="file" name="attachment" className="hidden" />
            </label>
          </div>
        </div>

        {/* Visibility Switcher */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-50">
           <div className="space-y-1 text-center md:text-left">
              <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest">Publishing Status</h4>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.1em]">Switch between public and private view</p>
           </div>
           <div className="flex bg-slate-100 p-2 rounded-[1.5rem] w-full md:w-auto shadow-inner">
              {["Published", "Draft"].map((status) => (
                <label key={status} className="flex-1 md:w-36 cursor-pointer group">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    defaultChecked={notice.status === status}
                    className="hidden peer"
                  />
                  <div className="text-center py-4 rounded-2xl peer-checked:bg-white peer-checked:text-yellow-600 peer-checked:shadow-md transition-all font-black text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-slate-500">
                    {status}
                  </div>
                </label>
              ))}
           </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-10 h-20 bg-white border-2 border-slate-100 rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95"
        >
          Discard
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 h-20 bg-yellow-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-yellow-600 transition-all flex items-center justify-center gap-4 shadow-xl shadow-yellow-200 active:scale-95 disabled:bg-slate-300"
        >
          {loading ? "Syncing..." : (
            <>
              <CheckCircle2 size={20} />
              Push Updates to Notice
            </>
          )}
        </button>
      </div>
    </form>
  );
}