import React, { Suspense } from "react";
import { PermissionsHeader } from "./_components/PermissionsHeader";
import { rolesService } from "@/services/admin/roles.service";
import PermissionsLoading from "./loading";
// Removed dynamic import

import PermissionsManager from './_components/PermissionsManager';

async function PermissionsFetcher() {
  let initialRoles: import("@/services/admin/roles.service").Role[] = [];
  try {
    const roles = await rolesService.getRoles();
    initialRoles = roles || [];
  } catch (error) {
    console.error("Failed to pre-fetch roles:", error);
  }

  return <PermissionsManager initialRoles={initialRoles} />;
}

export default function ModuleAccessPage() {
  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto pb-safe pb-12 px-4 sm:px-6 md:px-8">
      <PermissionsHeader />
      <Suspense fallback={<PermissionsLoading />}>
        <PermissionsFetcher />
      </Suspense>
    </div>
  );
}
