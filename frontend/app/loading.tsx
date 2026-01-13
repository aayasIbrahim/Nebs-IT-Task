// app/loading.tsx
import React from "react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6 text-center">
        
        {/* --- Animation Logo/Icon --- */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute h-full w-full animate-spin rounded-full border-4 border-slate-100 border-t-[#FF5722] duration-1000" />
          
          {/* Inner Pulsing Circle */}
          <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-orange-50">
             <div className="h-8 w-8 rounded-full bg-[#FF5722] shadow-[0_0_20px_rgba(255,87,34,0.4)]" />
          </div>
        </div>

        {/* --- Text Message --- */}
        <div className="space-y-2">
          <h2 className="text-[50px] font-black tracking-tight text-slate-800">
            Nebs <span className="text-[#FF5722]">IT</span>
          </h2>
          <div className="flex items-center gap-2 font-bold text-slate-400">
             <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#FF5722]" style={{ animationDelay: '0ms' }} />
             <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#FF5722]" style={{ animationDelay: '200ms' }} />
             <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#FF5722]" style={{ animationDelay: '400ms' }} />
             <span className="ml-2 text-[10px] uppercase tracking-[0.3em]">Preparing Content</span>
          </div>
        </div>

      </div>
    </div>
  );
}