"use client";

import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
  className,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={cn(
        "bg-white dark:bg-[#111111] border border-gray-100 dark:border-white/5 rounded-3xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0px_4px_30px_rgba(0,0,0,0.2)] flex flex-col justify-between hover:shadow-[0px_10px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0px_10px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group",
        className
      )}
    >
      <div className="flex items-start justify-between pb-4">
        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400">{title}</h3>
        <div className="w-12 h-12 rounded-2xl bg-indigo-50/80 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 border border-indigo-100/50 dark:border-indigo-500/20">
          <Icon size={22} className="drop-shadow-sm" />
        </div>
      </div>
      
      <div>
        <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">{value}</div>
        
        {(trend || description) && (
          <div className="mt-4 flex items-center gap-2">
            {trend && (
              <span
                className={cn(
                  "font-bold text-sm flex items-center gap-1 px-2.5 py-1 rounded-lg",
                  trend.isPositive 
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10" 
                    : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10"
                )}
              >
                {trend.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(trend.value)}%
              </span>
            )}
            {description && (
              <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">{description}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
