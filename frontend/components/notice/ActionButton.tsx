
"use client";

import { Eye, Pencil, MoreVertical } from "lucide-react";

export default function ActionButtons() {
  return (
    <div className="flex items-center space-x-4 text-gray-400">
      <Eye size={19} className="cursor-pointer hover:text-blue-600" />
      <Pencil size={19} className="cursor-pointer hover:text-blue-600" />
      <MoreVertical size={19} className="cursor-pointer hover:text-blue-600" />
    </div>
  );
}
