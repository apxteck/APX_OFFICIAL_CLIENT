"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { requestsService, ServiceRequestDetail, RequestStatus } from "@/services/admin/requests.service";
import { usersService, User } from "@/services/admin/users.service";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  ArrowLeft, User as UserIcon, Mail, Phone, FileText, 
  Paperclip, CreditCard, Clock, CheckCircle, ShieldAlert, 
  PlayCircle, XCircle, Save, MessageSquare, Loader2, ChevronDown, Check, Search
} from "lucide-react";

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const [request, setRequest] = useState<ServiceRequestDetail | null>(null);
  const [admins, setAdmins] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Editable states
  const [status, setStatus] = useState<RequestStatus>("NEW");
  const [assignedToId, setAssignedToId] = useState<number | "">("");
  const [internalNotes, setInternalNotes] = useState<string>("");

  // Dropdown states
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const assignmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
      if (assignmentRef.current && !assignmentRef.current.contains(event.target as Node)) {
        setIsAssignmentOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Reset search when dropdown closes
    if (!isAssignmentOpen) {
      setTimeout(() => setEmployeeSearch(""), 200);
    }
  }, [isAssignmentOpen]);

  useEffect(() => {
    const fetchData = async () => {
      if (!params?.id) return;
      try {
        const [reqData, usersData] = await Promise.all([
          requestsService.getRequestDetail(params.id as string),
          usersService.getUsers()
        ]);
        
        if (reqData) {
          setRequest(reqData);
          setStatus(reqData.status);
          setAssignedToId(reqData.assignedToId || "");
          setInternalNotes(reqData.internalNotes || "");
        }
        
        // Filter users to get only admins/staff/employees and sort by role
        if (usersData) {
          const staff = usersData.filter(u => 
            u.role?.name === "SUPER_ADMIN" || 
            u.role?.name === "ADMIN" || 
            u.role?.name?.includes("STAFF") ||
            u.role?.name?.includes("EMPLOYEE") ||
            u.role?.name === "EMPLOYEE"
          ).sort((a, b) => {
            const roleA = a.role?.name || "Z_UNKNOWN";
            const roleB = b.role?.name || "Z_UNKNOWN";
            if (roleA !== roleB) {
              return roleA.localeCompare(roleB);
            }
            return a.fullName.localeCompare(b.fullName);
          });
          setAdmins(staff);
        }
      } catch (error) {
        console.error("Failed to fetch request data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [params]);

  const handleSave = async () => {
    if (!request || !params?.id) return;
    setIsSaving(true);
    try {
      const promises = [];
      
      if (status !== request.status) {
        promises.push(requestsService.updateRequestStatus(params.id as string, status));
      }
      
      if (assignedToId !== (request.assignedToId || "")) {
        if (assignedToId !== "") {
          promises.push(requestsService.assignRequest(params.id as string, Number(assignedToId)));
        }
      }
      
      if (internalNotes !== (request.internalNotes || "")) {
        promises.push(requestsService.updateInternalNotes(params.id as string, internalNotes));
      }
      
      if (promises.length > 0) {
        await Promise.all(promises);
        // Refresh request data
        const updatedReq = await requestsService.getRequestDetail(params.id as string);
        if (updatedReq) {
          setRequest(updatedReq);
          setStatus(updatedReq.status);
          setAssignedToId(updatedReq.assignedToId || "");
          setInternalNotes(updatedReq.internalNotes || "");
        }
        alert("Changes saved successfully!");
      }
    } catch (error) {
      console.error("Failed to save changes:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !request) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-200 dark:border-indigo-500/30 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  const statusOptions = [
    { value: "NEW", label: "Status: NEW" },
    { value: "IN_REVIEW", label: "Status: IN REVIEW" },
    { value: "IN_PROGRESS", label: "Status: IN PROGRESS" },
    { value: "COMPLETED", label: "Status: COMPLETED" },
    { value: "CANCELLED", label: "Status: CANCELLED" },
  ];

  const filteredAdmins = admins.filter(admin => 
    admin.fullName.toLowerCase().includes(employeeSearch.toLowerCase()) || 
    (admin.role?.name || "").toLowerCase().includes(employeeSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl p-5 lg:p-6 rounded-[2rem] border border-gray-100/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
        <div className="flex items-center gap-4 lg:gap-5">
          <button 
            onClick={() => router.push('/admin/requests')}
            className="p-3 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-gray-200/80 dark:border-white/10 rounded-2xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95"
          >
            <ArrowLeft size={22} className="text-gray-600 dark:text-gray-300" strokeWidth={2.5} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3 tracking-tight">
              #{request.id}
              <span className={`px-2.5 py-1 text-[11px] font-extrabold rounded-lg uppercase tracking-wider border shadow-sm backdrop-blur-sm ${
                request.priority === "HIGH" ? "bg-red-50/80 text-red-700 border-red-200/50 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20" :
                request.priority === "MEDIUM" ? "bg-amber-50/80 text-amber-700 border-amber-200/50 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20" :
                "bg-blue-50/80 text-blue-700 border-blue-200/50 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
              }`}>
                {request.priority} PRIORITY
              </span>
            </h1>
            <p className="text-[15px] font-medium text-gray-500 dark:text-gray-400 mt-1">
              {request.serviceType} <span className="mx-2">•</span> Created {format(new Date(request.createdAt), "MMM dd, yyyy HH:mm")}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Custom Status Dropdown */}
          <div className="relative w-full sm:w-auto" ref={statusRef}>
            <button 
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className="w-full sm:w-56 flex items-center justify-between gap-3 bg-white/80 dark:bg-white/5 backdrop-blur-sm text-gray-700 dark:text-gray-300 font-bold text-[14px] rounded-2xl px-5 py-3.5 outline-none cursor-pointer border border-gray-200/80 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/30 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 transition-all shadow-sm focus:ring-2 focus:ring-indigo-500/20"
            >
              {statusOptions.find(o => o.value === status)?.label}
              <ChevronDown size={16} strokeWidth={3} className={cn("text-gray-500 dark:text-gray-400 transition-transform duration-300", isStatusOpen && "rotate-180")} />
            </button>
            
            <AnimatePresence>
              {isStatusOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-full sm:w-56 bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-white/10 overflow-hidden z-50 p-1.5"
                >
                  <div className="flex flex-col gap-1">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setStatus(option.value as RequestStatus);
                          setIsStatusOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200",
                          status === option.value 
                            ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-white/10"
                        )}
                      >
                        {option.label}
                        {status === option.value && <Check size={16} strokeWidth={3} className="text-indigo-600 dark:text-indigo-400" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 sm:flex-none bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-2xl font-bold text-[14px] transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} strokeWidth={2.5} />} 
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column - Main Details */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Dynamic Form Data */}
          <div className="bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 border border-gray-100/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
            <h2 className="text-xl font-black tracking-tight text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50/50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20">
                <FileText size={20} className="text-indigo-600 dark:text-indigo-400" strokeWidth={2.5} />
              </div>
              Submitted Request Data
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 dark:bg-white/5 border border-gray-100/50 dark:border-white/5 p-6 rounded-2xl">
              {request.formData.map((field, i) => (
                <div key={i} className={field.value.length > 50 ? "md:col-span-2" : ""}>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-1.5 font-bold uppercase tracking-wider">{field.label}</p>
                  <p className="text-[15px] font-bold text-gray-900 dark:text-white whitespace-pre-wrap">{field.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Attachments Gallery */}
          <div className="bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 border border-gray-100/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50/50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20">
                  <Paperclip size={20} className="text-indigo-600 dark:text-indigo-400" strokeWidth={2.5} />
                </div>
                Uploaded Attachments
              </h2>
              <span className="text-sm font-extrabold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3.5 py-1.5 rounded-lg border border-indigo-100/50 dark:border-indigo-500/20">
                {request.attachments.length} Files
              </span>
            </div>
            
            {request.attachments.length === 0 ? (
              <div className="bg-gray-50/50 dark:bg-white/5 border border-gray-100/50 dark:border-white/5 rounded-2xl py-12 flex flex-col items-center justify-center">
                <p className="text-[15px] font-bold text-gray-500 dark:text-gray-400">No attachments uploaded for this request.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {request.attachments.map(att => (
                  <div key={att.id} onClick={() => window.open(att.url, '_blank')} className="flex items-center justify-between p-4 bg-white dark:bg-[#151515] border border-gray-200/80 dark:border-white/10 rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-500/30 hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 transition-all group cursor-pointer shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center shrink-0 border border-indigo-100/50 dark:border-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                        <FileText size={22} strokeWidth={2.5} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[15px] font-bold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{att.fileName}</p>
                        <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">{att.fileSize}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column - Operational Panels */}
        <div className="space-y-6">
          
          {/* Customer Card */}
          <div className="bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 border border-gray-100/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
            <h2 className="text-[13px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-2">
              <UserIcon size={16} strokeWidth={3} /> Customer Info
            </h2>
            <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100/80 dark:border-white/10">
              <div className="w-14 h-14 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-2xl border border-indigo-100/50 dark:border-indigo-500/20 shadow-sm">
                {request.customerName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-black text-lg text-gray-900 dark:text-white tracking-tight">{request.customerName}</p>
                <button 
                  onClick={() => router.push(`/admin/users`)}
                  className="text-[13px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline transition-colors mt-0.5"
                >
                  View Full Profile
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                  <Mail size={16} className="text-gray-500 dark:text-gray-400" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-[15px] text-gray-700 dark:text-gray-300">{request.customerEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                  <Phone size={16} className="text-gray-500 dark:text-gray-400" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-[15px] text-gray-700 dark:text-gray-300">{request.customerPhone || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Assignment Panel */}
          <div className="relative z-20 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 border border-gray-100/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
            <h2 className="text-[13px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-2">
              <ShieldAlert size={16} strokeWidth={3} /> Assignment
            </h2>
            
            {/* Custom Assignment Dropdown */}
            <div className="relative mb-3" ref={assignmentRef}>
              <button 
                onClick={() => setIsAssignmentOpen(!isAssignmentOpen)}
                className="w-full flex items-center justify-between gap-3 bg-white/50 dark:bg-black/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 font-bold text-[15px] rounded-2xl px-5 py-4 outline-none cursor-pointer border border-gray-200/80 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/30 hover:bg-indigo-50/30 dark:hover:bg-indigo-500/10 transition-all shadow-sm focus:ring-4 focus:ring-indigo-500/20"
              >
                {assignedToId === "" 
                  ? "Unassigned" 
                  : admins.find(a => a.id === assignedToId)?.fullName || "Unknown Staff"}
                <ChevronDown size={18} strokeWidth={3} className={cn("text-gray-500 dark:text-gray-400 transition-transform duration-300", isAssignmentOpen && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {isAssignmentOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-full bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-white/10 overflow-hidden z-50 p-1.5"
                  >
                    {/* Search Input */}
                    <div className="p-2 border-b border-gray-100 dark:border-white/5">
                      <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search employees..."
                          value={employeeSearch}
                          onChange={(e) => setEmployeeSearch(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-white/10 rounded-xl text-[14px] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 max-h-60 overflow-y-auto custom-scrollbar p-1">
                      {employeeSearch === "" && (
                        <button
                          onClick={() => {
                            setAssignedToId("");
                            setIsAssignmentOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-3 text-[15px] font-bold rounded-xl transition-all duration-200",
                            assignedToId === "" 
                              ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-white/10"
                          )}
                        >
                          Unassigned
                          {assignedToId === "" && <Check size={18} strokeWidth={3} className="text-indigo-600 dark:text-indigo-400" />}
                        </button>
                      )}
                      
                      {filteredAdmins.length === 0 ? (
                        <div className="px-4 py-6 text-center text-[14px] text-gray-500 dark:text-gray-400">
                          No employees found.
                        </div>
                      ) : (
                        filteredAdmins.map((admin) => (
                          <button
                            key={admin.id}
                            onClick={() => {
                              setAssignedToId(admin.id);
                              setIsAssignmentOpen(false);
                            }}
                            className={cn(
                              "w-full flex flex-col items-start px-4 py-3 text-[15px] rounded-xl transition-all duration-200",
                              assignedToId === admin.id 
                                ? "bg-indigo-50 dark:bg-indigo-500/10"
                                : "hover:bg-gray-100/80 dark:hover:bg-white/10"
                            )}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className={cn(
                                "font-bold",
                                assignedToId === admin.id ? "text-indigo-700 dark:text-indigo-400" : "text-gray-900 dark:text-white"
                              )}>
                                {admin.fullName}
                              </span>
                              {assignedToId === admin.id && <Check size={18} strokeWidth={3} className="text-indigo-600 dark:text-indigo-400" />}
                            </div>
                            <span className={cn(
                              "text-[12px] font-bold mt-0.5",
                              assignedToId === admin.id ? "text-indigo-500 dark:text-indigo-400/70" : "text-gray-500 dark:text-gray-400"
                            )}>
                              {admin.role?.name || "STAFF"}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400 ml-1">Assign this request to a staff member. They will receive a notification.</p>
          </div>

          {/* Internal Notes */}
          <div className="bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 border border-gray-100/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
            <h2 className="text-[13px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-2">
              <MessageSquare size={16} strokeWidth={3} /> Internal Notes
            </h2>
            <textarea 
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              className="w-full bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-gray-200/80 dark:border-white/10 text-gray-900 dark:text-white text-[15px] font-medium rounded-2xl p-5 min-h-[140px] focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 resize-none transition-all duration-300 shadow-sm hover:shadow-md"
              placeholder="Add private notes only visible to admins..."
            />
          </div>

          {/* Payment History */}
          {request.paymentHistory.length > 0 && (
            <div className="bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 border border-gray-100/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
              <h2 className="text-[13px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-2">
                <CreditCard size={16} strokeWidth={3} /> Linked Payments
              </h2>
              <div className="space-y-3">
                {request.paymentHistory.map(payment => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-white/5 rounded-2xl border border-gray-100/80 dark:border-white/10 transition-colors hover:bg-gray-100/50 dark:hover:bg-white/10">
                    <div>
                      <p className="text-[14px] font-black text-gray-900 dark:text-white tracking-tight">#{payment.id}</p>
                      <p className="text-[13px] font-bold text-gray-500 dark:text-gray-400 mt-0.5">₹{payment.amount.toLocaleString()}</p>
                    </div>
                    <span className={`px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg border shadow-sm ${
                      payment.status === "PAID" ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" :
                      "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-5 bg-white/80 dark:bg-white/5 backdrop-blur-sm hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 py-3.5 rounded-2xl font-bold text-[14px] transition-all shadow-sm hover:shadow-md border border-gray-200/80 dark:border-white/10 hover:border-indigo-200 dark:hover:border-indigo-500/30 active:scale-95">
                + Create New Invoice
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
