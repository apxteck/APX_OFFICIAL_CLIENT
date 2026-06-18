import { useState } from 'react';
import { CompanyAsset, companyAssetsService } from '@/services/admin/companyAssets.service';

interface UseCompanyAssetFormLogicProps {
  onSuccess: () => void;
}

export function useCompanyAssetFormLogic({ onSuccess }: UseCompanyAssetFormLogicProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<CompanyAsset | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCreateModal = () => {
    setEditingAsset(null);
    setIsModalOpen(true);
  };

  const openEditModal = (asset: CompanyAsset) => {
    setEditingAsset(asset);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAsset(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const payload: Partial<CompanyAsset> = {
        type: formData.get('type') as string,
        title: formData.get('title') as string,
        referenceNumber: (formData.get('referenceNumber') as string) || undefined,
        provider: (formData.get('provider') as string) || undefined,
        status: formData.get('status') as any,
        autoRenew: formData.get('autoRenew') === 'on',
        renewalCost: formData.get('renewalCost') ? Number(formData.get('renewalCost')) : undefined,
        issuedDate: (formData.get('issuedDate') as string) || undefined,
        expiryDate: (formData.get('expiryDate') as string) || undefined,
        notes: (formData.get('notes') as string) || undefined,
      };

      if (editingAsset) {
        await companyAssetsService.updateCompanyAsset(editingAsset.id, payload);
      } else {
        await companyAssetsService.createCompanyAsset(payload);
      }

      closeModal();
      onSuccess();
    } catch (error) {
      console.error('Failed to save asset:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isModalOpen,
    editingAsset,
    isSubmitting,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
  };
}
