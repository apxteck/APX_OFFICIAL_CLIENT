import React from "react";
import { Banknote } from "lucide-react";

export function ReimbursementsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Banknote size={24} />
          </div>
          Reimbursements
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2">
          Review and approve employee expense claims.
        </p>
      </div>
    </div>
  );
}
