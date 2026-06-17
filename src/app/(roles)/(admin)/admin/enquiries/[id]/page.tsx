import React from "react";
import { Metadata } from "next";
import { EnquiryDetailManager } from "./_components/EnquiryDetailManager";

export const metadata: Metadata = {
  title: "Enquiry Details | APXTeck Admin",
  description: "View and manage enquiry details.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EnquiryDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  return <EnquiryDetailManager enquiryId={id} />;
}
