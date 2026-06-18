import React from "react";
// Removed dynamic import
import { usersService, User, Role } from "@/services/admin/users.service";

import UsersManager from './_components/UsersManager';

export default async function UsersManagementPage() {
  let initialUsers: User[] = [];
  let initialRoles: Role[] = [];

  try {
    const [usersData, rolesData] = await Promise.all([
      usersService.getUsers(),
      usersService.getRoles()
    ]);
    if (usersData) initialUsers = usersData;
    if (rolesData) initialRoles = rolesData;
  } catch (error) {
    console.error("Failed to fetch initial users or roles:", error);
  }

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-safe pt-4">
      <UsersManager initialUsers={initialUsers} initialRoles={initialRoles} />
    </div>
  );
}
