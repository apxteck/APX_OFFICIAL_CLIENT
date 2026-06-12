"use client";
import React from "react";
import { ServicesHeader } from "./ServicesHeader";
import { ServicesToolbar } from "./ServicesToolbar";
import { ServicesGrid } from "./ServicesGrid";
import { Toast } from "./Toast";
import { useServicesLogic } from "../_hooks/useServicesLogic";

export default function ServicesManager() {
  const { toast, setToast } = useServicesLogic();

  return (
    <>
      <ServicesHeader />
      
      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col mt-6">
        <ServicesToolbar />
        <div className="p-6 overflow-auto bg-gray-50 dark:bg-[#151515] min-h-[400px]">
          <ServicesGrid />
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
