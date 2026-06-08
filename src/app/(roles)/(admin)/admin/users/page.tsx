"use client";

import React, { useEffect, useState } from "react";
import DataTable, { ColumnDef } from "@/components/ui/admin/DataTable";
import { User, usersService } from "@/services/admin/users.service";
import { cn } from "@/lib/utils";
import { UserPlus, MoreVertical, Edit, Shield, Trash2 } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await usersService.getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to load users", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns: ColumnDef<User>[] = [
    {
      header: "User",
      cell: (user) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold uppercase shrink-0">
            {user.fullName.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-foreground">{user.fullName}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      cell: (user) => (
        <span className={cn(
          "px-2.5 py-1 text-xs font-semibold rounded-full border",
          user.role.name === "SUPER_ADMIN" ? "bg-red-500/10 text-red-500 border-red-500/20" :
          user.role.name === "ADMIN" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
          "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
        )}>
          {user.role.name.replace("_", " ")}
        </span>
      ),
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Status",
      cell: (user) => (
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", user.isActive ? "bg-emerald-500" : "bg-red-500")}></div>
          <span className="text-sm">{user.isActive ? "Active" : "Inactive"}</span>
        </div>
      ),
    },
    {
      header: "Joined",
      cell: (user) => (
        <span className="text-sm text-muted-foreground">
          {new Date(user.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (user) => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors" title="Edit User">
            <Edit size={16} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-muted text-blue-500 transition-colors" title="Manage Permissions">
            <Shield size={16} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-red-500/10 text-red-500 transition-colors" title="Delete/Deactivate">
            <Trash2 size={16} />
          </button>
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage platform users, roles, and module access permissions.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-sm">
          <UserPlus size={18} />
          Add User
        </button>
      </div>

      <DataTable
        data={users}
        columns={columns}
        isLoading={isLoading}
        searchPlaceholder="Search users by name, email, or role..."
      />
    </div>
  );
}
