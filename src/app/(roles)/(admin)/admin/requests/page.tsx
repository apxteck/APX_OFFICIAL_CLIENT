"use client";

import React, { useEffect, useState } from "react";
import DataTable, { ColumnDef } from "@/components/ui/admin/DataTable";
import { ServiceRequest, requestsService } from "@/services/admin/requests.service";
import { cn } from "@/lib/utils";
import { Eye, Edit, MessageSquare } from "lucide-react";

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await requestsService.getRequests();
        setRequests(data);
      } catch (error) {
        console.error("Failed to load service requests", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const columns: ColumnDef<ServiceRequest>[] = [
    {
      header: "Req ID",
      accessorKey: "id",
      className: "font-mono font-medium",
      cell: (req) => `#${req.id}`,
    },
    {
      header: "Customer",
      cell: (req) => (
        <div>
          <p className="font-medium text-foreground">{req.customerName}</p>
          <p className="text-sm text-muted-foreground">{req.customerEmail}</p>
        </div>
      ),
    },
    {
      header: "Service",
      cell: (req) => (
        <span className="font-medium">{req.serviceType}</span>
      ),
    },
    {
      header: "Status",
      cell: (req) => {
        const statusConfig = {
          NEW: "bg-blue-500/10 text-blue-500 border-blue-500/20",
          IN_REVIEW: "bg-purple-500/10 text-purple-500 border-purple-500/20",
          IN_PROGRESS: "bg-orange-500/10 text-orange-500 border-orange-500/20",
          COMPLETED: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
          CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
        };

        return (
          <span className={cn(
            "px-2.5 py-1 text-xs font-semibold rounded-full border whitespace-nowrap",
            statusConfig[req.status]
          )}>
            {req.status.replace("_", " ")}
          </span>
        );
      },
    },
    {
      header: "Priority",
      cell: (req) => (
        <div className="flex items-center gap-1.5">
          {req.priority === "HIGH" && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
          {req.priority === "MEDIUM" && <span className="w-2 h-2 rounded-full bg-orange-500"></span>}
          {req.priority === "LOW" && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
          <span className="text-sm font-medium">{req.priority}</span>
        </div>
      ),
    },
    {
      header: "Assigned To",
      cell: (req) => (
        <span className={cn(
          "text-sm",
          req.assignedTo ? "font-medium text-foreground" : "text-muted-foreground italic"
        )}>
          {req.assignedTo ? req.assignedTo : "Unassigned"}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (req) => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors" title="View Details">
            <Eye size={16} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-muted text-blue-500 transition-colors" title="Update Status">
            <Edit size={16} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-muted text-emerald-500 transition-colors" title="Message Customer">
            <MessageSquare size={16} />
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
          <h1 className="text-2xl font-bold tracking-tight">Service Requests</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Track and manage customer service requests through their lifecycle.
          </p>
        </div>
      </div>

      <DataTable
        data={requests}
        columns={columns}
        isLoading={isLoading}
        searchPlaceholder="Search by ID, customer name, or service..."
      />
    </div>
  );
}
