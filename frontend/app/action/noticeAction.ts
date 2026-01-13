"use server";


import { ActionState } from "../types/notice";
import { revalidatePath } from "next/cache";

export async function createNotice(prevState: ActionState, formData: FormData) {
  const apiFormData = new FormData();

  apiFormData.append("noticeTitle", formData.get("noticeTitle") as string);
  apiFormData.append("targetDept", formData.get("targetDept") as string);
  apiFormData.append("employeeId", formData.get("employeeId") as string);
  apiFormData.append("employeeName", formData.get("employeeName") as string);
  apiFormData.append(
    "noticeDescription",
    formData.get("noticeDescription") as string
  );
  apiFormData.append("position", formData.get("position") as string);
  apiFormData.append("publishDate", formData.get("publishDate") as string);
  apiFormData.append("status", formData.get("status") as string);

  const noticeTypesRaw = formData.get("noticeTypes") as string;
  try {
    const typesArray: string[] = JSON.parse(noticeTypesRaw || "[]");
    typesArray.forEach((type) => {
      apiFormData.append("noticeType[]", type);
    });
  } catch {
    return { success: false, message: "Invalid notice type format" };
  }

  const attachment = formData.get("attachment") as File;
  if (attachment && attachment.size > 0) {
    apiFormData.append("attachment", attachment);
  }

  try {
    const response = await fetch(
      `https://nebs-it-task.onrender.com/api/notices`,
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
        message: result.message || "Notice has not been created, bcz your provided data is invalid and missing required fields.",
      };
    }

    revalidatePath("/notice-board");

    return {
      success: true,
      _id: result.data?._id || result._id,
      title: formData.get("noticeTitle") as string,
      message: "Notice created successfully!",
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
    const apiUrl = `https://nebs-it-task.onrender.com/api/notices/${id}/status`;

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
  try {
    const data = {
      noticeTitle: formData.get("noticeTitle"),
      noticeDescription: formData.get("noticeDescription"),
      targetDept: formData.get("targetDept"),
      employeeId: formData.get("employeeId"),
      employeeName: formData.get("employeeName"),
      position: formData.get("position"),
      publishDate: formData.get("publishDate"),
      status: formData.get("status"),
      noticeType: formData.getAll("noticeType"),
    };

    const res = await fetch(
      `https://nebs-it-task.onrender.com/api/notices/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server Error:", errorText);
      return { success: false, error: "Server update failed" };
    }

    revalidatePath("/notice-board");
    revalidatePath(`/notices/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Update Action Error:", error);
    return { success: false, error: "Connection error" };
  }
}

export async function deleteNotice(id: string) {
  try {
    const res = await fetch(
      `https://nebs-it-task.onrender.com/api/notices/${id}`,
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
