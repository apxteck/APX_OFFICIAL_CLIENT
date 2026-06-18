"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Phone, Calendar, CheckCircle } from "lucide-react";
import { enquiriesService, Enquiry, EnquiryStatus } from "@/services/admin/enquiries.service";
import toast from "react-hot-toast";

interface Props {
  initialEnquiry: Enquiry;
}

export function EnquiryDetailManager({ initialEnquiry }: Props) {
  const router = useRouter();
  const [enquiry, setEnquiry] = useState<Enquiry>(initialEnquiry);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: EnquiryStatus) => {
    if (!enquiry) return;
    setIsUpdating(true);
    try {
      await enquiriesService.updateEnquiryStatus(enquiry.id, newStatus);
      setEnquiry({ ...enquiry, status: newStatus });
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!enquiry) {
    return <div className="p-8 text-center text-red-500">Enquiry not found</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-safe pb-10 px-4 sm:px-6 md:px-8">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 min-h-[44px] text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={16} /> Back to Enquiries
      </button>

      <div className="bg-white dark:bg-[#111111] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Enquiry Details</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-gray-500 dark:text-gray-400">
                <User size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                <p className="font-medium text-gray-900 dark:text-white">{enquiry.fullName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-gray-500 dark:text-gray-400">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">{enquiry.email}</p>
              </div>
            </div>
            
            {enquiry.phone && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-gray-500 dark:text-gray-400">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="font-medium text-gray-900 dark:text-white">{enquiry.phone}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-gray-500 dark:text-gray-400">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Date Received</p>
                <p className="font-medium text-gray-900 dark:text-white">{new Date(enquiry.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-gray-500 dark:text-gray-400">
                <CheckCircle size={20} />
              </div>
              <div className="flex-1 max-w-[200px]">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                <select
                  value={enquiry.status}
                  onChange={(e) => handleStatusChange(e.target.value as EnquiryStatus)}
                  disabled={isUpdating}
                  className="block w-full text-sm font-medium px-3 py-1.5 min-h-[44px] border border-gray-200 dark:border-white/10 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white disabled:opacity-50"
                >
                  <option value="NEW">NEW</option>
                  <option value="SEEN">SEEN</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="INTERESTED">INTERESTED</option>
                  <option value="NEGOTIATING">NEGOTIATING</option>
                  <option value="CONVERTED">CONVERTED</option>
                  <option value="LOST">LOST</option>
                </select>
              </div>
            </div>

            {enquiry.serviceInterest && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Service Interest</p>
                <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-medium">
                  {enquiry.serviceInterest}
                </span>
              </div>
            )}
          </div>
        </div>

        {enquiry.businessName && (
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Business/Company Name</p>
            <p className="text-gray-900 dark:text-white font-medium">{enquiry.businessName}</p>
          </div>
        )}

      </div>
    </div>
  );
}

