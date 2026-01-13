// app/not-found.tsx
import Link from "next/link";
import { Construction, ArrowLeft, Clock } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* অ্যানিমেটেড আইকন সেকশন */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-orange-100 blur-3xl rounded-full opacity-40 animate-pulse" />
          <div className="relative w-24 h-24 bg-white rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center">
            <Construction size={48} className="text-[#FF5722] animate-bounce" />
          </div>
          {/* ছোট ঘড়ির আইকন যা ওয়েটিং বুঝাবে */}
          <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-50">
            <Clock size={20} className="text-slate-400 animate-spin-slow" />
          </div>
        </div>

        {/* মেসেজ সেকশন */}
        <div className="space-y-3">
          <div className="inline-block px-4 py-1.5 bg-orange-50 rounded-full">
            <span className="text-xs font-bold text-[#FF5722] uppercase tracking-widest">
              Under Construction
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-800">Coming Soon!</h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            We are working hard to bring this page to life. <br />
            Stay tuned for something amazing!
          </p>
        </div>

        {/* অ্যাকশন বাটন */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF5722] text-white rounded-2xl font-bold shadow-lg shadow-orange-100 hover:bg-[#F4511E] hover:shadow-orange-200 transition-all group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
        </div>

        {/* প্রগ্রেস বার (ডিজাইনের জন্য) */}
        <div className="pt-8 space-y-2">
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            <span>Development Progress</span>
            <span>75%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-[75%] h-full bg-[#FF5722] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}