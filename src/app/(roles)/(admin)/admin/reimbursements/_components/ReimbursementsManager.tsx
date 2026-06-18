"use client";

import React from "react";
import { ReimbursementsToolbar } from "./ReimbursementsToolbar";
import { ReimbursementsTable } from "./ReimbursementsTable";
import { ReimbursementReviewModal } from "./ReimbursementReviewModal";
import { Toast } from "./Toast";
import { useReimbursementsLogic } from "../_hooks/useReimbursementsLogic";
import { Reimbursement } from "@/services/admin/reimbursements.service";

interface Props {
  initialReimbursements: Reimbursement[];
}

export default function ReimbursementsManager({ initialReimbursements }: Props) {
  const logic = useReimbursementsLogic(initialReimbursements);

  return (
    <>
      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
        <ReimbursementsToolbar 
          searchTerm={logic.searchTerm}
          setSearchTerm={logic.setSearchTerm}
        />
        <div className="flex-1 overflow-auto">
          <ReimbursementsTable 
            filteredData={logic.filteredData}
            isLoading={logic.isLoading}
            searchTerm={logic.searchTerm}
            onSelectRequest={logic.setSelectedRequest}
          />
        </div>
      </div>

      <ReimbursementReviewModal 
        selectedRequest={logic.selectedRequest}
        reviewNote={logic.reviewNote}
        setReviewNote={logic.setReviewNote}
        onClose={() => {
          logic.setSelectedRequest(null);
          logic.setReviewNote("");
        }}
        onUpdateStatus={logic.handleUpdateStatus}
      />
      
      {logic.toast && (
        <Toast 
          message={logic.toast.message} 
          type={logic.toast.type} 
          onClose={() => logic.setToast(null)} 
        />
      )}
    </>
  );
}
