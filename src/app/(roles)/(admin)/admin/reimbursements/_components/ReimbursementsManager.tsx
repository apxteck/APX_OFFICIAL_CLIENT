"use client";
import React from "react";
import { ReimbursementsToolbar } from "./ReimbursementsToolbar";
import { ReimbursementsTable } from "./ReimbursementsTable";
import { ReimbursementReviewModal } from "./ReimbursementReviewModal";
import { Toast } from "./Toast";
import { useReimbursementsLogic } from "../_hooks/useReimbursementsLogic";

export default function ReimbursementsManager() {
  const { toast, setToast } = useReimbursementsLogic();

  return (
    <>
      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
        <ReimbursementsToolbar />
        <div className="flex-1 overflow-auto">
          <ReimbursementsTable />
        </div>
      </div>

      <ReimbursementReviewModal />
      
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
