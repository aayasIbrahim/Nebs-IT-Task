"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  UserCircle,
  Box,
  Share2,
  Users,
  Layout,
  BookOpen,
  FileText,
  ClipboardList,
  ScrollText,
  LogOut,
  User,
  ChevronDown,
  X,
} from "lucide-react";
import Link from "next/link";
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(true);

  const [activeItem, setActiveItem] = useState("Employee");

  const navItems = [
    { icon: <LayoutGrid size={20} />, label: "Dashboard" },
    {
      icon: <UserCircle size={20} />,
      label: "Employee",
      hasSubmenu: true,
      submenu: [
        "Employee Database",
        "Add New Employee",
        "Performance Report",
        "Performance History",
      ],
    },
    { icon: <Box size={20} />, label: "Payroll", href: "/payroll" },
    { icon: <Share2 size={20} />, label: "Pay Slip" },
    { icon: <Users size={20} />, label: "Attendance" },
    { icon: <Layout size={20} />, label: "Request Center" },
    {
      icon: <BookOpen size={20} />,
      label: "Career Database",
      hasSubmenu: true,
    },
    { icon: <FileText size={20} />, label: "Document manager" },
    { icon: <ClipboardList size={20} />, label: "Notice Board",href:"/addNotice" },
    { icon: <ScrollText size={20} />, label: "Activity Log" },
    { icon: <LogOut size={20} />, label: "Exit Interview" },
    { icon: <User size={20} />, label: "Profile" },
  ];

  const handleItemClick = (label: string) => {
    setActiveItem(label);
    if (label === "Employee") {
      setIsEmployeeOpen(!isEmployeeOpen);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 flex flex-col transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }
      `}
      >
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              {/* <img src="/Logo.png" alt="Logo" /> */}
              <Image src={"/Logo.png"} alt="Logo" width={150} height={27.55555534362793} />
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 text-slate-400 hover:text-slate-600"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4 overflow-y-auto custom-scrollbar">
          {navItems.map((item, index) => {
            const isActive = activeItem === item.label;

            return (
              <div key={index}>
                <Link
                  href={item.href || "#"}
                  onClick={() => handleItemClick(item.label)}
                  className={`w-full flex items-center justify-between px-4 py-3 transition-all group
                    ${
                      isActive
                        ? "bg-slate-50 text-slate-900 border-r-4 border-[#FF5722] rounded-l-xl rounded-r-[14px] shadow-sm"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`${
                        isActive
                          ? "text-[#FF5722]"
                          : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-inter font-normal text-[#232948] text-[14px] leading-[22px] tracking-normal ">
                      {item.label}
                    </span>
                  </div>
                  {item.hasSubmenu && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        item.label === "Employee" && isEmployeeOpen
                          ? "rotate-180"
                          : ""
                      } ${isActive ? "text-slate-900" : "text-slate-400"}`}
                    />
                  )}
                </Link>

                {/* Submenu Logic */}
                {item.label === "Employee" &&
                  isEmployeeOpen &&
                  item.submenu && (
                    <div className="bg-slate-50/50 mt-1 rounded-xl">
                      {item.submenu.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => setActiveItem(subItem)} // সাবমেনু ক্লিক করলেও একটিভ হবে
                          className={`w-full text-left pl-14 pr-4 py-2.5 text-[14px] font-medium transition-colors
                          ${
                            activeItem === subItem
                              ? "text-[#FF5722]"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          {subItem}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
