import React, { Suspense } from "react";
import { requestsService } from "@/services/admin/requests.service";
import RequestsLoading from "./loading";
// Removed dynamic import

import RequestsManager from './_components/RequestsManager';

async function RequestsFetcher() {
  let initialRequests: import("@/services/admin/requests.service").ServiceRequest[] = [];
  try {
    const data = await requestsService.getRequests();
    initialRequests = data || [];
  } catch (error) {
    console.error("Failed to pre-fetch requests:", error);
  }

  return <RequestsManager initialRequests={initialRequests} />;
}

export default function ServiceRequestsPage() {
  return (
    <div className="max-w-7xl mx-auto pb-10">
      <Suspense fallback={<RequestsLoading />}>
        <RequestsFetcher />
      </Suspense>
    </div>
  );
}
