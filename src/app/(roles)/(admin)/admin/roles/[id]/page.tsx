import React from "react";
import { rolesService } from "@/services/admin/roles.service";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { RoleDetailClient } from "../_components/RoleDetailClient";

export default async function RoleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const roleId = Number(resolvedParams.id);
  
  if (!roleId) {
    return null;
  }

  let role = null;
  let permissions: import("@/services/admin/roles.service").PermRow[] = [];

  try {
    const allRoles = await rolesService.getRoles();
    role = allRoles.find(r => r.id === roleId);

    if (role) {
      const permsData = await rolesService.getRolePermissions(roleId);
      if (permsData && permsData.permissions) {
        permissions = permsData.permissions;
      }
    }
  } catch (error) {
    console.error("Error pre-fetching role details:", error);
  }

  if (!role) {
    return (
      <div className="text-center py-20">
        <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Role Not Found</h2>
        <Link href="/admin/roles" className="mt-4 inline-block text-indigo-600 hover:underline">
          Return to Roles
        </Link>
      </div>
    );
  }

  return <RoleDetailClient initialRole={role} initialPermissions={permissions} />;
}
