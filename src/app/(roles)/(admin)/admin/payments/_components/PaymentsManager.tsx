"use client";
import React from "react";
import { PaymentsToolbar } from "./PaymentsToolbar";
import { PaymentsTable } from "./PaymentsTable";
import { Toast } from "./Toast";
import { usePaymentsLogic } from "../_hooks/usePaymentsLogic";

export default function PaymentsManager() {
  const { toast, setToast } = usePaymentsLogic();

  return (
    <>
      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
        <PaymentsToolbar />
        <div className="flex-1 overflow-auto">
          <PaymentsTable />
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
