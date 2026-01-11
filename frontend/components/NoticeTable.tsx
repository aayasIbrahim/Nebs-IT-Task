"use client";

import React, { useState } from 'react';
import { Eye, Pencil, MoreVertical, Calendar, Tag, Briefcase } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  type: string;
  dept: string;
  date: string;
  status: 'Published' | 'Unpublished' | 'Draft';
  deptColor: string;
}

const initialNotices: Notice[] = [
  { id: 1, title: 'Office closed on Friday for maintenance.', type: 'General / Company-W', dept: 'All Department', date: '15-Jun-2025', status: 'Published', deptColor: 'text-blue-600' },
  { id: 2, title: 'Eid al-Fitr holiday schedule.', type: 'Holiday & Event', dept: 'Finance', date: '15-Jun-2025', status: 'Published', deptColor: 'text-green-600' },
  { id: 3, title: 'Updated code of conduct policy', type: 'HR & Policy Update', dept: 'Sales Team', date: '15-Jun-2025', status: 'Published', deptColor: 'text-orange-500' },
  { id: 4, title: 'Payroll for October will be processed on 28th', type: 'Finance & Payroll', dept: 'Web Team', date: '15-Jun-2025', status: 'Published', deptColor: 'text-blue-500' },
  { id: 5, title: 'System update scheduled for 30 Oct (9:00–11:00 PM)', type: 'IT / System Maintena', dept: 'Database Team', date: '15-Jun-2025', status: 'Published', deptColor: 'text-slate-700' },
  { id: 7, title: 'Unauthorized absence recorded on 18 Oct 2025', type: 'Warning / Disciplinary', dept: 'Individual', date: '15-Jun-2025', status: 'Unpublished', deptColor: 'text-cyan-500' },
];

export default function InteractiveNoticeTable() {
  const [notices, setNotices] = useState(initialNotices);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [openToggleId, setOpenToggleId] = useState<number | null>(null);

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleStatusChange = (id: number) => {
    setNotices(prev => prev.map(n => {
      if (n.id === id) {
        const nextStatus = n.status === 'Published' ? 'Unpublished' : 'Published';
        return { ...n, status: nextStatus as 'Published' | 'Unpublished' | 'Draft' };
      }
      return n;
    }));
    setOpenToggleId(null);
  };

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-visible font-sans">
      
      {/* --- DESKTOP VIEW: Standard Table (Visible on md and up) --- */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-gray-200 text-gray-500 text-[13px]">
            <tr>
              <th className="p-4 w-12 text-center">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                  onChange={(e) => setSelectedIds(e.target.checked ? notices.map(n => n.id) : [])}
                  checked={selectedIds.length === notices.length}
                />
              </th>
              <th className="p-4 font-semibold uppercase tracking-wider">Title</th>
              <th className="p-4 font-semibold uppercase tracking-wider">Notice Type</th>
              <th className="p-4 font-semibold uppercase tracking-wider">Departments</th>
              <th className="p-4 font-semibold uppercase tracking-wider">Date</th>
              <th className="p-4 font-semibold uppercase tracking-wider">Status</th>
              <th className="p-4 font-semibold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {notices.map((notice) => (
              <tr key={notice.id} className="group hover:bg-slate-50 transition-colors text-sm text-gray-700">
                <td className="p-4 text-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                    checked={selectedIds.includes(notice.id)}
                    onChange={() => toggleSelect(notice.id)}
                  />
                </td>
                <td className="p-4 font-medium text-gray-900 max-w-[250px] truncate">{notice.title}</td>
                <td className="p-4 text-gray-400">{notice.type}</td>
                <td className={`p-4 font-semibold ${notice.deptColor}`}>{notice.dept}</td>
                <td className="p-4 text-gray-500 whitespace-nowrap">{notice.date}</td>
                <td className="p-4 relative">
                  <StatusBadge notice={notice} onClick={() => setOpenToggleId(openToggleId === notice.id ? null : notice.id)} />
                  {openToggleId === notice.id && (
                    <StatusTogglePopup notice={notice} onToggle={() => handleStatusChange(notice.id)} />
                  )}
                </td>
                <td className="p-4">
                  <ActionButtons />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE VIEW: Card Layout (Visible on small screens) --- */}
      <div className="md:hidden flex flex-col divide-y divide-gray-100">
        {notices.map((notice) => (
          <div key={notice.id} className="p-4 flex flex-col gap-3 active:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-gray-300 accent-blue-600"
                  checked={selectedIds.includes(notice.id)}
                  onChange={() => toggleSelect(notice.id)}
                />
                <h3 className="font-bold text-gray-900 leading-snug">{notice.title}</h3>
              </div>
              <ActionButtons />
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-[13px] ml-8">
              <div className="flex items-center gap-2 text-gray-400">
                <Tag size={14} /> {notice.type}
              </div>
              <div className={`flex items-center gap-2 font-bold ${notice.deptColor}`}>
                <Briefcase size={14} /> {notice.dept}
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar size={14} /> {notice.date}
              </div>
              <div className="relative">
                 <StatusBadge notice={notice} onClick={() => setOpenToggleId(openToggleId === notice.id ? null : notice.id)} />
                 {openToggleId === notice.id && (
                    <StatusTogglePopup notice={notice} onToggle={() => handleStatusChange(notice.id)} isMobile />
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Sub-Components for Cleanliness --- */

const StatusBadge = ({ notice, onClick }: { notice: Notice, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all uppercase tracking-tight
      ${notice.status === 'Published' ? 'bg-green-100 text-green-600' : 
        notice.status === 'Draft' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}
  >
    {notice.status}
  </button>
);

const StatusTogglePopup = ({ notice, onToggle, isMobile }: { notice: Notice, onToggle: () => void, isMobile?: boolean }) => (
  <div className={`absolute ${isMobile ? 'left-0 top-8' : 'right-0 top-12'} z-50 bg-white shadow-2xl border border-gray-100 rounded-xl p-3 flex items-center gap-4 min-w-[160px] animate-in slide-in-from-top-2`}>
    <span className="text-sm font-bold text-slate-700">{notice.status}</span>
    <button 
      onClick={onToggle}
      className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${notice.status === 'Published' ? 'bg-green-500' : 'bg-slate-700'}`}
    >
      <div className={`absolute top-1 bg-white w-4 h-4 rounded-full shadow-md transition-all duration-300 ${notice.status === 'Published' ? 'left-6' : 'left-1'}`} />
    </button>
  </div>
);

const ActionButtons = () => (
  <div className="flex items-center space-x-4 text-gray-400">
    <Eye size={19} className="cursor-pointer hover:text-blue-600 transition-colors" />
    <Pencil size={19} className="cursor-pointer hover:text-blue-600 transition-colors" />
    <MoreVertical size={19} className="cursor-pointer hover:text-blue-600 transition-colors" />
  </div>
);