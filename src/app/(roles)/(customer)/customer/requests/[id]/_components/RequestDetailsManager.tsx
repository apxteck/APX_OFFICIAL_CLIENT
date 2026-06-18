"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/providers/AuthProvider';
import { ServiceRequestDetails } from '../../types';
import { useRequestDetailsLogic } from '../_hooks/useRequestDetailsLogic';
import { RequestDetailsHeader } from './RequestDetailsHeader';
import { RequestProjectDetails } from './RequestProjectDetails';
import { RequestAttachments } from './RequestAttachments';
import { RequestOverview } from './RequestOverview';
import { RequestBilling } from './RequestBilling';
import { InvoiceModal } from './InvoiceModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface RequestDetailsManagerProps {
  id: string;
  initialRequest: ServiceRequestDetails | null;
}

export default function RequestDetailsManager({ id, initialRequest }: RequestDetailsManagerProps) {
  const { user } = useAuth();
  const {
    request,
    loading,
    isCancelling,
    message,
    isEditing,
    formData,
    newFiles,
    isSaving,
    isInvoiceOpen,
    invoicePayment,
    setNewFiles,
    setIsInvoiceOpen,
    setInvoicePayment,
    handleEditToggle,
    handleInputChange,
    handleSaveChanges,
    handleCancelRequest
  } = useRequestDetailsLogic(id, initialRequest);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) return null; // Let the Suspense loading.tsx handle the skeleton

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

  const canEdit = !['COMPLETED', 'CANCELLED'].includes(request.status);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-8 pb-12">
      <RequestDetailsHeader 
        request={request}
        isEditing={isEditing}
        isCancelling={isCancelling}
        isSaving={isSaving}
        canEdit={canEdit}
        handleEditToggle={handleEditToggle}
        handleCancelRequest={handleCancelRequest}
        handleSaveChanges={handleSaveChanges}
      />

      {message && (
        <motion.div variants={item} className={`p-4 rounded-2xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="font-medium">{message.text}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <RequestProjectDetails 
            request={request}
            isEditing={isEditing}
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <RequestAttachments 
            request={request}
            isEditing={isEditing}
            newFiles={newFiles}
            setNewFiles={setNewFiles}
          />
        </div>

        {/* Right Column - Meta & Status */}
        <div className="space-y-8">
          <RequestOverview request={request} />
          <RequestBilling 
            request={request}
            setInvoicePayment={setInvoicePayment}
            setIsInvoiceOpen={setIsInvoiceOpen}
          />
        </div>
      </div>

      <InvoiceModal 
        request={request}
        invoicePayment={invoicePayment}
        user={user}
        onClose={() => setIsInvoiceOpen(false)}
      />
    </motion.div>
  );
}
