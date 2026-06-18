import React, { Suspense } from "react";
// Removed dynamic import
import { portfolioService } from "@/services/admin/portfolio.service";
import PortfolioLoading from "./loading";

import PortfolioManager from './_components/PortfolioManager';

async function PortfolioFetcher() {
  let initialPortfolios: import("@/services/admin/portfolio.service").Portfolio[] = [];
  try {
    const data = await portfolioService.getAllPortfoliosAdmin({ limit: 100 });
    initialPortfolios = data || [];
  } catch (error) {
    console.error("Failed to pre-fetch portfolios:", error);
  }

  return <PortfolioManager initialPortfolios={initialPortfolios} />;
}

export default function PortfolioManagementPage() {
  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto pb-safe pb-10 px-4 sm:px-6 md:px-8">
      <Suspense fallback={<PortfolioLoading />}>
        <PortfolioFetcher />
      </Suspense>
    </div>
  );
}
