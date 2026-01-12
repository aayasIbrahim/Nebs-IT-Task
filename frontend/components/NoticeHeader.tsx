"use client";

import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Plus, PencilLine, ChevronDown,  RotateCcw } from 'lucide-react';

interface NoticeHeaderProps {
  activeCount: number;
  draftCount: number;
}

const NoticeHeader = ({ activeCount, draftCount }: NoticeHeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ফিল্টার অনুযায়ী URL আপডেট করার ফাংশন
  const handleFilterChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    // URL আপডেট করা (এটি সার্ভার কম্পোনেন্টকে ট্রিগার করবে)
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push(pathname); // সব প্যারামিটার মুছে ফেলবে
  };

  return (
    <div className="w-full bg-white p-4 md:p-6 rounded-t-xl border-x border-t border-gray-100 font-sans">
      {/* Top Row: Title & Buttons (Same as before) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">Notice Management</h1>
          <div className="flex items-center gap-3 mt-2 text-sm font-medium">
            <span className="text-emerald-500 uppercase tracking-tight">Active: {activeCount}</span>
            <span className="text-gray-300">|</span>
            <span className="text-amber-500 uppercase tracking-tight">Draft: {draftCount}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/addNotice" className="flex items-center justify-center gap-2 bg-[#FF5722] text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm active:scale-95">
            <Plus size={20} /> Create Notice
          </Link>
          <button className="flex items-center justify-center gap-2 border border-amber-400 text-amber-500 px-5 py-2.5 rounded-lg font-semibold active:scale-95">
            <PencilLine size={18} /> All Draft
          </button>
        </div>
      </div>

      {/* Bottom Row: Filters (Updated with router logic) */}
      <div className="flex flex-col xl:flex-row xl:items-center gap-4 text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:flex-row items-center gap-3 w-full">
          
          <div className="relative w-full xl:min-w-[220px]">
            <select 
              className="w-full appearance-none bg-slate-50 border border-slate-200 py-2.5 pl-4 pr-10 rounded-lg focus:outline-none"
              defaultValue={searchParams.get('dept') || ""}
              onChange={(e) => handleFilterChange('dept', e.target.value)}
            >
              <option value="">Departments or individuals</option>
              <option value="All Department">All Department</option>
              <option value="Finance">Finance</option>
              <option value="Web Team">Web Team</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <input 
            type="text" 
            placeholder="Search by Title" 
            className="w-full bg-slate-50 border border-slate-200 py-2.5 px-4 rounded-lg focus:outline-none xl:w-48"
            defaultValue={searchParams.get('search') || ""}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />

          <div className="relative w-full xl:w-36">
            <select 
              className="w-full appearance-none bg-slate-50 border border-slate-200 py-2.5 pl-4 pr-10 rounded-lg focus:outline-none"
              defaultValue={searchParams.get('status') || ""}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">Status</option>
              <option value="Published">Published</option>
              <option value="Unpublished">Unpublished</option>
              <option value="Draft">Draft</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <button 
            onClick={resetFilters}
            className="xl:ml-auto flex items-center justify-center gap-2 text-blue-500 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-lg font-bold transition-colors border border-blue-100"
          >
            <RotateCcw size={16} /> Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeHeader;