"use client";
import React from "react";
import { RequestsHeader } from "./RequestsHeader";
import { RequestsTable } from "./RequestsTable";

export default function RequestsManager() {
  return (
    <div className="space-y-6">
      <RequestsHeader />
      <RequestsTable />
    </div>
  );
}
