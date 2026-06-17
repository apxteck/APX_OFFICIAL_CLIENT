'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/axios';
import { 
  ArrowLeft, Clock, AlertCircle, CheckCircle2, XCircle, Loader2, 
  FileText, Download, User, DollarSign, Calendar, Paperclip, CreditCard, Edit2, Save, Mail
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { format } from 'date-fns';

type RequestStatus = "NEW" | "IN_REVIEW" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

const getStatusConfig = (status: RequestStatus) => {
  switch (status) {
    case 'NEW':
      return { label: 'New', color: 'text-blue-500', bg: 'bg-blue-500/10', icon: AlertCircle };
    case 'IN_REVIEW':
      return { label: 'In Review', color: 'text-purple-500', bg: 'bg-purple-500/10', icon: Clock };
    case 'IN_PROGRESS':
      return { label: 'In Progress', color: 'text-cyan-500', bg: 'bg-cyan-500/10', icon: Loader2 };
    case 'COMPLETED':
      return { label: 'Completed', color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: CheckCircle2 };
    case 'CANCELLED':
      return { label: 'Cancelled', color: 'text-red-500', bg: 'bg-red-500/10', icon: XCircle };
    default:
      return { label: status, color: 'text-gray-500', bg: 'bg-gray-500/10', icon: AlertCircle };
  }
};

interface ServiceRequestDetails {
  id: number;
  status: RequestStatus;
  priority: string;
  createdAt: string;
  service?: {
    name: string;
    fields?: any[];
  };
  requestData?: any[];
  fileUploads?: any[];
  payments?: any[];
  assignedTo?: {
    fullName: string;
  };
}

export default function CustomerRequestDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  
  const [request, setRequest] = useState<ServiceRequestDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Invoice Modal State
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [invoicePayment, setInvoicePayment] = useState<any>(null);

  const fetchRequestDetails = async () => {
    setLoading(true);
    const data = await api.getMyRequestById(Number(id));
    if (data) {
      setRequest(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequestDetails();
  }, [id]);

  const handleEditToggle = () => {
    if (!isEditing && request) {
      const initialData: Record<string, any> = {};
      request.requestData?.forEach((d: any) => {
        initialData[d.fieldKey] = d.fieldValue;
      });
      setFormData(initialData);
      setNewFiles([]);
      setMessage(null);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (fieldKey: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldKey]: value }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setMessage(null);
    
    const submissionData = new FormData();
    submissionData.append('requestData', JSON.stringify(formData));
    for (const file of newFiles) {
      submissionData.append('attachments', file);
    }
    
    const res = await api.updateMyRequest(Number(id), submissionData);
    setIsSaving(false);
    
    if (res.success) {
      setMessage({ type: 'success', text: 'Request updated successfully.' });
      setIsEditing(false);
      fetchRequestDetails();
    } else {
      setMessage({ type: 'error', text: res.message || 'Failed to update request.' });
    }
  };

  const handleCancelRequest = async () => {
    if (!confirm('Are you sure you want to cancel this request? This action cannot be undone.')) return;
    
    setIsCancelling(true);
    setMessage(null);
    const res = await api.cancelRequest(Number(id));
    setIsCancelling(false);
    
    if (res.success) {
      setMessage({ type: 'success', text: 'Request cancelled successfully.' });
      fetchRequestDetails();
    } else {
      setMessage({ type: 'error', text: res.message || 'Failed to cancel request.' });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-8 pb-12 animate-pulse">
        {/* Header Skeleton */}
        <div className="bg-white dark:bg-[#111] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-start gap-4 w-full">
            <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-white/10 shrink-0"></div>
            <div className="space-y-3 w-1/2">
               <div className="flex gap-2"><div className="h-4 w-16 bg-gray-200 dark:bg-white/10 rounded"></div><div className="h-4 w-20 bg-gray-200 dark:bg-white/10 rounded"></div></div>
               <div className="h-8 w-3/4 bg-gray-200 dark:bg-white/10 rounded"></div>
            </div>
          </div>
          <div className="h-10 w-32 bg-gray-200 dark:bg-white/10 rounded-xl"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-white dark:bg-[#111] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm h-[300px]">
                 <div className="h-6 w-1/3 bg-gray-200 dark:bg-white/10 rounded mb-6"></div>
                 <div className="space-y-4">
                    <div className="h-4 w-1/4 bg-gray-200 dark:bg-white/10 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 dark:bg-white/10 rounded"></div>
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-white/10 rounded"></div>
                 </div>
              </div>
           </div>
           <div className="space-y-8">
              <div className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm h-[200px]">
                 <div className="h-5 w-1/2 bg-gray-200 dark:bg-white/10 rounded mb-6"></div>
                 <div className="flex gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-white/10 shrink-0"></div>
                    <div className="space-y-2 flex-1"><div className="h-3 w-1/3 bg-gray-200 dark:bg-white/10 rounded"></div><div className="h-4 w-1/2 bg-gray-200 dark:bg-white/10 rounded"></div></div>
                 </div>
                 <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-white/10 shrink-0"></div>
                    <div className="space-y-2 flex-1"><div className="h-3 w-1/3 bg-gray-200 dark:bg-white/10 rounded"></div><div className="h-4 w-1/2 bg-gray-200 dark:bg-white/10 rounded"></div></div>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>
    );
  }

  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">We couldn't find the service request you're looking for.</p>
        <Link href="/customer/requests" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition-all">
          Back to Requests
        </Link>
      </div>
    );
  }

  const status = getStatusConfig(request.status);
  const StatusIcon = status.icon;

  const projectDetails = request.requestData || [];
  const textFields = projectDetails.filter((d: any) => d.field?.fieldType !== 'FILE');
  const attachments = request.fileUploads || [];
  const payments = request.payments || [];
  const serviceFields = request.service?.fields?.filter((f: any) => f.fieldType !== 'FILE') || [];

  const canEdit = !['COMPLETED', 'CANCELLED'].includes(request.status);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white dark:bg-[#111] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
        <div className="flex items-start gap-4">
          <Link href="/customer/requests" className="mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-sm font-bold text-gray-400 dark:text-gray-500">REQ-{request.id.toString().padStart(4, '0')}</span>
              <div className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 ${status.bg} ${status.color}`}>
                <StatusIcon className="w-3.5 h-3.5" />
                {status.label}
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {request.service?.name}
            </h1>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {canEdit && (
            <button 
              onClick={handleEditToggle}
              className={`font-bold px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                isEditing 
                  ? 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20' 
                  : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400'
              }`}
            >
              {isEditing ? <XCircle className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              {isEditing ? 'Cancel Editing' : 'Edit Request'}
            </button>
          )}

          {request.status === 'NEW' && !isEditing && (
            <button 
              onClick={handleCancelRequest}
              disabled={isCancelling}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isCancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
              Cancel Request
            </button>
          )}

          {isEditing && (
            <button 
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-5 py-2.5 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          )}
        </div>
      </motion.div>

      {message && (
        <motion.div variants={item} className={`p-4 rounded-2xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="font-medium">{message.text}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Project Details */}
          <motion.div variants={item} className="bg-white dark:bg-[#111] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-cyan-500" />
              Project Requirements
            </h2>
            
            {isEditing ? (
              <div className="space-y-6">
                {serviceFields.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 italic">This service does not have any specific text requirement fields defined.</p>
                ) : (
                  serviceFields.map((field: any) => (
                    <div key={field.id} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {field.fieldLabel}
                      </label>
                      {field.fieldType === 'TEXT' || field.fieldType === 'NUMBER' || field.fieldType === 'DATE' || field.fieldType === 'EMAIL' || field.fieldType === 'PHONE' ? (
                        <input 
                          type={field.fieldType === 'PHONE' ? 'tel' : field.fieldType.toLowerCase()}
                          value={formData[field.fieldKey] || ''}
                          placeholder={field.placeholder || ''}
                          onChange={(e) => handleInputChange(field.fieldKey, e.target.value)}
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        />
                      ) : field.fieldType === 'TEXTAREA' ? (
                        <textarea 
                          rows={4}
                          value={formData[field.fieldKey] || ''}
                          placeholder={field.placeholder || ''}
                          onChange={(e) => handleInputChange(field.fieldKey, e.target.value)}
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
                        />
                      ) : field.fieldType === 'DROPDOWN' ? (
                        <select 
                          value={formData[field.fieldKey] || ''}
                          onChange={(e) => handleInputChange(field.fieldKey, e.target.value)}
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        >
                          <option value="">{field.placeholder || 'Select...'}</option>
                          {Array.isArray(field.options) && field.options.map((opt: string, idx: number) => (
                            <option key={idx} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : null}
                    </div>
                  ))
                )}
                <p className="text-xs text-gray-400 mt-2 italic">* File fields cannot be edited directly. Please upload new attachments below.</p>
              </div>
            ) : projectDetails.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 italic">No additional requirements were provided.</p>
            ) : (
              <div className="space-y-6">
                {projectDetails.map((data: any) => (
                  <div key={data.id} className="border-b border-gray-100 dark:border-white/5 pb-4 last:border-0 last:pb-0">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      {data.field?.fieldLabel || data.fieldKey}
                    </p>
                    {data.field?.fieldType === 'FILE' ? (
                      <a href={data.fieldValue} target="_blank" rel="noreferrer" className="text-cyan-600 hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium hover:underline flex items-center gap-2 w-fit">
                        <FileText className="w-4 h-4" /> View Uploaded File
                      </a>
                    ) : (
                      <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                        {data.fieldValue || '-'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Attachments */}
          <motion.div variants={item} className="bg-white dark:bg-[#111] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
              <Paperclip className="w-5 h-5 text-cyan-500" />
              Attachments & Documents
            </h2>
            
            {attachments.length === 0 && !isEditing ? (
              <p className="text-gray-500 dark:text-gray-400 italic">No files were attached to this request.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {attachments.map((file: any) => (
                  <a 
                    key={file.id} 
                    href={file.fileUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-cyan-500/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1a1a1a] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{file.fileName}</p>
                      <p className="text-xs text-gray-500">{(file.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-cyan-500" />
                  </a>
                ))}
              </div>
            )}

            {isEditing && (
              <div className="mt-6 border-t border-gray-100 dark:border-white/5 pt-6">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-3">
                  Upload New Attachments
                </label>
                <div className="relative border-2 border-dashed border-cyan-500/30 rounded-2xl p-6 hover:bg-cyan-500/5 transition-colors group text-center cursor-pointer">
                  <input 
                    type="file" 
                    multiple 
                    onChange={(e) => {
                      if (e.target.files) {
                        setNewFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-2 text-cyan-600 dark:text-cyan-400">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                      <Paperclip className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  </div>
                </div>
                {newFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {newFiles.map((f, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-cyan-500/20 text-sm">
                        <span className="text-gray-700 dark:text-gray-300 truncate">{f.name}</span>
                        <button 
                          type="button" 
                          onClick={() => setNewFiles(prev => prev.filter((_, idx) => idx !== i))}
                          className="text-red-500 hover:text-red-600 transition-colors p-1"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>

        </div>

        {/* Right Column - Meta & Status */}
        <div className="space-y-8">
          
          {/* Overview Info */}
          <motion.div variants={item} className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900 dark:text-white">Overview</h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold">Created Date</p>
                  <p className="text-gray-900 dark:text-white font-medium">{new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold">Priority</p>
                  <p className="text-gray-900 dark:text-white font-medium capitalize">{request.priority.toLowerCase()}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Assigned Team */}
          <motion.div variants={item} className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-500" />
              Assigned To
            </h3>
            {request.assignedTo ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 font-bold">
                  {request.assignedTo.fullName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{request.assignedTo.fullName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Project Manager</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-500">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">Pending Assignment</p>
              </div>
            )}
          </motion.div>

          {/* Billing & Payments */}
          {payments.length > 0 && (
            <motion.div variants={item} className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-500" />
                Billing
              </h3>
              <div className="space-y-3">
                {payments.map((payment: any) => (
                  <div key={payment.id} className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">Amount</span>
                      <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">₹{payment.negotiatedAmount}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="text-gray-500 dark:text-gray-400">Status</span>
                      <span className={`font-semibold ${payment.status === 'PAID' ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {payment.status}
                      </span>
                    </div>
                    {payment.status === 'PAID' && (
                      <button
                        onClick={() => {
                          setInvoicePayment(payment);
                          setIsInvoiceOpen(true);
                        }}
                        className="w-full py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download Invoice
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* Invoice Modal (Printable) */}
      {isInvoiceOpen && invoicePayment && (
        <>
          <style type="text/css" media="print">
            {`
              @page { size: auto; margin: 0; }
              body { background-color: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
              body * { visibility: hidden; }
              #invoice-modal-container, #invoice-modal-container * { visibility: visible; }
              #invoice-modal-container { 
                position: absolute; 
                left: 0; 
                top: 0; 
                width: 100%; 
                margin: 0; 
                padding: 0; 
                background: white; 
                min-height: 100vh;
              }
            `}
          </style>
          <div id="invoice-modal-container" className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm print:bg-white print:backdrop-blur-none print:block">
            <div className="flex min-h-full items-start justify-center p-4 sm:p-6 print:p-0 print:m-0">
              <div className="my-8 sm:my-12 bg-white print:border-none rounded-2xl w-full max-w-3xl shadow-2xl relative flex flex-col animate-in fade-in zoom-in-95 duration-200 ring-1 ring-gray-200 print:ring-0 print:shadow-none print:m-0 print:w-full print:max-w-none print:rounded-none">
                
                {/* Header Actions (Hidden on Print) */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-4 border-b border-gray-100 print:hidden bg-gray-50/90 backdrop-blur-md sticky top-0 z-20 rounded-t-2xl gap-4 sm:gap-0">
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <div className="flex items-center gap-3">
                    <div className="bg-cyan-100/50 p-2 rounded-xl">
                      <Paperclip className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                        Invoice <span className="text-gray-400 font-medium">#INV-{invoicePayment.id}</span>
                      </h2>
                    </div>
                  </div>
                  {/* Close button for mobile */}
                  <button
                    onClick={() => setIsInvoiceOpen(false)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors sm:hidden"
                    title="Close"
                  >
                    <XCircle size={22} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 sm:flex-none justify-center px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 rounded-lg transition-all shadow-sm flex items-center gap-2"
                  >
                    <Download size={16} /> 
                    <span>Download PDF</span>
                  </button>
                  <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>
                  {/* Close button for desktop */}
                  <button
                    onClick={() => setIsInvoiceOpen(false)}
                    className="hidden sm:block p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Close"
                  >
                    <XCircle size={22} />
                  </button>
                </div>
              </div>

              {/* Printable Invoice Content */}
              <div className="p-8 sm:p-12 print:p-8 bg-white text-gray-900 rounded-b-2xl relative overflow-hidden print:w-[210mm] print:min-h-[297mm] mx-auto shadow-sm" id="invoice-content">
                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] grayscale select-none">
                  <img src="/APX%20Teck%20-%20Final%20Logo%20-01.png" alt="Watermark" className="w-2/3 object-contain" />
                </div>
                
                {/* Foreground Content Wrapper */}
                <div className="relative z-10 flex flex-col h-full print:h-full">
                  {/* Invoice Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-stretch gap-6 mb-12">
                    <div className="flex flex-col justify-between">
                      <img src="/APX%20Teck%20-%20Final%20Logo%20-01.png" alt="APX Teck Logo" className="h-20 w-auto object-contain object-left mb-6" />
                      <div className="mt-auto">
                        <p className="text-gray-500 text-sm flex items-center gap-2 font-medium pl-1">
                           <Mail size={16} className="text-emerald-600" />
                           info@apxteck.com
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto flex flex-col justify-between">
                      <div>
                        <div className="inline-block px-4 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
                          Paid Receipt
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black text-gray-200 tracking-tighter mb-4 uppercase">Invoice</h2>
                      </div>
                      <div className="space-y-1.5 mt-auto sm:text-right">
                        <p className="text-sm font-semibold text-gray-900 flex justify-between sm:justify-end gap-4"><span>Invoice Number:</span> <span className="text-gray-500 font-medium">INV-{invoicePayment.id}</span></p>
                        <p className="text-sm font-semibold text-gray-900 flex justify-between sm:justify-end gap-4"><span>Date Issued:</span> <span className="text-gray-500 font-medium">{invoicePayment.paidAt ? format(new Date(invoicePayment.paidAt), "MMM dd, yyyy") : format(new Date(invoicePayment.createdAt), "MMM dd, yyyy")}</span></p>
                        <p className="text-sm font-semibold text-gray-900 flex justify-between sm:justify-end gap-4"><span>Transaction ID:</span> <span className="text-gray-500 font-medium">{invoicePayment.transactionId || 'N/A'}</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Billing Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 bg-gray-50/80 p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Billed To</p>
                      <p className="text-xl font-bold text-gray-900 mb-1">{user?.fullName || 'Customer'}</p>
                      <p className="text-sm font-medium text-gray-500">{user?.email}</p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Payment Details</p>
                      <div className="flex items-center sm:justify-end gap-2 mb-3">
                        <span className="text-sm font-semibold text-gray-900">Status:</span>
                        <span className="text-emerald-700 font-bold bg-emerald-100/80 border border-emerald-200 px-3 py-1 rounded-md text-xs tracking-wider">PAID</span>
                      </div>
                      <div className="flex flex-col sm:items-end">
                        <span className="text-sm font-semibold text-gray-900 mb-1">Transaction ID:</span>
                        <span className="font-mono text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 inline-block break-all max-w-full font-medium">
                          {invoicePayment.transactionId || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="border border-gray-200 rounded-3xl overflow-hidden mb-8 shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-50/80 border-b border-gray-200">
                        <tr>
                          <th className="py-5 px-8 font-bold text-xs text-gray-500 uppercase tracking-widest w-full">Service Description</th>
                          <th className="py-5 px-8 font-bold text-xs text-gray-500 uppercase tracking-widest text-right whitespace-nowrap">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">
                        <tr className="group hover:bg-gray-50/50 transition-colors">
                          <td className="py-6 px-8">
                            <p className="text-lg font-bold text-gray-900">{request.service?.name}</p>
                            <p className="text-sm font-medium text-gray-500 mt-1">Service Request #{request.id}</p>
                            {invoicePayment.invoiceNote && (
                               <div className="mt-5 bg-emerald-50 border border-emerald-100/50 text-emerald-800 text-sm p-4 rounded-2xl flex items-start gap-3">
                                 <AlertCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                 <div>
                                    <span className="font-bold text-emerald-900 block mb-1">Payment Note:</span> 
                                    <span className="text-emerald-700/90 leading-relaxed">{invoicePayment.invoiceNote}</span>
                                 </div>
                               </div>
                            )}
                          </td>
                          <td className="py-6 px-8 text-right align-top">
                            <span className="text-xl font-bold text-gray-900">₹{invoicePayment.amountPaid || invoicePayment.negotiatedAmount}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Totals Section */}
                  <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-12 mt-6">
                    <div className="w-full sm:w-1/2 hidden sm:block">
                       {/* Left side empty space for balance */}
                    </div>
                    <div className="w-full sm:w-[380px] bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                      <div className="flex justify-between items-center py-2.5 text-sm text-gray-600">
                        <span className="font-medium text-base">Subtotal</span>
                        <span className="font-semibold text-gray-900 text-base">₹{invoicePayment.amountPaid || invoicePayment.negotiatedAmount}</span>
                      </div>
                      <div className="flex justify-between items-center py-2.5 text-sm text-gray-600 border-b border-gray-200 mb-5 pb-5">
                        <span className="font-medium text-base">Tax (0%)</span>
                        <span className="font-semibold text-gray-900 text-base">₹0.00</span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <span className="text-lg font-bold text-gray-900">Total Paid</span>
                        <span className="text-3xl font-black text-emerald-600 tracking-tight">₹{invoicePayment.amountPaid || invoicePayment.negotiatedAmount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer pushes to bottom */}
                  <div className="mt-auto pt-10 border-t border-gray-100">
                    <div className="flex flex-col items-center justify-center">
                      <div className="inline-flex items-center justify-center gap-2 mb-4 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-full font-bold shadow-sm">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Payment Confirmed Successfully</span>
                      </div>
                      <p className="text-sm font-medium text-gray-600 max-w-lg mx-auto text-center leading-relaxed">
                        Thank you for your business! If you have any questions, please contact our billing team at <a href="mailto:info@apxteck.com" className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline transition-colors">info@apxteck.com</a>.
                      </p>
                      <p className="mt-8 text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase text-center">
                        This is a computer-generated receipt and does not require a physical signature.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )}
    </motion.div>
  );
}
