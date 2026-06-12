import React from "react";
import { Metadata } from "next";
import { AdsManager } from "./_components/AdsManager";

export const metadata: Metadata = {
  title: "Advertisements Management | APXTeck Admin",
  description: "Manage banner ads, Google AdSense codes, and placements across the platform.",
};

export default function AdsManagementPage() {
  return <AdsManager />;
}
