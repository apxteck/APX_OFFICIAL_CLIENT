import React, { Suspense } from "react";
import { Metadata } from "next";
import { CompanyAssetsManager } from "./_components/CompanyAssetsManager";
import CompanyAssetsLoading from "./loading";
import { companyAssetsService } from "@/services/admin/companyAssets.service";
import { CompanyAsset } from "@/services/admin/companyAssets.service";

export const metadata: Metadata = {
  title: "Company Assets | APXTeck Admin",
  description: "Manage physical and digital company resources.",
};

async function CompanyAssetsDataFetcher() {
  let initialAssets: CompanyAsset[] = [];
  try {
    const response = await companyAssetsService.getAllCompanyAssets({ limit: 100 });
    initialAssets = response.data || [];
  } catch (error) {
    console.error("Failed to fetch initial company assets:", error);
  }
  return <CompanyAssetsManager initialAssets={initialAssets} />;
}

export default function CompanyAssetsPage() {
  return (
    <Suspense fallback={<CompanyAssetsLoading />}>
      <div className="space-y-6">
        <CompanyAssetsDataFetcher />
      </div>
    </Suspense>
  );
}
