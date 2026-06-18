"use client";

import React from "react";
import { ServicesHeader } from "./ServicesHeader";
import { ServicesToolbar } from "./ServicesToolbar";
import { ServicesGrid } from "./ServicesGrid";
import { Toast } from "./Toast";
import { useServicesLogic } from "../_hooks/useServicesLogic";
import { Service } from "@/services/admin/services.service";

interface Props {
  initialServices: Service[];
}

export default function ServicesManager({ initialServices }: Props) {
  const logic = useServicesLogic(initialServices);

  return (
    <>
      <ServicesHeader navigateToCreate={logic.navigateToCreate} />
      
      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col mt-6">
        <ServicesToolbar 
          searchTerm={logic.searchTerm} 
          setSearchTerm={logic.setSearchTerm} 
        />
        <div className="p-6 overflow-auto bg-gray-50 dark:bg-[#151515] min-h-[400px]">
          <ServicesGrid 
            filteredServices={logic.filteredServices}
            isLoading={logic.isLoading}
            searchTerm={logic.searchTerm}
            handleToggleActive={logic.handleToggleActive}
            navigateToManageFields={logic.navigateToManageFields}
            navigateToEdit={logic.navigateToEdit}
            handleDelete={logic.handleDelete}
          />
        </div>
      </div>
      
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
