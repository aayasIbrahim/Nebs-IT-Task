
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
    <div className="min-h-screen bg-slate-100 p-4">
  <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-lg p-5">

    {/* Header */}
    <div className="mb-4">
      <h1 className="text-lg font-semibold text-slate-800">
        {notice.noticeTitle}
      </h1>
      <p className="text-xs text-slate-400">
        Notice ID: {notice._id}
      </p>
    </div>

    {/* Divider */}
    <div className="border-t border-slate-200 my-4" />

    {/* Basic Info */}
    <ul className="space-y-3 text-sm mb-4">
      <li className="flex justify-between">
        <span className="text-slate-500">Status</span>
        <span className="font-medium text-slate-700">
          {notice.status}
        </span>
      </li>
      <li className="flex justify-between">
        <span className="text-slate-500">Department</span>
        <span className="font-medium text-slate-700">
          {notice.targetDept}
        </span>
      </li>
      <li className="flex justify-between">
        <span className="text-slate-500">Publish Date</span>
        <span className="font-medium text-slate-700">
          {new Date(notice.publishDate).toLocaleDateString()}
        </span>
      </li>
    </ul>

    {/* Meta Info */}
    <ul className="grid grid-cols-2 gap-3 text-sm mb-4">
      <li>
        <p className="text-slate-500 text-xs">Designation</p>
        <p className="text-slate-700">
          {notice.position || "General"}
        </p>
      </li>
      <li>
        <p className="text-slate-500 text-xs">Target</p>
        <p className="text-slate-700">
          {notice.employeeName || "All"}
        </p>
      </li>
      <li>
        <p className="text-slate-500 text-xs">Employee Code</p>
        <p className="text-slate-700">
          {notice.employeeId || "-"}
        </p>
      </li>
    </ul>

    {/* Categories */}
    <ul className="flex flex-wrap gap-2 mb-4">
      {(Array.isArray(notice.noticeType)
        ? notice.noticeType
        : [notice.noticeType]
      ).map((type: string) => (
        <li
          key={type}
          className="px-3 py-1 text-xs rounded-full border border-slate-200 bg-slate-50 text-slate-600"
        >
          {type}
        </li>
      ))}
    </ul>

    {/* Description */}
    <div className="mb-4">
      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
        {notice.noticeDescription || "No description available."}
      </p>
    </div>

    {/* Attachment */}
    {notice.attachment && (
      <div className="mb-4 flex justify-between text-sm">
        <span className="text-slate-500">Attachment</span>
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/${notice.attachment}`}
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          View File
        </a>
      </div>
    )}

    {/* Footer */}
    <div className="border-t border-slate-200 pt-3 text-xs text-slate-400">
      Last Updated: {new Date(notice.updatedAt).toLocaleString()}
    </div>

  </div>
</div>


  );
}