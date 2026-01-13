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
  { icon: <LayoutGrid size={20} />, label: "Dashboard", href: "/dashbord" },
  {
    icon: <UserCircle size={20} />,
    label: "Employee",
    hasSubmenu: true,
    submenu: [
      { label: "Employee Database", href: "/employee/database" },
      { label: "Add New Employee", href: "/employee/add" },
      { label: "Performance Report", href: "/employee/report" },
      { label: "Performance History", href: "/employee/history" },
    ],
  },
  {
    icon: <ClipboardList size={20} />,
    label: "Notice Board",
    hasSubmenu: true,
    submenu: [
      { label: "Add Notice", href: "/addNotice" },
      { label: "Notice Management", href: "/notice-board" },
    ],
  },
  { icon: <Box size={20} />, label: "Payroll", href: "/payroll" },
  { icon: <Share2 size={20} />, label: "Pay Slip", href: "/payroll/pay-slip" }, // added href
  { icon: <Users size={20} />, label: "Attendance", href: "/attendance" }, // added href
  { icon: <Layout size={20} />, label: "Request Center", href: "/request-center" }, // added href
  {
    icon: <BookOpen size={20} />,
    label: "Career Database",
    hasSubmenu: true,
    href: "/career-database", // added href
  },
  { icon: <FileText size={20} />, label: "Document manager", href: "/document-manager" }, // added href
  { icon: <ScrollText size={20} />, label: "Activity Log", href: "/activity-log" }, // added href
  { icon: <LogOut size={20} />, label: "Exit Interview", href: "/exit-interview" }, // added href
  { icon: <User size={20} />, label: "Profile", href: "/profile" }, // added href
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
              <Image
                src={"/Logo.png"}
                alt="Logo"
                width={150}
                height={27.55555534362793}
              />
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
                {item.hasSubmenu &&
                  (item.label === "Employee"
                    ? isEmployeeOpen
                    : activeItem === item.label) &&
                  item.submenu && (
                    <div className="bg-slate-50/50 mt-1 rounded-xl">
                      {item.submenu.map((subItem, subIndex) => {
                        const isSubActive = activeItem === subItem.label;

                        return (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            onClick={() => setActiveItem(subItem.label)}
                            className={`w-full flex items-center pl-14 pr-4 py-2.5 text-[14px] font-medium transition-colors
            ${
              isSubActive
                ? "text-[#FF5722]"
                : "text-slate-500 hover:text-slate-800"
            }`}
                          >
                            {subItem.label}
                          </Link>
                        );
                      })}
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
