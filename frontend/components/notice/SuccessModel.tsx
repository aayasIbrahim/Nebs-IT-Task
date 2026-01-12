"use client";

import { Check, Plus, Eye, X } from "lucide-react";
import Link from "next/link";

interface SuccessModalProps {
  noticeId: string;
  noticeTitle: string;
  onClose: () => void;
  resetForm: () => void;
}

export default function SuccessModal({ noticeId, noticeTitle, onClose, resetForm }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[6px] z-[999] flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-center relative animate-in zoom-in duration-300">
        
        {/* Close Icon (Top Right) */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Professional Animated Success Icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-25"></div>
          <div className="relative w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-200">
            <Check size={48} className="text-white stroke-[4px]" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3 mb-10">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Success! Notice Published</h2>
          <p className="text-slate-500 text-sm leading-relaxed px-4">
            The notice <span className="font-bold text-slate-800">{noticeTitle}</span> is now live for the selected departments.
          </p>
        </div>

        {/* Button Actions - Grouped Professionally */}
        <div className="space-y-3">
          {/* Primary Action: View Notice */}
          <Link
            href={`/notices/${noticeId}`}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#FF5722] transition-all duration-300 shadow-lg shadow-slate-200 group"
          >
            <Eye size={20} className="group-hover:scale-110 transition-transform" /> 
            View Published Notice
          </Link>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Secondary Action: Create Another */}
            <button
              onClick={resetForm}
              className="flex items-center justify-center gap-2 border-2 border-slate-100 text-slate-700 px-4 py-3.5 rounded-2xl font-bold hover:bg-slate-50 transition-all text-sm"
            >
              <Plus size={18} /> New Notice
            </button>

            {/* Ghost Action: Close */}
            <button
              onClick={onClose}
              className="flex items-center justify-center border-2 border-slate-100 text-slate-700 px-4 py-3.5 rounded-2xl font-bold hover:bg-slate-50 transition-all text-sm"
            >
              cancel
            </button>
          </div>
        </div>

        {/* Footer Meta */}
        <p className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Ref ID: {noticeId.slice(-8).toUpperCase()}
        </p>
      </div>
    </div>
  );
}