"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Shield, User as UserIcon, Settings, MoreVertical } from "lucide-react";
import DataTable, { ColumnDef } from "@/components/ui/admin/DataTable";
import UserAvatar from "@/components/ui/admin/UserAvatar";
import { User } from "@/services/admin/users.service";
import { useUsersLogic } from "../_hooks/useUsersLogic";

export function UsersTable() {
  const { filteredUsers, isLoading, setSearchTerm, currentSort, setCurrentSort } = useUsersLogic();

  const sortOptions = [
    { label: "Newest Joined", value: "newest" },
    { label: "Oldest Joined", value: "oldest" },
    { label: "Name (A-Z)", value: "name_asc" },
    { label: "Name (Z-A)", value: "name_desc" },
  ];

  const columns = useMemo<ColumnDef<User>[]>(() => [
    {
      header: "User",
      cell: (user) => (
        <div className="flex items-center gap-3">
          <UserAvatar 
            name={user.fullName} 
            src={user.profile?.profilePhotoUrl} 
            size="lg" 
          />
          <div>
            <p className="font-bold text-gray-900 dark:text-white">{user.fullName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Phone",
      accessorKey: "phone",
      cell: (user) => <span className="font-medium">{user.phone}</span>
    },
    {
      header: "Role",
      cell: (user) => (
        <div className="flex items-center gap-2">
          {user.role?.name === "SUPER_ADMIN" ? (
            <Shield size={14} className="text-emerald-500" />
          ) : user.role?.name === "ADMIN" ? (
            <Settings size={14} className="text-indigo-500" />
          ) : (
            <UserIcon size={14} className="text-gray-500" />
          )}
          <span className="font-bold text-xs uppercase tracking-wider bg-gray-50 dark:bg-white/5 px-2.5 py-1 rounded-md text-gray-700 dark:text-gray-300">
            {user.role?.name || "UNKNOWN"}
          </span>
        </div>
      )
    },
    {
      header: "Status",
      cell: (user) => (
        <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${
          user.isActive 
            ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
            : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
        }`}>
          {user.isActive ? "ACTIVE" : "INACTIVE"}
        </span>
      )
    },
    {
      header: "Joined",
      cell: (user) => (
        <span className="text-sm font-medium">
          {format(new Date(user.createdAt), "MMM dd, yyyy")}
        </span>
      )
    },
    {
      header: "Actions",
      cell: (user) => (
        <div className="flex items-center gap-2">
          <Link 
            href={`/admin/users/${user.id}`}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 transition-colors"
          >
            View Profile
          </Link>
          <button className="p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      )
    }
  ], []);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-gray-200 dark:border-white/10 border-t-indigo-600 dark:border-t-indigo-500 animate-spin"></div>
      </div>
    );
  }

  return (
    <DataTable 
      data={filteredUsers}
      columns={columns}
      searchPlaceholder="Search by name, email, or phone..."
      onSearch={setSearchTerm}
      sortOptions={sortOptions}
      currentSort={currentSort}
      onSortChange={setCurrentSort}
    />
  );
}
