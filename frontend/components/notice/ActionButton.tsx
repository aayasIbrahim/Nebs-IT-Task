"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

import { deleteNotice } from "@/app/action/noticeAction"; 

interface ActionButtonsProps {
  id: string;
}

export default function ActionButtons({ id }: ActionButtonsProps) {
  

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this notice?")) {
      const result = await deleteNotice(id);
      if (result.success) {
        alert("Notice deleted successfully!");
      
      } else {
        alert("Failed to delete notice");
      }
    }
  };

  return (
    <div className="flex items-center space-x-4 text-gray-400">
      {/* View Notice */}
      <Link href={`/notices/${id}`} title="View Details">
        <Eye size={19} className="cursor-pointer hover:text-blue-600 transition-colors" />
      </Link>

      {/* Edit Notice */}
      <Link href={`/notices/edit/${id}`} title="Edit Notice">
        <Pencil size={19} className="cursor-pointer hover:text-amber-600 transition-colors" />
      </Link>

      {/* Delete Notice */}
      <button onClick={handleDelete} title="Delete Notice">
        <Trash2 size={19} className="cursor-pointer hover:text-red-600 transition-colors" />
      </button>
    </div>
  );
}