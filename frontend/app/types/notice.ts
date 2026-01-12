// types/notice.ts (optional but recommended)
export interface NoticeSearchParams {
  dept?: string;
  search?: string;
  status?: "Published" | "Draft";
}
// types/notice.ts
export type NoticeStatus = "Published" | "Draft";

export interface Notice {
  _id: string;
  noticeTitle: string;
  noticeType: string[] | string;
  targetDept: string;
  publishDate: string;
  status: NoticeStatus;
}