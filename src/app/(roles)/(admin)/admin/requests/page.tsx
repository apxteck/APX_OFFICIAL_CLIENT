"use client";
import React from "react";

import dynamic from "next/dynamic";

const RequestsManager = dynamic(() => import("./_components/RequestsManager"), {
  ssr: false,
});

export default function ServiceRequestsPage() {
  return (
    <div className="max-w-7xl mx-auto pb-10">
      <RequestsManager />
    </div>
  );
}
