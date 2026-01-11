import Link from 'next/link';
import { Plus, PencilLine, ChevronDown, Calendar, RotateCcw, } from 'lucide-react';

const NoticeHeader = () => {
  return (
    <div className="w-full bg-white p-4 md:p-6 rounded-t-xl border-x border-t border-gray-100 font-sans">
      {/* Top Row: Title and Main Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">Notice Management</h1>
          <div className="flex items-center gap-3 mt-2 text-sm font-medium">
            <span className="text-emerald-500 whitespace-nowrap">Active Notices: 8</span>
            <span className="text-gray-300">|</span>
            <span className="text-amber-500 whitespace-nowrap">Draft Notice: 04</span>
          </div>
        </div>

        {/* Action Buttons: Stack on mobile, row on tablet+ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button className="flex items-center justify-center gap-2 bg-[#FF5722] hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-sm active:scale-95">
            <Plus size={20} />
            <Link href={"/addNotice"} className="whitespace-nowrap">Create Notice</Link>
          </button>
          <button className="flex items-center justify-center gap-2 border border-amber-400 text-amber-500 hover:bg-amber-50 px-5 py-2.5 rounded-lg font-semibold transition-all active:scale-95">
            <PencilLine size={18} />
            <span className="whitespace-nowrap">All Draft Notice</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center gap-4 text-sm">
        <div className="flex items-center gap-2 text-slate-600 font-bold shrink-0 uppercase tracking-wider text-[11px]">
          <span className="hidden sm:inline">Filter by:</span>
        </div>
        
        {/* Responsive Grid for Filter Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:flex-row items-center gap-3 w-full">
          
          {/* Department Select */}
          <div className="relative w-full xl:min-w-[220px]">
            <select className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-500 py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer">
              <option>Departments or individuals</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Search Input */}
          <input 
            type="text" 
            placeholder="Employee Id or Name" 
            className="w-full bg-slate-50 border border-slate-200 text-slate-500 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 xl:w-48"
          />

          {/* Status Select */}
          <div className="relative w-full xl:w-36">
            <select className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-500 py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer">
              <option>Status</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Date Picker */}
          <div className="relative w-full xl:w-44">
            <div className="bg-slate-50 border border-slate-200 text-slate-400 py-2.5 pl-4 pr-10 rounded-lg flex items-center justify-between cursor-pointer">
              <span className="truncate">Published on</span>
              <Calendar size={16} className="text-slate-400" />
            </div>
          </div>

          {/* Reset Button - Full width on mobile, auto on desktop */}
          <button className="xl:ml-auto flex items-center justify-center gap-2 text-blue-500 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-lg font-bold transition-colors border border-blue-100 whitespace-nowrap">
            <RotateCcw size={16} />
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeHeader;