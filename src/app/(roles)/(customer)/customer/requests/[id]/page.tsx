import React from 'react';
// Removed dynamic import
import { api } from '@/lib/axios';

import RequestDetailsManager from './_components/RequestDetailsManager';

export default async function RequestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  let initialRequest = null;
  
  try {
    const data = await api.getMyRequestById(Number(resolvedParams.id));
    if (data) {
      initialRequest = data;
    }
  } catch (error) {
    console.error(`Failed to fetch initial request details for ${resolvedParams.id}:`, error);
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-safe pt-4">
      <RequestDetailsManager id={resolvedParams.id} initialRequest={initialRequest} />
    </div>
  );
}
