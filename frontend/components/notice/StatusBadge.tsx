// components/notice/StatusBadge.tsx
"use client";

import { StatusBadgeProps } from "@/app/types/notice";
export default function StatusBadge({ notice, onClick }: StatusBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-tight transition-all
        ${
          notice.status === "Published"
            ? "bg-green-100 text-green-600"
            : notice.status === "Draft"
            ? "bg-orange-100 text-orange-600"
            : "bg-gray-100 text-gray-600"
        }`}
    >
      {notice.status}
    </button>
  );
}
