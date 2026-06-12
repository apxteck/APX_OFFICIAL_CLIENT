"use client";
import React from "react";
import { PaymentsHeader } from "./_components/PaymentsHeader";

import dynamic from "next/dynamic";

// Lazy load the client-heavy manager component
const PaymentsManager = dynamic(() => import("./_components/PaymentsManager"), {
  ssr: false, // Prevents hydration mismatch and reduces initial JS bundle size
});

export default function PaymentsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PaymentsHeader />
      <PaymentsManager />
    </div>
  );
}
