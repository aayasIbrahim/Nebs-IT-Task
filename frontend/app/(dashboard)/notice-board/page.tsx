import NoticeTable from "@/components/notice/NoticeTable";
import NoticeHeader from "@/components/notice/NoticeHeader";
import { FilterParams } from "@/app/types/notice";
import NoticePagination from "@/components/notice/NoricePagination"; 



async function getNotices(params: FilterParams = {}) {
  const query = new URLSearchParams();

  if (params.targetDept && params.targetDept !== "All Department") {
    query.append("targetDept", params.targetDept);
  }
  if (params.status) query.append("status", params.status);
  if (params.employee) query.append("employee", params.employee);
  if (params.date) query.append("date", params.date);
  
  query.append("page", params.page || "1");
  query.append("limit", "5"); 

  try {
    const res = await fetch(
      `https://nebs-it-task.onrender.com/api/notices?${query.toString()}`,
      {
        next: { tags: ["notice-board"] },
        cache: "no-store",
      }
    );

    if (!res.ok) return { data: [], pagination: { totalPages: 1, currentPage: 1 } };

    const result = await res.json();
    
    
    return {
      data: result.data || [],
      pagination: result.pagination || { totalPages: 1, currentPage: 1 },
      stats: result.stats || { published: 0, draft: 0 }
    };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { data: [], pagination: { totalPages: 1, currentPage: 1 } };
  }
}

export default async function NoticeBoard({
  searchParams,
}: {
  searchParams: Promise<FilterParams>;
}) {
  const params = await searchParams;
  const { data: notices, pagination, stats } = await getNotices(params);

  return (
    <div className="space-y-0 max-w-7xl mx-auto p-4 md:p-10">
      <NoticeHeader activeCount={stats.published} draftCount={stats.draft} />

      <div className="border border-gray-100 rounded-b-xl overflow-hidden shadow-sm bg-white">
        <NoticeTable initialNotices={notices} />
        

        <div className="border-t border-gray-50">
           <NoticePagination
            totalPages={pagination.totalPages}
            currentPage={pagination.currentPage}
          />
        </div>
      </div>
    </div>
  );
}