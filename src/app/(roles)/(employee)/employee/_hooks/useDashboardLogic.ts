import { useState } from 'react';

// Using inline types to mirror what was in the original component,
// ideally these should be imported from shared type definition files.
export interface TaskItem {
  id: string;
  title: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
  dueDate: string;
}

export interface ReimbursementItem {
  id: string;
  title: string;
  amount: number;
  category: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID';
  createdAt: string;
}

export const useDashboardLogic = (
  initialTasks: TaskItem[],
  initialReimbursements: ReimbursementItem[],
  initialAssignedRequests: number
) => {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [reimbursements, setReimbursements] = useState<ReimbursementItem[]>(initialReimbursements);
  const [assignedRequests, setAssignedRequests] = useState<number>(initialAssignedRequests);

  // Reimbursement Form State
  const [claimTitle, setClaimTitle] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [claimCategory, setClaimCategory] = useState('Travel');
  const [isSubmittingClaim, setIsSubmittingClaim] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  const handleApplyReimbursement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimTitle || !claimAmount) return;

    setIsSubmittingClaim(true);
    setClaimSuccess(false);

    // Simulate API call
    setTimeout(() => {
      const newClaim: ReimbursementItem = {
        id: `RMB-${Math.floor(100 + Math.random() * 900)}`,
        title: claimTitle,
        amount: parseFloat(claimAmount),
        category: claimCategory,
        status: 'PENDING',
        createdAt: new Date().toISOString().split('T')[0],
      };

      setReimbursements([newClaim, ...reimbursements]);
      setClaimTitle('');
      setClaimAmount('');
      setClaimCategory('Travel');
      setIsSubmittingClaim(false);
      setClaimSuccess(true);

      setTimeout(() => setClaimSuccess(false), 3000);
    }, 800);
  };

  return {
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
  };
};
