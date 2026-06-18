'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/providers/AuthProvider';
import { useDashboardLogic, TaskItem, ReimbursementItem } from '../_hooks/useDashboardLogic';
import { DashboardHeader } from './DashboardHeader';
import { DashboardStats } from './DashboardStats';
import { DashboardTasks } from './DashboardTasks';
import { DashboardReimbursementForm } from './DashboardReimbursementForm';
import { DashboardReimbursementsTable } from './DashboardReimbursementsTable';

interface DashboardManagerProps {
  initialTasks: TaskItem[];
  initialReimbursements: ReimbursementItem[];
  initialAssignedRequests: number;
}

export default function DashboardManager({
  initialTasks,
  initialReimbursements,
  initialAssignedRequests,
}: DashboardManagerProps) {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  const {
    tasks,
    reimbursements,
    assignedRequests,
    claimTitle,
    setClaimTitle,
    claimAmount,
    setClaimAmount,
    claimCategory,
    setClaimCategory,
    isSubmittingClaim,
    claimSuccess,
    handleApplyReimbursement,
  } = useDashboardLogic(initialTasks, initialReimbursements, initialAssignedRequests);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        <DashboardHeader user={user} />

        <DashboardStats
          tasks={tasks}
          reimbursements={reimbursements}
          assignedRequests={assignedRequests}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <DashboardTasks tasks={tasks} />

          <DashboardReimbursementForm
            claimTitle={claimTitle}
            setClaimTitle={setClaimTitle}
            claimAmount={claimAmount}
            setClaimAmount={setClaimAmount}
            claimCategory={claimCategory}
            setClaimCategory={setClaimCategory}
            isSubmittingClaim={isSubmittingClaim}
            claimSuccess={claimSuccess}
            handleApplyReimbursement={handleApplyReimbursement}
          />
        </div>

        <DashboardReimbursementsTable reimbursements={reimbursements} />
      </motion.div>
    </div>
  );
}
