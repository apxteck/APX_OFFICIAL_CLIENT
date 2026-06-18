import React, { Suspense } from "react";
import { Metadata } from "next";
import { EnquiriesManager } from "./_components/EnquiriesManager";
import EnquiriesLoading from "./loading";
import { enquiriesService, Enquiry } from "@/services/admin/enquiries.service";

export const metadata: Metadata = {
  title: "Enquiries | APXTeck Admin",
  description: "Manage and review customer enquiries.",
};

async function EnquiriesDataFetcher() {
  let initialEnquiries: Enquiry[] = [];
  try {
    const data = await enquiriesService.getEnquiries();
    initialEnquiries = data || [];
  } catch (error) {
    console.error("Failed to fetch initial enquiries:", error);
  }
  return <EnquiriesManager initialEnquiries={initialEnquiries} />;
}

export default function EnquiriesPage() {
  return (
    <Suspense fallback={<EnquiriesLoading />}>
      <EnquiriesDataFetcher />
    </Suspense>
  );
}
