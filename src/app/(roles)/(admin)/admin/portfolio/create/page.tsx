"use client";

import React from "react";
import PortfolioForm from "../_components/PortfolioForm";

export default function CreatePortfolioPage() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-safe px-4 sm:px-6 md:px-8">
      <PortfolioForm mode="create" />
    </div>
  );
}
