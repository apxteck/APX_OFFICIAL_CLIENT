import { useState, useEffect } from 'react';
import { api } from '@/lib/axios';
import { Service, ServiceField } from '@/app/types/service.types';
import { useRouter } from 'next/navigation';

export const useNewServiceLogic = (initialServices: Service[]) => {
  const router = useRouter();
  
  const [services] = useState<Service[]>(initialServices);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  
  const [serviceFields, setServiceFields] = useState<ServiceField[]>([]);
  const [loadingFields, setLoadingFields] = useState(false);
  
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [genericFiles, setGenericFiles] = useState<File[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (!selectedServiceId) {
      setServiceFields([]);
      setFormData({});
      return;
    }

    let mounted = true;
    async function loadFields() {
      setLoadingFields(true);
      try {
        const fields = await api.fetchServiceFields(selectedServiceId!);
        if (mounted) {
          setServiceFields(fields);
          setFormData({});
          setGenericFiles([]);
        }
      } catch (error) {
        console.error("Failed to load service fields", error);
      } finally {
        if (mounted) setLoadingFields(false);
      }
    }
    loadFields();

    return () => { mounted = false; };
  }, [selectedServiceId]);

  const handleInputChange = (fieldKey: string, value: any, type: string) => {
    setFormData(prev => ({ ...prev, [fieldKey]: value }));
  };

  const handleGenericFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles = newFiles.filter(f => f.size <= 50 * 1024 * 1024);
      
      if (validFiles.length < newFiles.length) {
         setMessage({ type: 'error', text: 'Some files exceed the 50MB limit and were not added.' });
      } else {
         setMessage(null);
      }

      setGenericFiles(prev => {
        const uniqueNewFiles = validFiles.filter(newFile => 
          !prev.some(existingFile => 
            existingFile.name === newFile.name && existingFile.size === newFile.size
          )
        );
        return [...prev, ...uniqueNewFiles];
      });
    }
  };

  const removeGenericFile = (index: number) => {
    setGenericFiles(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServiceId) return;

    setIsSubmitting(true);
    setMessage(null);

    const submissionData = new FormData();
    for (const field of serviceFields) {
      const val = formData[field.fieldKey];
      if (val !== undefined && val !== null) {
        submissionData.append(field.fieldKey, val);
      }
    }

    for (const file of genericFiles) {
      submissionData.append('attachments', file);
    }

    try {
      const res = await api.submitServiceRequest(selectedServiceId, submissionData);
      if (res.success) {
        setMessage({ type: 'success', text: 'Service request submitted successfully!' });
        setTimeout(() => {
          router.push('/customer/services');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: res.message || 'Failed to submit request' });
        setIsSubmitting(false);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      setIsSubmitting(false);
    }
  };

  return {
    services,
    selectedServiceId,
    setSelectedServiceId,
    serviceFields,
    loadingFields,
    formData,
    genericFiles,
    isSubmitting,
    message,
    setMessage,
    handleInputChange,
    handleGenericFileUpload,
    removeGenericFile,
    handleSubmit
  };
};
