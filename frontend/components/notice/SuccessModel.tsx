// @/components/notice/SuccessModal.tsx
"use client";

import { Check, Plus, Eye,  } from "lucide-react";
import Link from "next/link";

interface SuccessModalProps {
  noticeId: string;
  noticeTitle: string;
  onClose: () => void;
  resetForm: () => void;
}

export default function SuccessModal({ noticeId, noticeTitle, onClose, resetForm }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative animate-in zoom-in duration-300">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
          <Check size={40} className="text-white stroke-[4px]" />
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Notice Published Successfully</h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          Your notice <span className="font-semibold text-slate-700">{noticeTitle}</span> has been published and is now visible to all selected departments.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/notices/${noticeId}`}
            className="flex items-center justify-center gap-2 border border-blue-200 text-blue-600 px-6 py-2.5 rounded-full font-bold hover:bg-blue-50 transition-all text-sm"
          >
            <Eye size={18} /> View Notice
          </Link>
          
          <button
            onClick={resetForm}
            className="flex items-center justify-center gap-2 border border-orange-200 text-[#FF5722] px-6 py-2.5 rounded-full font-bold hover:bg-orange-50 transition-all text-sm"
          >
            <Plus size={18} /> Create Another
          </button>

          <button
            onClick={onClose}
            className="flex items-center justify-center border border-slate-200 text-slate-600 px-6 py-2.5 rounded-full font-bold hover:bg-slate-50 transition-all text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}