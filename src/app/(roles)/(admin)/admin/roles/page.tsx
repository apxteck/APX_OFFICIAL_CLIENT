import React, { Suspense } from 'react';
import { rolesService } from '@/services/admin/roles.service';
import RolesLoading from './loading';
// Removed dynamic import

import RolesManager from './_components/RolesManager';

async function RolesFetcher() {
  let initialRoles: import('@/services/admin/roles.service').Role[] = [];
  try {
    const data = await rolesService.getRoles();
    initialRoles = data || [];
  } catch (error) {
    console.error('Failed to pre-fetch roles:', error);
  }

  return <RolesManager initialRoles={initialRoles} />;
}

export default function RolesManagementPage() {
  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto pb-safe pb-12 px-4 sm:px-6 md:px-8">
      <Suspense fallback={<RolesLoading />}>
        <RolesFetcher />
      </Suspense>
    </div>
  );
}
