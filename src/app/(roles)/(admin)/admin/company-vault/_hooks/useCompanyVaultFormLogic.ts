import { useState } from 'react';
import { CompanyVaultDocument, companyVaultService } from '@/services/admin/companyVault.service';

interface UseCompanyVaultFormLogicProps {
  onSuccess: () => void;
}

export function useCompanyVaultFormLogic({ onSuccess }: UseCompanyVaultFormLogicProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<CompanyVaultDocument | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCreateModal = () => {
    setEditingDocument(null);
    setIsModalOpen(true);
  };

  const openEditModal = (doc: CompanyVaultDocument) => {
    setEditingDocument(doc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDocument(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Validation for new files
      const file = formData.get('document') as File;
      if (!editingDocument && (!file || file.size === 0)) {
        throw new Error("Document file is required.");
      }
      
      if (editingDocument) {
        // If editing and no new file selected, remove empty file from formData to avoid backend issues
        if (!file || file.size === 0) {
          formData.delete('document');
        }
        await companyVaultService.updateCompanyVault(editingDocument.id, formData);
      } else {
        await companyVaultService.createCompanyVault(formData);
      }

      closeModal();
      onSuccess();
    } catch (error: any) {
      console.error('Failed to save document:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isModalOpen,
    editingDocument,
    isSubmitting,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
  };
}
