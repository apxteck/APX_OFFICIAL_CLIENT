"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart2,
  Users,
  ClipboardList,
  CreditCard,
  FileText,
  TrendingUp,
  CheckSquare,
  Receipt,
  Monitor,
  Layout,
  Settings,
  LogOut,
  Menu,
  PanelLeftClose
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";

const NAV_GROUPS = [
  {
    title: "OVERVIEW",
    items: [
      { name: "Dashboard", href: "/admin", icon: BarChart2, module: "ALWAYS_SHOW" },
    ]
  },
  {
    title: "MANAGEMENT",
    items: [
      { name: "Users & Roles", href: "/admin/users", icon: Users, module: "USER_ROLE_MANAGEMENT" },
      { name: "Service Requests", href: "/admin/requests", icon: ClipboardList, module: "ORDER_PAYMENT_MANAGEMENT" },
      { name: "Payments", href: "/admin/payments", icon: CreditCard, module: "ORDER_PAYMENT_MANAGEMENT" },
    ]
  },
  {
    title: "OPERATIONS",
    items: [
      { name: "Leads & CRM", href: "/admin/leads", icon: TrendingUp, module: "LEADS_ACCESS_MANAGEMENT" },
      { name: "Tasks", href: "/admin/tasks", icon: CheckSquare, module: "TASK_NOTIFICATION_MANAGEMENT" },
      { name: "Reimbursements", href: "/admin/reimbursements", icon: Receipt, module: "ORDER_PAYMENT_MANAGEMENT" },
    ]
  },
  {
    title: "MARKETING & CONTENT",
    items: [
      { name: "Blog", href: "/admin/blog", icon: FileText, module: "BLOG_MANAGEMENT" },
      { name: "Advertisements", href: "/admin/ads", icon: Monitor, module: "ADVERTISEMENT_MANAGEMENT" },
      { name: "Content", href: "/admin/content/faqs", icon: Layout, module: "CONTENT_MANAGEMENT" },
    ]
  },
  {
    title: "SYSTEM",
    items: [
      { name: "Settings", href: "/admin/settings", icon: Settings, module: "ALWAYS_SHOW" },
    ]
  }
];

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter NAV_GROUPS based on user permissions
  const filteredGroups = NAV_GROUPS.map(group => ({
    ...group,
    items: group.items.filter(item => {
      if (item.module === "ALWAYS_SHOW") return true;
      if (user?.role === "SUPER_ADMIN") return true;
      if (!user?.permissions) return false;
      return user.permissions[item.module]?.canRead === true;
    })
  })).filter(group => group.items.length > 0);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <motion.aside
      initial={{ width: 260 }}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-white dark:bg-[#111111] border-r border-gray-200 dark:border-white/5 flex flex-col sticky top-0 z-50 shadow-sm transition-colors duration-300 overflow-hidden"
    >
      {/* Header Section */}
      <div className="h-20 flex items-center justify-center border-b border-gray-100 dark:border-white/5 px-4 shrink-0">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between w-full h-full"
            >
              <div className="flex-1 flex justify-center">
                <div className="relative w-32 h-8 drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                  <Image 
                    src="/APXTeck.png" 
                    alt="APXTeck Logo" 
                    fill 
                    className="object-contain" 
                    priority
                  />
                </div>
              </div>
              <button
                onClick={() => setIsCollapsed(true)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors shrink-0"
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose size={18} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full flex items-center justify-center"
            >
              <button
                onClick={() => setIsCollapsed(false)}
                className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border border-gray-100 dark:border-white/5 shadow-sm transition-all"
                aria-label="Expand sidebar"
              >
                <Menu size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-4 custom-scrollbar">
        {filteredGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="mb-6 last:mb-0">
            {!isCollapsed && (
              <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 tracking-wider mb-3 px-3 transition-colors">
                {group.title}
              </div>
            )}
            <div className="space-y-1">
              {group.items.map((link) => {
                const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/admin');
                const Icon = link.icon;

                return (
                  <Link key={link.href} href={link.href} title={isCollapsed ? link.name : undefined}>
                    <div
                      className={cn(
                        "flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                        isCollapsed ? "justify-center" : "justify-start",
                        isActive
                          ? "bg-indigo-50/80 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold shadow-[0px_2px_10px_rgba(79,70,229,0.05)] dark:shadow-none"
                          : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200 font-medium"
                      )}
                    >
                      <Icon 
                        size={20} 
                        strokeWidth={isActive ? 2.5 : 2}
                        className={cn(
                          "shrink-0 transition-colors", 
                          isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                        )} 
                      />
                      
                      <AnimatePresence mode="wait">
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-3.5 text-[14px] whitespace-nowrap overflow-hidden"
                          >
                            {link.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      
                      {isActive && !isCollapsed && (
                        <motion.div
                          layoutId="sidebar-indicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-r-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout Footer */}
      <div className="p-4 border-t border-gray-100 dark:border-white/5 shrink-0">
        <button 
          onClick={logout}
          title={isCollapsed ? "Log out" : undefined}
          className={cn(
            "flex items-center w-full py-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors group",
            isCollapsed ? "justify-center px-0" : "justify-start px-3"
          )}
        >
          <LogOut size={20} strokeWidth={2} className="shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-3.5 font-bold text-[14px] whitespace-nowrap overflow-hidden"
              >
                Log out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
