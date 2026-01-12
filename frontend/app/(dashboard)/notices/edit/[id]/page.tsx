import { notFound } from "next/navigation";
import EditNoticeForm from "@/components/notice/EditNoticeForm"; 

async function getNotice(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const result = await res.json();
  return result.data;
}

export default async function EditNoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = await getNotice(id);

  if (!notice) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Notice</h1>
        <p className="text-gray-500 text-sm">Update the information below to modify the notice.</p>
      </div>

      {/* এডিট ফর্ম কম্পোনেন্ট */}
      <EditNoticeForm notice={notice} />
    </div>
  );
}