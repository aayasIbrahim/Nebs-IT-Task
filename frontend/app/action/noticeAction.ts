"use server";

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createNotice(formData: FormData): Promise<void> {
  const apiFormData = new FormData();

  // ১. টেক্সট ফিল্ড
  apiFormData.append("noticeTitle", formData.get("title") as string);
  apiFormData.append("targetDept", formData.get("target") as string);
  apiFormData.append("employeeId", formData.get("employeeId") as string);
  apiFormData.append("employeeName", formData.get("employeeName") as string);
  apiFormData.append("position", formData.get("position") as string);
  apiFormData.append("publishDate", formData.get("publishDate") as string);
  apiFormData.append("status", formData.get("status") as string);

  // ২. noticeType[] (Express isArray compatible)
  const noticeTypesRaw = formData.get("noticeTypes") as string;

  try {
    const typesArray: string[] = JSON.parse(noticeTypesRaw || "[]");
    typesArray.forEach((type) => {
      apiFormData.append("noticeType[]", type);
    });
  } catch {
    throw new Error("Invalid notice type format");
  }

  // ৩. ফাইল
  const attachment = formData.get("attachment") as File;
  if (attachment && attachment.size > 0) {
    apiFormData.append("attachment", attachment);
  }

  // ৪. API call
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notices`,
    {
      method: "POST",
      body: apiFormData,
    }
  );

  if (!response.ok) {
    const result = await response.json();
    console.error("Backend error:", result);
    throw new Error(result.message || "Notice creation failed");
  }

  // ৫. Success
  revalidatePath("/notice-board");
  redirect("/notice-board");
}

// @/app/action/noticeAction.ts

export async function updateNoticeStatusOnly(id: string, currentStatus: string) {
  const nextStatus =
    currentStatus === "Published" ? "Unpublished" : "Published";

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/notices/${id}/status`;

    const res = await fetch(apiUrl, {
      method: "PATCH", // PATCH ব্যবহার করা ভালো স্ট্যাটাস আপডেটের জন্য
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.message };
    }

    revalidatePath("/notice-board");
    return { success: true, status: nextStatus };
  } catch (error) {
    console.error("Action Error details:", error);
    return { success: false, error: "Database connection failed" };
  }
}
