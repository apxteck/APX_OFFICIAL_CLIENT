import React from "react";
import { Metadata } from "next";
import { EnquiriesManager } from "./_components/EnquiriesManager";

export const metadata: Metadata = {
  title: "Enquiries | APXTeck Admin",
  description: "Manage and review customer enquiries.",
};

export default function EnquiriesPage() {
  return <EnquiriesManager />;
}
