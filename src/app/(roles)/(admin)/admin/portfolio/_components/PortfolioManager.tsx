"use client";
import React from "react";
import { PortfolioHeader } from "./PortfolioHeader";
import { PortfolioToolbar } from "./PortfolioToolbar";
import { PortfolioGrid } from "./PortfolioGrid";
import { Toast } from "./Toast";
import { usePortfolioLogic } from "../_hooks/usePortfolioLogic";

export default function PortfolioManager() {
  const { toast, setToast } = usePortfolioLogic();

  return (
    <>
      <PortfolioHeader />
      
      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col mt-6">
        <PortfolioToolbar />
        <div className="p-6 overflow-auto bg-gray-50 dark:bg-[#151515] min-h-[400px]">
          <PortfolioGrid />
        </div>
      </div>
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </>
  );
}
