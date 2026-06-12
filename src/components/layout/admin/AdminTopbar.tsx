"use client";
import React from "react";
import { Bell, Search, Menu, Home, CheckCircle, AlertCircle, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import GlobalSearch from "./GlobalSearch";
import { useTopbarLogic } from "./hooks/useTopbarLogic";

export default function AdminTopbar() {
  const {
    toggleMobileSidebar,
    user,
    mounted,
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifRef,
    getPageTitle,
  } = useTopbarLogic();

  return (
    <header className="h-20 bg-transparent flex items-center justify-between px-4 md:px-8 z-40">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleMobileSidebar}
          className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tight drop-shadow-sm">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center space-x-4 md:space-x-5">
        <div className="flex items-center space-x-3">
          <Link href="/">
            <button 
              className="px-4 py-2 rounded-xl bg-white dark:bg-[#1a1a1a] flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-[#222] shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all border border-gray-100 dark:border-white/5 hover:border-indigo-500/30"
              title="Go to Public Home"
            >
              <Home size={16} />
              <span className="hidden sm:inline">Home</span>
            </button>
          </Link>

          <ThemeToggle />

          <div className="relative">
            <button 
              onClick={() => {
                setIsGlobalSearchOpen(true);
                setIsNotificationsOpen(false);
              }}
              title="Search (Cmd+K)"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${
                isGlobalSearchOpen 
                  ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/20 dark:border-indigo-500/30 dark:text-indigo-400"
                  : "bg-white dark:bg-[#1a1a1a] border-gray-100 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#222]"
              } shadow-[0_2px_10px_rgba(0,0,0,0.02)]`}
            >
              <Search size={18} />
            </button>
          </div>
          
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsGlobalSearchOpen(false);
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all relative border ${
                isNotificationsOpen
                  ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/20 dark:border-indigo-500/30 dark:text-indigo-400"
                  : "bg-white dark:bg-[#1a1a1a] border-gray-100 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#222]"
              } shadow-[0_2px_10px_rgba(0,0,0,0.02)]`}
            >
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full border-2 border-white dark:border-[#1a1a1a]"></span>
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-14 right-0 md:-right-2 w-[320px] sm:w-[380px] bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-gray-50/50 dark:bg-black/20">
                    <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                    <button className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">Mark all as read</button>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                    {[
                      { title: "System Update", desc: "Version 2.4.1 has been deployed.", time: "2 min ago", icon: AlertCircle, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
                      { title: "New User Registration", desc: "A new admin account was created.", time: "1 hour ago", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
                      { title: "Payment Failed", desc: "Invoice #INV-2024 failed to process.", time: "3 hours ago", icon: X, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
                    ].map((notif, idx) => (
                      <div key={idx} className="flex gap-4 p-4 border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.bg} ${notif.color}`}>
                          <notif.icon size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{notif.title}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{notif.desc}</p>
                          <p className="text-[10px] font-medium text-gray-400 mt-2">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-gray-100 dark:border-white/10">
                    <button className="w-full py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors flex items-center justify-center gap-1">
                      View all notifications <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center pl-4 md:pl-5 border-l border-gray-200 dark:border-white/10 cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-100 to-indigo-50 dark:from-indigo-500/20 dark:to-indigo-500/10 overflow-hidden border border-indigo-200 dark:border-indigo-500/30 shadow-inner flex items-center justify-center shrink-0">
              {mounted && user?.profilePhotoUrl ? (
                <img src={user.profilePhotoUrl} alt={user.fullName} className="w-full h-full object-cover" />
              ) : mounted && user?.fullName ? (
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=4f46e5&color=fff`} alt={user.fullName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">US</div>
              )}
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {mounted && user?.fullName ? user.fullName : "Loading..."}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium capitalize">
                {mounted && user?.role ? user.role.replace(/_/g, " ").toLowerCase() : "User"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <GlobalSearch 
        isOpen={isGlobalSearchOpen} 
        onClose={() => setIsGlobalSearchOpen(false)} 
      />
    </header>
  );
}
