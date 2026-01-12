"use server";


import { revalidatePath } from "next/cache";

export async function createNotice(formData: FormData) {
  const apiFormData = new FormData();

  // ডাটা ম্যাপ করা (ফ্রন্টএন্ডের 'title' কে ব্যাকএন্ডের 'noticeTitle' এ নেওয়া)
  apiFormData.append("noticeTitle", formData.get("noticeTitle") as string);
  apiFormData.append("targetDept", formData.get("targetDept") as string);
  apiFormData.append("employeeId", formData.get("employeeId") as string);
  apiFormData.append("employeeName", formData.get("employeeName") as string);
  apiFormData.append("noticeDescription", formData.get("noticeDescription") as string);
  apiFormData.append("position", formData.get("position") as string);
  apiFormData.append("publishDate", formData.get("publishDate") as string);
  apiFormData.append("status", formData.get("status") as string);

  // নোটিশ টাইপ প্রসেস করা
  const noticeTypesRaw = formData.get("noticeTypes") as string;
  try {
    const typesArray: string[] = JSON.parse(noticeTypesRaw || "[]");
    typesArray.forEach((type) => {
      apiFormData.append("noticeType[]", type);
    });
  } catch {
    return { success: false, message: "Invalid notice type format" };
  }

  // অ্যাটাচমেন্ট চেক
  const attachment = formData.get("attachment") as File;
  if (attachment && attachment.size > 0) {
    apiFormData.append("attachment", attachment);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notices`,
      {
        method: "POST",
        body: apiFormData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Backend error:", result);
      return { 
        success: false, 
        message: result.message || "Notice creation failed" 
      };
    }


    revalidatePath("/notice-board");
    
    return { 
      success: true, 
      _id: result.data?._id || result._id,
      message: "Notice created successfully!" 
    };

  } catch (error) {
    console.error("Fetch error:", error);
    return { success: false, message: "Server connection failed" };
  }
}

export async function updateNoticeStatusOnly(
  id: string,
  currentStatus: string
) {
  const nextStatus =
    currentStatus === "Published" ? "Unpublished" : "Published";

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/notices/${id}/status`;

    const res = await fetch(apiUrl, {
      method: "PATCH",
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
export async function updateNoticeAction(id: string, formData: FormData) {
  const data = {
    noticeTitle: formData.get("noticeTitle"),
    noticeDescription: formData.get("noticeDescription"),
    targetDept: formData.get("targetDept"),
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      revalidatePath("/notice-board");
      return { success: true };
    }
    return { success: false, error: "Failed to update" };
  } catch  {
    return { success: false, error: "Connection error" };
  }
}

export async function deleteNotice(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notices/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      revalidatePath("/notice-board");
      return { success: true };
    }
    return { success: false };
  } catch {
    return { success: false, error: "Network error" };
  }
}
