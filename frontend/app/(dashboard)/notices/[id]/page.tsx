
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Calendar, 
  User, 
  Briefcase, 
  Building2, 
  Tag, 
  FileText, 
  Download, 
  ChevronLeft, 
  Pencil,
  Clock,
  IdCard
} from "lucide-react";

async function getNoticeDetails(id: string) {
  try {
    const res = await fetch(
      `https://nebs-it-task.onrender.com/api/notices/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const result = await res.json();
    return result.data;
  } catch {
    return null;
  }
}

export default async function NoticeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = await getNoticeDetails(id);

  if (!notice) notFound();

  return (
   <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 md:px-8">
      {/* Navigation & Actions */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center">
        <Link 
          href="/notice-board" 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-all font-medium text-sm"
        >
          <ChevronLeft size={18} />
          Back to Board
        </Link>
        
        <Link 
          href={`/notices/edit/${notice._id}`}
          className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-all shadow-sm text-sm font-semibold"
        >
          <Pencil size={16} />
          Edit Notice
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          
          {/* Top Header Section */}
          <div className="p-8 md:p-10 border-b border-slate-100 bg-gradient-to-br from-white to-slate-50/50">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    notice.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    ● {notice.status}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                    <IdCard size={12}/> {notice._id}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                  {notice.noticeTitle}
                </h1>
              </div>
              
              <div className="flex -space-x-2">
                {/* Visual indicator for categories */}
                {(Array.isArray(notice.noticeType) ? notice.noticeType : [notice.noticeType]).map((type: string, i: number) => (
                  <div key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-xs font-bold text-slate-600">
                    {type}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-100">
            <div className="p-6 border-b md:border-b-0 md:border-r border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Building2 size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</p>
                <p className="text-sm font-bold text-slate-700">{notice.targetDept}</p>
              </div>
            </div>

            <div className="p-6 border-b md:border-b-0 md:border-r border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Publish Date</p>
                <p className="text-sm font-bold text-slate-700">{new Date(notice.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>

            <div className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600">
                <User size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Personnel</p>
                <p className="text-sm font-bold text-slate-700">{notice.employeeName || "General Staff"}</p>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-8 md:p-10 space-y-10">
            
            {/* Attribution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <Briefcase size={18} className="text-slate-400" />
                <span className="text-sm text-slate-500 font-medium">Position:</span>
                <span className="text-sm font-bold text-slate-700">{notice.position || "Staff"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Tag size={18} className="text-slate-400" />
                <span className="text-sm text-slate-500 font-medium">Employee ID:</span>
                <span className="text-sm font-bold text-slate-700">{notice.employeeId || "N/A"}</span>
              </div>
            </div>

            {/* Notice Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-black uppercase text-xs tracking-[0.2em]">
                <FileText size={16} className="text-blue-600" />
                Detailed Description
              </div>
              <p className="text-slate-600 leading-[1.8] text-base font-medium whitespace-pre-wrap">
                {notice.noticeDescription || "No detailed information provided for this notice."}
              </p>
            </div>

            {/* Attachment Section */}
            {notice.attachment && (
              <div className="pt-6 border-t border-slate-100">
                <div className="bg-blue-600 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-transform hover:scale-[1.01] duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl text-white">
                      <FileText size={24} />
                    </div>
                    <div className="text-white">
                      <p className="font-bold">Attached Document</p>
                      <p className="text-xs text-blue-100 uppercase tracking-widest font-medium">Official Reference File</p>
                    </div>
                  </div>
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/${notice.attachment}`}
                    target="_blank"
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-lg"
                  >
                    <Download size={16} />
                    View & Download
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer Metadata */}
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Clock size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Last Synchronized: {new Date(notice.updatedAt).toLocaleString()}
              </span>
            </div>
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
              Nebs-IT Official Notice
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}