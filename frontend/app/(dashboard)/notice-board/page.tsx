import NoticeTable from "@/components/NoticeTable";
import NoticeHeader from "@/components/NoticeHeader";
import { Notice } from "@/app/types/notice";

interface FilterParams {
  targetDept?: string;
  search?: string;
  status?: string;
}

async function getNotices(params: FilterParams = {}) {
  const query = new URLSearchParams();
  
  
  if (params.targetDept && params.targetDept !== "All Department") {
    query.append("targetDept", params.targetDept);
  }
  
  if (params.search) query.append("search", params.search);
  if (params.status) query.append("status", params.status);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices?${query.toString()}`, {
      next: { tags: ["notice-board"] },
      cache: "no-store",
    });

    if (!res.ok) return [];
    const result = await res.json();
    return result.data || [];
  } catch  {
    return [];
  }
}

export default async function NoticeBoard({ 
  searchParams 
}: { 
  searchParams: Promise<FilterParams> 
}) {
  const params = await searchParams;
  const notices:Notice[] = await getNotices(params);

  const activeCount = notices.filter((n) => n.status === "Published").length;
  const draftCount = notices.filter((n) => n.status === "Draft").length;

  return (
    <div className="space-y-0 max-w-7xl mx-auto p-4">
      <NoticeHeader activeCount={activeCount} draftCount={draftCount} />
      <NoticeTable initialNotices={notices} />
    </div>
  );
}