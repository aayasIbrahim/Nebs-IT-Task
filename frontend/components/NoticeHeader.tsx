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

    if (params.has("page")) params.set("page", "1");

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    router.push(pathname);
  };

  const isFiltered = searchParams.toString() !== "";

  return (
    <div className="w-full bg-[#F8F9FB] p-6 rounded-xl border border-gray-100 font-sans shadow-sm">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[#333E52] text-2xl font-bold mb-1">
            Notice Management
          </h1>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="text-[#10B981]">
              Active Notices: {activeCount}
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-[#F59E0B]">
              Draft Notice: {draftCount.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/addNotice"
            className="flex items-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-md active:scale-95"
          >
            <Plus size={18} /> Create Notice
          </Link>
          <button
            onClick={() =>
              handleFilterChange(
                "status",
                searchParams.get("status") === "Draft" ? "" : "Draft"
              )
            }
            className={`flex items-center gap-2 border-2 px-5 py-2.5 rounded-lg font-bold transition-all ${
              searchParams.get("status") === "Draft"
                ? "bg-[#F59E0B] border-[#F59E0B] text-white"
                : "border-[#F59E0B] text-[#F59E0B] hover:bg-amber-50"
            }`}
          >
            <PencilLine size={18} /> All Drafts
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-end gap-4">
        <span className="text-[#475569] font-bold text-sm shrink-0">
          Filter by:
        </span>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Dept */}
          <div className="relative flex-1 md:min-w-[200px]">
            <select
              className="w-full appearance-none bg-[#F1F5F9] border border-transparent py-2.5 pl-4 pr-10 rounded-lg text-[#64748B] text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer font-medium"
              value={searchParams.get("targetDept") || ""}
              onChange={(e) => handleFilterChange("targetDept", e.target.value)}
            >
              <option value="">Departments</option>
              <option value="Individual">Individual</option>
              <option value="IT Support">IT Support</option>
              <option value="Web Team">Web Team</option>
              <option value="Finance">Finance</option>
              <option value="Human Resource">Human Resource</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
            />
          </div>

          {/* Employee */}
          <div className="flex-1 md:min-w-[180px]">
            <input
              type="text"
              placeholder="Employee Name/ID"
              className="w-full bg-[#F1F5F9] border border-transparent py-2.5 px-4 rounded-lg text-[#64748B] text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium"
              key={searchParams.get("employee") || "empty"}
              defaultValue={searchParams.get("employee") || ""}
              onBlur={(e) => handleFilterChange("employee", e.target.value)} // onBlur বা Enter এ চেঞ্জ হবে
              onKeyDown={(e) =>
                e.key === "Enter" &&
                handleFilterChange(
                  "employee",
                  (e.target as HTMLInputElement).value
                )
              }
            />
          </div>

          {/* Date */}
          <div className="relative flex-1 md:min-w-[160px]">
            <input
              type="date"
              className="w-full bg-[#F1F5F9] border border-transparent py-2.5 pl-4 pr-10 rounded-lg text-[#64748B] text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer font-medium"
              value={searchParams.get("date") || ""}
              onChange={(e) => handleFilterChange("date", e.target.value)}
            />
            {/* <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" /> */}
          </div>

          {/* Reset */}
          <button
            onClick={resetFilters}
            disabled={!isFiltered}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              isFiltered
                ? "bg-rose-50 text-rose-500 hover:bg-rose-100"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeHeader;
