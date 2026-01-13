// app/create-notice/loading.tsx
import { ChevronLeft } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100">
        
        {/* --- Header Skeleton --- */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-100 rounded-xl animate-pulse" />
          <div className="h-6 w-40 bg-slate-200 rounded-lg animate-pulse" />
        </div>

        {/* --- Form Body Skeleton --- */}
        <div className="p-8 space-y-8">
          <div className="h-4 w-64 bg-slate-100 rounded animate-pulse mb-4" />

          {/* 1. Target Dept Section */}
          <div className="h-28 w-full bg-[#F8FAFF] rounded-2xl border border-slate-100 animate-pulse" />

          {/* 2. Notice Title Section */}
          <div className="space-y-3">
            <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
            <div className="h-12 w-full bg-slate-50 rounded-xl border border-slate-100 animate-pulse" />
          </div>

          {/* 3. Grid Fields Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
                <div className="h-12 w-full bg-slate-50 rounded-xl border border-slate-100 animate-pulse" />
              </div>
            ))}
          </div>

          {/* 4. Description Skeleton */}
          <div className="space-y-3">
            <div className="h-3 w-32 bg-slate-100 rounded animate-pulse" />
            <div className="h-32 w-full bg-slate-50 rounded-xl border border-slate-100 animate-pulse" />
          </div>

          {/* 5. Upload Area Skeleton */}
          <div className="h-40 w-full bg-emerald-50/20 border-2 border-dashed border-emerald-100 rounded-2xl animate-pulse" />

          {/* Buttons Skeleton */}
          <div className="flex justify-end gap-4 pt-4">
            <div className="h-12 w-28 bg-slate-100 rounded-xl animate-pulse" />
            <div className="h-12 w-40 bg-orange-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}