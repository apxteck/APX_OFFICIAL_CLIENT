"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { usersService, UserDetail } from "@/services/admin/users.service";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Shield, User as UserIcon, Mail, Phone, MapPin, Briefcase, 
  Building, Calendar, CreditCard, FileText, CheckCircle, XCircle, Clock, Key 
} from "lucide-react";
import { format } from "date-fns";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "documents" | "permissions">("overview");

  useEffect(() => {
    if (params?.id) {
      usersService.getUserDetail(params.id as string).then((data) => {
        setUser(data);
        setIsLoading(false);
      });
    }
  }, [params]);

  if (isLoading || !user) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-gray-200 dark:border-white/10 border-t-indigo-600 dark:border-t-indigo-500 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.push('/admin/users')}
          className="p-2 bg-white dark:bg-[#111111] hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">User Profile</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Manage details, verify documents, and configure access.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Profile Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#111111] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)]">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img 
                  src={user.profilePhotoUrl || `https://ui-avatars.com/api/?name=${user.fullName}&background=4f46e5&color=fff`} 
                  alt={user.fullName}
                  className="w-24 h-24 rounded-2xl object-cover shadow-md mb-4 border-4 border-white dark:border-[#111111]"
                />
                <div className={`absolute -bottom-2 right-[-8px] px-2.5 py-0.5 rounded-md border-2 border-white dark:border-[#111111] text-[10px] font-bold uppercase tracking-wider ${
                  user.isActive ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                }`}>
                  {user.isActive ? "ACTIVE" : "BLOCKED"}
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.fullName}</h2>
              <div className="flex items-center gap-2 mt-2 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full">
                <Shield size={14} className="text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{user.role.name}</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-gray-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-gray-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar size={16} className="text-gray-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Joined {format(new Date(user.createdAt), "MMM dd, yyyy")}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5">
              <button className={`w-full py-2.5 rounded-xl font-bold text-sm transition-colors border ${
                user.isActive 
                  ? "border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                  : "border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
              }`}>
                {user.isActive ? "Block User" : "Unblock User"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tabs */}
          <div className="bg-white dark:bg-[#111111] p-1.5 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-wrap sm:flex-nowrap gap-1">
            {[
              { id: "overview", icon: UserIcon, label: "Overview" },
              { id: "documents", icon: FileText, label: "Documents" },
              { id: "permissions", icon: Key, label: "Module Access" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === tab.id 
                    ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] min-h-[500px]">
            <AnimatePresence mode="wait">
              
              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 md:p-8 space-y-8">
                  {/* Address Section */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <MapPin size={16} /> Contact Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 dark:bg-white/5 p-6 rounded-2xl">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Address</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{user.address}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">City & State</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{user.city}, {user.state} - {user.pincode}</p>
                      </div>
                    </div>
                  </div>

                  {/* Employee Info Section */}
                  {user.employeeId && (
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Briefcase size={16} /> Employment Info
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-gray-50 dark:bg-white/5 p-6 rounded-2xl">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Employee ID</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{user.employeeId}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Department</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{user.department}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Designation</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{user.designation}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bank Details Section */}
                  {user.bankDetails && (
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Building size={16} /> Bank Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Account Name</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{user.bankDetails.accountName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Bank Name & IFSC</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{user.bankDetails.bankName} ({user.bankDetails.ifsc})</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Account Number</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white font-mono">{user.bankDetails.accountNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">UPI ID</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{user.bankDetails.upiId}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* DOCUMENTS TAB */}
              {activeTab === "documents" && (
                <motion.div key="documents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">KYC & Verification</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{user.documents.length} Documents uploaded</span>
                  </div>

                  <div className="space-y-6">
                    {user.documents.map(doc => (
                      <div key={doc.id} className="border border-gray-100 dark:border-white/10 rounded-2xl p-6 bg-gray-50 dark:bg-[#151515]">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-white/5">
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{doc.type}</h3>
                            <p className="text-sm text-gray-500 font-mono mt-1">{doc.number}</p>
                          </div>
                          
                          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${
                            doc.status === "VERIFIED" ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20" :
                            doc.status === "REJECTED" ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-100 dark:border-red-500/20" :
                            "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20"
                          }`}>
                            {doc.status === "VERIFIED" && <CheckCircle size={14} />}
                            {doc.status === "REJECTED" && <XCircle size={14} />}
                            {doc.status === "PENDING" && <Clock size={14} />}
                            {doc.status}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="aspect-[1.6] bg-gray-200 dark:bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 relative group">
                            <img src={doc.frontUrl} alt="Front" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">View Front</button>
                            </div>
                          </div>
                          {doc.backUrl && (
                            <div className="aspect-[1.6] bg-gray-200 dark:bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 relative group">
                              <img src={doc.backUrl} alt="Back" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">View Back</button>
                              </div>
                            </div>
                          )}
                        </div>

                        {doc.status === "PENDING" && (
                          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
                            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold text-sm transition-colors">
                              Approve Document
                            </button>
                            <button className="flex-1 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-100 dark:border-red-500/20 py-2.5 rounded-xl font-bold text-sm transition-colors">
                              Reject with Note
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* PERMISSIONS TAB */}
              {activeTab === "permissions" && (
                <motion.div key="permissions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-0">
                  <div className="p-6 md:p-8 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Module Permissions</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure CRUD access for this specific user.</p>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm">
                      + Add Override
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 dark:bg-[#1a1a1a] border-y border-gray-100 dark:border-white/5">
                        <tr>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Module</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Create</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Read</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Update</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Delete</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Source</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                        {user.permissions.map((perm, i) => (
                          <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4 font-bold text-gray-900 dark:text-white text-sm">{perm.module}</td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" checked={perm.canCreate} readOnly className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 bg-gray-100 dark:bg-[#222] dark:border-white/10" />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" checked={perm.canRead} readOnly className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 bg-gray-100 dark:bg-[#222] dark:border-white/10" />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" checked={perm.canUpdate} readOnly className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 bg-gray-100 dark:bg-[#222] dark:border-white/10" />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <input type="checkbox" checked={perm.canDelete} readOnly className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 bg-gray-100 dark:bg-[#222] dark:border-white/10" />
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                                perm.source === "User Override" 
                                  ? "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-500/20"
                                  : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10"
                              }`}>
                                {perm.source}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
