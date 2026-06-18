import React from 'react';
import { reimbursementsService } from '@/services/admin/reimbursements.service';
import { Layers } from 'lucide-react';
import Link from 'next/link';
import { ReimbursementDetailClient } from '../_components/ReimbursementDetailClient';

export default async function ReimbursementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  if (isNaN(id)) {
    return (
      <div className="flex flex-col h-64 items-center justify-center gap-4">
        <Layers size={48} className="text-gray-500" />
        <h2 className="text-xl font-bold text-white">Invalid Request ID</h2>
        <Link href="/admin/reimbursements" className="text-indigo-400 hover:text-indigo-300">
          Return to Reimbursements
        </Link>
      </div>
    );
  }

  let reimbursement = null;
  try {
    reimbursement = await reimbursementsService.getReimbursementById(id);
  } catch (error) {
    console.error('Failed to load reimbursement:', error);
  }

  if (!reimbursement) {
    return (
      <div className="flex flex-col h-64 items-center justify-center gap-4">
        <Layers size={48} className="text-gray-500" />
        <h2 className="text-xl font-bold text-white">Reimbursement Not Found</h2>
        <Link href="/admin/reimbursements" className="text-indigo-400 hover:text-indigo-300">
          Return to Reimbursements
        </Link>
      </div>
    );
  }

  return <ReimbursementDetailClient initialData={reimbursement} />;
}
