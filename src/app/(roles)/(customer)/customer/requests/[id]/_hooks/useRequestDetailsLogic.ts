import { useState, useEffect } from 'react';
import { api } from '@/lib/axios';
import { ServiceRequestDetails } from '../../types';

export const useRequestDetailsLogic = (id: string, initialRequest: ServiceRequestDetails | null) => {
  const [request, setRequest] = useState<ServiceRequestDetails | null>(initialRequest);
  const [loading, setLoading] = useState(initialRequest === null);
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
    if (!initialRequest) {
      fetchRequestDetails();
    }
  }, [id, initialRequest]);

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

  return {
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
  };
};
