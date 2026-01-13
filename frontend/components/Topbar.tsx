"use client";
import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import { today, getGreeting } from "@/app/utils/Helper";

export default function TopHeader({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  return (
    <header className="h-20 bg-white shadow border-b border-slate-100 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Trigger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          <Menu size={24} />
        </button>

        <div className="hidden sm:block">
          <h2 className="font-inter font-medium text-[16px] leading-[24px] tracking-normal">
            {getGreeting()} Asif
          </h2>
          <p className="font-inter font-medium text-[14px] text-[#232948]">
            {" "}
            {today}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative cursor-pointer p-2 border-r border-[#8C92AF]">
          <Bell size={22} className="text-slate-400" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </div>
        <div className="h-8 w-px bg-slate-200 hidden xs:block"></div>
        <div className="flex items-center gap-3">
          <div className="text-right leading-none hidden md:block">
            <p className="font-inter font-medium text-[16px] leading-[24px] tracking-normal text-[232948]">
              Asif Riaj
            </p>
            <p className="font-inter font-medium text-[14px] leading-[24px] tracking-normal">
              Hr
            </p>
          </div>
          <div className="relative w-12 h-12">
            <Image
              src="/Avatar.png"
              alt="User"
              fill
              className="object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
