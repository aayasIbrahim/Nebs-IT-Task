"use client";

import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Plus, PencilLine, ChevronDown, RotateCcw } from "lucide-react";

interface NoticeHeaderProps {
  activeCount: number;
  draftCount: number;
}

const NoticeHeader = ({ activeCount, draftCount }: NoticeHeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleDraftToggle = () => {
    const currentStatus = searchParams.get("status");
    if (currentStatus === "Draft") {
      handleFilterChange("status", "");
    } else {
      handleFilterChange("status", "Draft");
    }
  };

  const resetFilters = () => {
    router.push(pathname);
  };
  const isFiltered = searchParams.toString() !== "";

  return (
    <div className="w-full bg-white p-4 md:p-6 rounded-t-xl border-x border-t border-gray-100 font-sans shadow-sm">
      {/* Top Row: Title & Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
            Notice Management
          </h1>
          <div className="flex items-center gap-3 mt-2 text-sm font-semibold">
            <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded uppercase text-[11px]">
              Active: {activeCount}
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-amber-500 bg-amber-50 px-2 py-0.5 rounded uppercase text-[11px]">
              Draft: {draftCount}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/addNotice"
            className="flex items-center justify-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white px-5 py-2.5 rounded-lg font-bold shadow-md active:scale-95 transition-all"
          >
            <Plus size={20} /> Create Notice
          </Link>
          <button
            onClick={handleDraftToggle}
            className={`flex items-center justify-center gap-2 border px-5 py-2.5 rounded-lg font-bold active:scale-95 transition-all ${
              searchParams.get("status") === "Draft"
                ? "bg-amber-500 border-amber-500 text-white shadow-inner"
                : "border-amber-400 text-amber-500 hover:bg-amber-50"
            }`}
          >
            <PencilLine size={18} /> All Draft
          </button>
        </div>
      </div>

      {/* Bottom Row: Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center gap-4 text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:flex-row items-center gap-3 w-full">
          {/* Dept Filter */}
          <div className="relative w-full xl:min-w-[220px]">
            <select
              className="w-full appearance-none bg-slate-50 border border-slate-200 py-2.5 pl-4 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={searchParams.get("targetDept") || ""}
              onChange={(e) => handleFilterChange("targetDept", e.target.value)}
            >
              <option value="">Select Department</option>
              <option value="All Department">Global / Common</option>
              <option value="IT Support">IT Support</option>
              <option value="Web Team">Web Team</option>
              <option value="Finance">Finance</option>
              <option value="Human Resource">Human Resource</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by Title..."
            className="w-full bg-slate-50 border border-slate-200 py-2.5 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all xl:w-64"
            defaultValue={searchParams.get("search") || ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />

          {/* Status Filter */}
          <div className="relative w-full xl:w-44">
            <select
              className="w-full appearance-none bg-slate-50 border border-slate-200 py-2.5 pl-4 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchParams.get("status") || ""}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Published">Published</option>
              <option value="Unpublished">Unpublished</option>
              <option value="Draft">Draft</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          {/* Reset Button */}
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="xl:ml-auto flex items-center justify-center gap-2 text-rose-500 bg-rose-50 hover:bg-rose-100 px-5 py-2.5 rounded-lg font-bold transition-all border border-rose-100 animate-in fade-in slide-in-from-right-2"
            >
              <RotateCcw size={16} /> Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeHeader;
