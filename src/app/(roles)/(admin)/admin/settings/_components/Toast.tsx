"use client";
import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "loading";
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    if (type === "loading") return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose, type]);

  const bg = type === "success" 
    ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20" 
    : type === "error" 
    ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:border-red-500/20" 
    : "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/20";
    
  return (
    <div className={`fixed bottom-4 right-4 z-[9999] px-4 py-3 rounded-xl border shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 ${bg}`}>
      {type === "success" && <CheckCircle2 size={18} />}
      {type === "error" && <AlertCircle size={18} />}
      {type === "loading" && <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>}
      <p className="text-sm font-bold">{message}</p>
      {type !== "loading" && (
        <button onClick={onClose} className="ml-2 hover:opacity-70"><XCircle size={16} /></button>
      )}
    </div>
  );
}
