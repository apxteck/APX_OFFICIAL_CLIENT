'use client';

import React from 'react';
import { PortfolioHeader } from './PortfolioHeader';
import { PortfolioToolbar } from './PortfolioToolbar';
import { PortfolioGrid } from './PortfolioGrid';
import { Toast } from './Toast';
import { usePortfolioLogic } from '../_hooks/usePortfolioLogic';
import { Portfolio } from '@/services/admin/portfolio.service';

interface Props {
  initialPortfolios: Portfolio[];
}

export default function PortfolioManager({ initialPortfolios }: Props) {
  const logic = usePortfolioLogic(initialPortfolios);

  return (
    <>
      <PortfolioHeader onCreateClick={logic.navigateToCreate} />

      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col mt-6">
        <PortfolioToolbar searchTerm={logic.searchTerm} setSearchTerm={logic.setSearchTerm} />
        <div className="p-6 overflow-auto bg-gray-50 dark:bg-[#151515] min-h-[400px]">
          <PortfolioGrid
            filteredPortfolios={logic.filteredPortfolios}
            isLoading={logic.isLoading}
            searchTerm={logic.searchTerm}
            onTogglePublish={logic.handleTogglePublish}
            onNavigatePublic={logic.navigateToPublic}
            onNavigateEdit={logic.navigateToEdit}
            onDelete={logic.handleDelete}
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
