import React from 'react';
import Link from 'next/link';
import { PlusCircle, ShieldAlert } from 'lucide-react';

interface Props {
  handleOpenModal: (mode: 'CREATE' | 'EDIT') => void;
}

export function RolesHeader({ handleOpenModal }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 dark:from-white dark:via-indigo-300 dark:to-white">
            Role Management
          </span>
          <ShieldAlert className="text-indigo-600 dark:text-indigo-400" size={32} />
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 font-medium text-base ml-1">
          Configure system roles, access levels, and permissions.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/admin/roles/create"
          className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white border border-transparent px-6 py-3.5 min-h-[44px] rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]"
        >
          <PlusCircle size={18} strokeWidth={2.5} />
          Create Role
        </Link>
      </div>
    </div>
  );
}
