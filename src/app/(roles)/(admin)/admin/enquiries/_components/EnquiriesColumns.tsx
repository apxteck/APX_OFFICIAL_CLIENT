import React, { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Phone, Mail, AlertCircle, Eye, Target, PlayCircle, CheckCircle, XCircle } from "lucide-react";
import { ColumnDef } from "@/components/ui/admin/DataTable";
import { Enquiry, enquiriesService, EnquiryStatus } from "@/services/admin/enquiries.service";
import toast from "react-hot-toast";

const StatusCell = ({ enquiry }: { enquiry: Enquiry }) => {
  const [status, setStatus] = useState<EnquiryStatus>(enquiry.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const statusConfig: Record<string, any> = {
    NEW: { color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20", icon: AlertCircle },
    SEEN: { color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-500/10", border: "border-cyan-100 dark:border-cyan-500/20", icon: Eye },
    CONTACTED: { color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-100 dark:border-indigo-500/20", icon: Phone },
    INTERESTED: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-100 dark:border-amber-500/20", icon: Target },
    NEGOTIATING: { color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-100 dark:border-purple-500/20", icon: PlayCircle },
    CONVERTED: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-100 dark:border-emerald-500/20", icon: CheckCircle },
    LOST: { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", border: "border-red-100 dark:border-red-500/20", icon: XCircle }
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as EnquiryStatus;
    setIsUpdating(true);
    try {
      await enquiriesService.updateEnquiryStatus(enquiry.id, newStatus);
      setStatus(newStatus);
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const config = statusConfig[status] || statusConfig.NEW;
  const Icon = config.icon;

  return (
    <div className="flex flex-col gap-1 items-start">
      <div className="relative">
        <select
          value={status}
          onChange={handleStatusChange}
          disabled={isUpdating}
          className={`appearance-none pl-8 pr-6 min-h-[44px] py-1 text-[11px] font-bold rounded-lg border tracking-wide uppercase cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 ${config.bg} ${config.color} ${config.border}`}
        >
          {Object.keys(statusConfig).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <div className={`absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${config.color}`}>
          <Icon size={12} />
        </div>
      </div>
    </div>
  );
};

export const useEnquiriesColumns = (): ColumnDef<Enquiry>[] => {
  const router = useRouter();

  return [
    {
      header: "Enquiry",
      cell: (enquiry) => (
        <div>
          <p className="font-bold text-gray-900 dark:text-white">{enquiry.fullName}</p>
          {enquiry.businessName && <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">{enquiry.businessName}</p>}
          <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-1">Added: {format(new Date(enquiry.createdAt), "MMM dd, yyyy")}</p>
        </div>
      )
    },
    {
      header: "Contact Info",
      cell: (enquiry) => (
        <div className="space-y-1">
          {enquiry.phone && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
              <Phone size={12} className="text-gray-400" />
              <span>{enquiry.phone}</span>
            </div>
          )}
          {enquiry.email && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
              <Mail size={12} className="text-gray-400" />
              <span>{enquiry.email}</span>
            </div>
          )}
        </div>
      )
    },
    {
      header: "Interest",
      accessorKey: "serviceInterest",
      cell: (enquiry) => (
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {enquiry.serviceInterest || "—"}
        </span>
      )
    },
    {
      header: "Source",
      accessorKey: "source",
      cell: (enquiry) => (
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {enquiry.source || "—"}
        </span>
      )
    },
    {
      header: "Status",
      cell: (enquiry) => <StatusCell enquiry={enquiry} />
    },
    {
      header: "Actions",
      cell: (enquiry) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => router.push(`/admin/enquiries/${enquiry.id}`)}
            className="min-h-[44px] px-4 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 transition-colors flex items-center justify-center"
          >
            View Details
          </button>
        </div>
      )
    }
  ];
};
