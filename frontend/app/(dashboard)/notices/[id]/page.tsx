import {
  ArrowLeft,
  Calendar,
  User,
  Download,
  Briefcase,
  Hash,
  Info,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getNoticeDetails(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notices/${id}`,
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
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <Link
          href="/notice-board"
          className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 mb-6"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Notice Board
        </Link>

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

          {/* Header */}
          <div className="p-8 border-b">
            <div className="flex flex-col gap-4">

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      notice.status === "Published"
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                  />
                  {notice.status}
                </span>

                <span className="text-xs font-semibold text-slate-500">
                  {notice.targetDept}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-slate-900 leading-snug">
                {notice.noticeTitle}
              </h1>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar size={16} />
                {new Date(notice.publishDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Employee Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-slate-50 border-b">
            {[
              {
                label: "Employee ID",
                value: notice.employeeId || "N/A",
                icon: Hash,
              },
              {
                label: "Target Person",
                value: notice.employeeName || "All Employees",
                icon: User,
              },
              {
                label: "Position",
                value: notice.position || "General",
                icon: Briefcase,
              },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex gap-4 items-start">
                <div className="p-2 rounded-lg bg-white border text-slate-500">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Notice Details */}
          <div className="p-8 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Info size={16} />
              Notice Details
            </h3>

            <div className="flex flex-wrap gap-2">
              {Array.isArray(notice.noticeType)
                ? notice.noticeType.map((type: string) => (
                    <span
                      key={type}
                      className="px-3 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold"
                    >
                      {type}
                    </span>
                  ))
                : (
                  <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
                    {notice.noticeType}
                  </span>
                )}
            </div>

            <div className="prose prose-slate max-w-none text-sm leading-relaxed">
              {notice.noticeDescription ||
                "No detailed description available."}
            </div>
          </div>

          {/* Attachment */}
          {notice.attachment && (
            <div className="mx-8 mb-8 border rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between bg-white gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-slate-100 text-slate-600">
                  <Download size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Attached Document
                  </p>
                  <p className="text-xs text-slate-400">
                    Click to view or download
                  </p>
                </div>
              </div>

              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}/${notice.attachment}`}
                target="_blank"
                className="px-6 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
              >
                View File
              </a>
            </div>
          )}

          {/* Footer */}
          <div className="px-8 py-4 border-t text-[11px] text-slate-400 flex justify-between">
            <span>Auto-generated Notice</span>
            <span>
              Updated: {new Date(notice.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
