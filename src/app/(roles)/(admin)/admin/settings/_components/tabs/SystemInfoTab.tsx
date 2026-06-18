"use client";
import React, { useEffect, useState } from "react";
import { Activity, Cpu, MonitorSmartphone, Laptop, Globe, Wifi } from "lucide-react";
import { ToastState } from "../SettingsManager";

interface Props {
  setToast: (toast: ToastState) => void;
}

export function SystemInfoTab({ setToast }: Props) {
  const [browserInfo, setBrowserInfo] = useState({ agent: "", language: "", platform: "", online: true });

  useEffect(() => {
    setBrowserInfo({
      agent: navigator.userAgent.split(" ")[0],
      language: navigator.language,
      platform: navigator.platform || "Unknown",
      online: navigator.onLine
    });
  }, []);

  return (
    <div className="bg-white dark:bg-[#111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-white/5">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Enhanced System Information</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Real-time diagnostics of your current administrative session.</p>
      </div>

      <div className="p-6 min-h-[400px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-[#151515] border border-gray-100 dark:border-white/5 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Backend API</p>
              <p className="text-lg font-black text-gray-900 dark:text-white mt-0.5">Online & Active</p>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-[#151515] border border-gray-100 dark:border-white/5 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
              <Cpu size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Frontend Engine</p>
              <p className="text-lg font-black text-gray-900 dark:text-white mt-0.5">Next.js React</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-[#151515] border border-gray-100 dark:border-white/5 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
              <MonitorSmartphone size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Environment</p>
              <p className="text-lg font-black text-gray-900 dark:text-white mt-0.5">{process.env.NODE_ENV === 'development' ? 'Development' : 'Production'}</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-[#151515] border border-gray-100 dark:border-white/5 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
              <Laptop size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client Platform</p>
              <p className="text-lg font-black text-gray-900 dark:text-white mt-0.5">{browserInfo.platform}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-[#151515] border border-gray-100 dark:border-white/5 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Globe size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Browser Lang</p>
              <p className="text-lg font-black text-gray-900 dark:text-white mt-0.5">{browserInfo.language.toUpperCase()}</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-[#151515] border border-gray-100 dark:border-white/5 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl">
              <Wifi size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Connection</p>
              <p className="text-lg font-black text-gray-900 dark:text-white mt-0.5">{browserInfo.online ? 'Connected' : 'Offline'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
