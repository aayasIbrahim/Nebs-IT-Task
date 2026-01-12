import NoticeTable from "@/components/NoticeTable";
import NoticeHeader from "@/components/NoticeHeader";
import { Notice } from "@/app/types/notice";

interface FilterParams {
  targetDept?: string;

  status?: string;
  employee?: string;
  date?: string;
}

async function getNotices(params: FilterParams = {}) {
  const query = new URLSearchParams();

  // ১. ডিপার্টমেন্ট ফিল্টার
  if (params.targetDept && params.targetDept !== "All Department") {
    query.append("targetDept", params.targetDept);
  }

  // ২. স্ট্যাটাস ফিল্টার (Published/Draft/Unpublished)
  if (params.status) {
    query.append("status", params.status);
  }

  // ৩. এমপ্লয়ি ফিল্টার (Name বা ID)
  if (params.employee) {
    query.append("employee", params.employee);
  }

  // ৪. ডেট ফিল্টার
  if (params.date) {
    query.append("date", params.date);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notices?${query.toString()}`,
      {
        next: { tags: ["notice-board"] },
        cache: "no-store", // ডাটা সব সময় লেটেস্ট রাখার জন্য
      }
    );

    if (!res.ok) {
      console.error("Fetch failed with status:", res.status);
      return [];
    }

    const result = await res.json();

    // এপিআই রেসপন্স থেকে ডাটা রিটার্ন করা
    return result.data || [];
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

export default async function NoticeBoard({
  searchParams,
}: {
  searchParams: Promise<FilterParams>;
}) {
  const params = await searchParams;
  const notices: Notice[] = await getNotices(params);

  const activeCount = notices.filter((n) => n.status === "Published").length;
  const draftCount = notices.filter((n) => n.status === "Draft").length;

  return (
    <div className="space-y-0 max-w-7xl mx-auto p-4 md:p-10">
      <NoticeHeader activeCount={activeCount} draftCount={draftCount} />

      <div className="border-x border-b border-gray-100 rounded-b-xl overflow-hidden shadow-sm">
        <NoticeTable initialNotices={notices} />
      </div>
    </div>
  );
}
