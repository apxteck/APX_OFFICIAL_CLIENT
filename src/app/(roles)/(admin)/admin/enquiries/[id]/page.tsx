import React, { Suspense } from "react";
import { Metadata } from "next";
import { EnquiryDetailManager } from "./_components/EnquiryDetailManager";
import { enquiriesService } from "@/services/admin/enquiries.service";
import EnquiriesLoading from "../loading";

export const metadata: Metadata = {
  title: "Enquiry Details | APXTeck Admin",
  description: "View and manage enquiry details.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

async function EnquiryDetailFetcher({ id }: { id: string }) {
  try {
    const enquiry = await enquiriesService.getEnquiryById(Number(id));
    if (!enquiry) {
      return <div className="p-8 text-center text-red-500">Enquiry not found</div>;
    }
    return <EnquiryDetailManager initialEnquiry={enquiry} />;
  } catch (error) {
    console.error("Failed to fetch enquiry detail:", error);
    return <div className="p-8 text-center text-red-500">Failed to load enquiry details.</div>;
  }
}

export default async function EnquiryDetailPage(props: PageProps) {
  const params = await props.params;
  
  return (
    <Suspense fallback={<EnquiriesLoading />}>
      <EnquiryDetailFetcher id={params.id} />
    </Suspense>
  );
}
