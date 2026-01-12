
"use client";

import { Notice } from "@/app/types/notice";

interface StatusTogglePopupProps {
  notice: Notice;
  onToggle: () => void;
  isMobile?: boolean;
}

export default function StatusTogglePopup({
  notice,
  onToggle,
  isMobile = false,
}: StatusTogglePopupProps) {
  return (
    <div
      className={`absolute ${
        isMobile ? "left-0 top-8" : "right-0 top-12"
      } z-50 bg-white shadow-2xl border border-gray-100 rounded-xl p-3 flex items-center gap-4 min-w-[160px]`}
    >
      <span className="text-sm font-bold text-slate-700">
        {notice.status}
      </span>

      <button
        onClick={onToggle}
        className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${
          notice.status === "Published" ? "bg-green-500" : "bg-slate-700"
        }`}
      >
        <div
          className={`absolute top-1 bg-white w-4 h-4 rounded-full shadow-md transition-all duration-300 ${
            notice.status === "Published" ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
