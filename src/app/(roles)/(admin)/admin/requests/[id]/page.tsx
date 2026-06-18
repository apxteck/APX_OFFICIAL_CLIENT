import React from 'react';
import { requestsService } from '@/services/admin/requests.service';
import { usersService } from '@/services/admin/users.service';
import { Layers } from 'lucide-react';
import Link from 'next/link';
import { RequestDetailClient } from '../_components/RequestDetailClient';

export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  let request = null;
  let admins: import('@/services/admin/users.service').User[] = [];

  try {
    const [reqData, usersData] = await Promise.all([
      requestsService.getRequestDetail(resolvedParams.id),
      usersService.getUsers(),
    ]);
    request = reqData;

    if (usersData) {
      admins = usersData
        .filter(
          (u) =>
            u.role?.name === 'SUPER_ADMIN' ||
            u.role?.name === 'ADMIN' ||
            u.role?.name?.includes('STAFF') ||
            u.role?.name?.includes('EMPLOYEE') ||
            u.role?.name === 'EMPLOYEE'
        )
        .sort((a, b) => {
          const roleA = a.role?.name || 'Z_UNKNOWN';
          const roleB = b.role?.name || 'Z_UNKNOWN';
          if (roleA !== roleB) {
            return roleA.localeCompare(roleB);
          }
          return a.fullName.localeCompare(b.fullName);
        });
    }
  } catch (error) {
    console.error('Failed to load request or users:', error);
  }

  if (!request) {
    return (
      <div className="flex flex-col h-64 items-center justify-center gap-4">
        <Layers size={48} className="text-gray-500" />
        <h2 className="text-xl font-bold text-white">Request Not Found</h2>
        <Link href="/admin/requests" className="text-indigo-400 hover:text-indigo-300">
          Return to Service Requests
        </Link>
      </div>
    );
  }

  return <RequestDetailClient initialData={request} initialAdmins={admins} />;
}
