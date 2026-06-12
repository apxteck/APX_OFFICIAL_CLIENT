"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const RequestsManager = dynamic(() => import('./_components/RequestsManager'), {
  ssr: false,
});

export default function CustomerRequestsPage() {
  return <RequestsManager />;
}

