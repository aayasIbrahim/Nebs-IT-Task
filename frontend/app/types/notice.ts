export interface NoticeSearchParams {
  dept?: string;
  search?: string;
  status?: "Published" | "Draft";
}

export type NoticeStatus = "Published" | "Draft";

export interface Notice {
  _id: string;
  position: string;
  noticeTitle: string;
  noticeType: string[] | string;
  targetDept: string;
  publishDate: string;
  status: NoticeStatus;
  employeeId: string;
  employeeName: string;
  noticeDescription?: string;
  attachmentUrl?: string;
}
export type ActionState = {
  success: boolean;
  message: string;
  _id?: string;
  title?: string;
} | null;
export interface FilterParams {
  targetDept?: string;
  status?: string;
  employee?: string;
  date?: string;
  page?: string;
}
