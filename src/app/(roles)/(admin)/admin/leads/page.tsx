import React from "react";
import { Metadata } from "next";
import { LeadsManager } from "./_components/LeadsManager";

export const metadata: Metadata = {
  title: "Leads & CRM | APXTeck Admin",
  description: "Manage your sales pipeline, track follow-ups, and convert leads.",
};

export default function LeadsPage() {
  return <LeadsManager />;
}
