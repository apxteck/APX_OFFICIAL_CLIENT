import React from "react";
import { Metadata } from "next";
import { LeadDetailManager } from "./_components/LeadDetailManager";

export const metadata: Metadata = {
  title: "Lead Details | APXTeck Admin",
  description: "View and manage lead opportunity details.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LeadDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  return <LeadDetailManager leadId={id} />;
}
