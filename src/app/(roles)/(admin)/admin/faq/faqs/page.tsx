import React from "react";
import { Metadata } from "next";
import { FaqsManager } from "./_components/FaqsManager";

export const metadata: Metadata = {
  title: "FAQs Management | APXTeck Admin",
  description: "Create, edit, and organize Frequently Asked Questions.",
};

export default function FAQsManagementPage() {
  return <FaqsManager />;
}
