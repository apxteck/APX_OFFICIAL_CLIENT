import React from 'react';
import { usersService, Role } from '@/services/admin/users.service';
import { CreateUserClient } from '../_components/CreateUserClient';

export default async function CreateUserPage() {
  let initialRoles: Role[] = [];
  try {
    const rolesData = await usersService.getRoles();
    if (rolesData) initialRoles = rolesData;
  } catch (err) {
    console.error('Failed to load roles', err);
  }

  return <CreateUserClient initialRoles={initialRoles} />;
}
