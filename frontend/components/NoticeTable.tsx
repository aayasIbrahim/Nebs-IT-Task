"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Tag, Briefcase } from "lucide-react";
import ActionButtons from "./notice/ActionButton";
import StatusBadge from "./notice/StatusBadge";
import StatusTogglePopup from "./notice/StatusTogglePopup";
import { updateNoticeStatusOnly } from "@/app/action/noticeAction";
import { Notice } from "@/app/types/notice";

export default function NoticeTable({
  initialNotices,
}: {
  initialNotices: Notice[];
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openToggleId, setOpenToggleId] = useState<string | null>(null);
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    setNotices(initialNotices);
  }, [initialNotices]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    setOpenToggleId(null);
    setLoadingId(id);

    try {
      const result = await updateNoticeStatusOnly(id, currentStatus);

      if (result?.success) {
        const updatedStatus = result.status as Notice["status"];

        setNotices((prev) =>
          prev.map((n) =>
            n._id === id ? ({ ...n, status: updatedStatus } as Notice) : n
          )
        );
      } else {
        alert(result?.error || "Status update failed!");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-visible font-sans">
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-gray-200 text-gray-500 text-[13px]">
            <tr>
              <th className="p-4 w-12 text-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                  onChange={(e) =>
                    setSelectedIds(
                      e.target.checked ? notices.map((n) => n._id) : []
                    )
                  }
                  checked={
                    notices.length > 0 && selectedIds.length === notices.length
                  }
                />
              </th>
              <th className="p-4 font-semibold uppercase tracking-wider">
                Title
              </th>
              <th className="p-4 font-semibold uppercase tracking-wider">
                Notice Type
              </th>
              <th className="p-4 font-semibold uppercase tracking-wider">
                Departments
              </th>
              <th className="p-4 font-semibold uppercase tracking-wider">
                Date
              </th>
              <th className="p-4 font-semibold uppercase tracking-wider">
                Status
              </th>
              <th className="p-4 font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {notices.map((notice) => (
              <tr
                key={notice._id}
                className={`group hover:bg-slate-50 transition-colors text-sm text-gray-700 ${
                  loadingId === notice._id
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
              >
                <td className="p-4 text-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                    checked={selectedIds.includes(notice._id)}
                    onChange={() => toggleSelect(notice._id)}
                  />
                </td>
                <td className="p-4 font-medium text-gray-900 max-w-[250px] truncate">
                  {notice.noticeTitle}
                </td>
                <td className="p-4 text-gray-400">
                  {Array.isArray(notice.noticeType)
                    ? notice.noticeType.join(", ")
                    : notice.noticeType}
                </td>
                <td className="p-4 font-semibold text-blue-600">
                  {notice.targetDept}
                </td>
                <td className="p-4 text-gray-500 whitespace-nowrap">
                  {new Date(notice.publishDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="p-4 relative">
                  <StatusBadge
                    notice={notice}
                    onClick={() =>
                      setOpenToggleId(
                        openToggleId === notice._id ? null : notice._id
                      )
                    }
                  />
                  {openToggleId === notice._id && (
                    <StatusTogglePopup
                      notice={notice}
                      onToggle={() =>
                        handleStatusToggle(notice._id, notice.status)
                      }
                    />
                  )}
                </td>
                <td className="p-4">
                  <ActionButtons id={notice._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="md:hidden flex flex-col divide-y divide-gray-100">
        {notices.map((notice) => (
          <div
            key={notice._id}
            className={`p-4 flex flex-col gap-3 active:bg-gray-50 transition-colors ${
              loadingId === notice._id ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 accent-blue-600"
                  checked={selectedIds.includes(notice._id)}
                  onChange={() => toggleSelect(notice._id)}
                />
                <h3 className="font-bold text-gray-900 leading-snug">
                  {notice.noticeTitle}
                </h3>
              </div>
              <ActionButtons id={notice._id} />
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-[13px] ml-8">
              <div className="flex items-center gap-2 text-gray-400 truncate">
                <Tag size={14} />{" "}
                {Array.isArray(notice.noticeType)
                  ? notice.noticeType[0]
                  : notice.noticeType}
              </div>
              <div className="flex items-center gap-2 font-bold text-blue-600">
                <Briefcase size={14} /> {notice.targetDept}
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar size={14} />{" "}
                {new Date(notice.publishDate).toLocaleDateString()}
              </div>
              <div className="relative">
                <StatusBadge
                  notice={notice}
                  onClick={() =>
                    setOpenToggleId(
                      openToggleId === notice._id ? null : notice._id
                    )
                  }
                />
                {openToggleId === notice._id && (
                  <StatusTogglePopup
                    notice={notice}
                    onToggle={() =>
                      handleStatusToggle(notice._id, notice.status)
                    }
                    isMobile
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
