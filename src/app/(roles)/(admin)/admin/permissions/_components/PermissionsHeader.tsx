import React from 'react';
import { Key } from 'lucide-react';

export function PermissionsHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
          <Key className="w-8 h-8 text-indigo-500" />
          Module Access Control
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
          Configure Read, Create, Update, and Delete permissions for each role across all system
          modules.
        </p>
      </div>
    </div>
  );
}
