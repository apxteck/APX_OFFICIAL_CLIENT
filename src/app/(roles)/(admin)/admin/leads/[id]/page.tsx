import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { LeadDetailManager } from './_components/LeadDetailManager';
import { leadsService } from '@/services/admin/leads.service';
import LeadsLoading from '../loading';

export const metadata: Metadata = {
  title: 'Lead Details | APXTeck Admin',
  description: 'View and manage lead opportunity details.',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

async function LeadDetailFetcher({ id }: { id: string }) {
  try {
    const [lead, followUps] = await Promise.all([
      leadsService.getLeadById(Number(id)),
      leadsService.getLeadFollowUps(Number(id)),
    ]);

    if (!lead) {
      return <div className="p-8 text-center text-red-500">Lead not found</div>;
    }

    return <LeadDetailManager initialLead={lead} initialFollowUps={followUps} />;
  } catch (error) {
    console.error('Failed to fetch lead detail:', error);
    return <div className="p-8 text-center text-red-500">Failed to load lead details.</div>;
  }
}

export default async function LeadDetailPage(props: PageProps) {
  const params = await props.params;

  return (
    <Suspense fallback={<LeadsLoading />}>
      <LeadDetailFetcher id={params.id} />
    </Suspense>
  );
}
