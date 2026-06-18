import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { LeadsManager } from './_components/LeadsManager';
import LeadsLoading from './loading';
import { leadsService } from '@/services/admin/leads.service';
import { Lead } from '@/app/types/lead.types';

export const metadata: Metadata = {
  title: 'Leads & CRM | APXTeck Admin',
  description: 'Manage your sales pipeline, track follow-ups, and convert leads.',
};

async function LeadsDataFetcher() {
  let initialLeads: Lead[] = [];
  try {
    const data = await leadsService.getLeads();
    initialLeads = data || [];
  } catch (error) {
    console.error('Failed to fetch initial leads:', error);
  }
  return <LeadsManager initialLeads={initialLeads} />;
}

export default function LeadsPage() {
  return (
    <Suspense fallback={<LeadsLoading />}>
      <LeadsDataFetcher />
    </Suspense>
  );
}
