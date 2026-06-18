import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adSchema, AdFormData, getDefaultAdFormValues } from '../_schemas/ad.schema';
import { Ad } from '@/app/types/ad.types';
import { adsService } from '@/services/admin/ads.service';

interface UseAdFormLogicProps {
  onSuccess: () => void;
}

export function useAdFormLogic({ onSuccess }: UseAdFormLogicProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);

  // Custom states outside of RHF due to file input
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  // Auxiliary state for UI logic
  const [targetPage, setTargetPage] = useState<'LIST' | 'POST'>('POST');

  const form = useForm<AdFormData>({
    resolver: zodResolver(adSchema),
    defaultValues: getDefaultAdFormValues('POST'),
  });

  const { watch, reset, setValue } = form;
  const adType = watch('adType');

  // Effect to update placement based on target page
  useEffect(() => {
    if (!editingAd) {
      setValue('placement', targetPage === 'LIST' ? 'BLOG_LIST_TOP' : 'BLOG_POST_TOP');
    }
  }, [targetPage, setValue, editingAd]);

  const openCreateModal = () => {
    setEditingAd(null);
    setBannerFile(null);
    setTargetPage('POST');
    reset(getDefaultAdFormValues('POST'));
    setIsModalOpen(true);
  };

  const openEditModal = (ad: Ad) => {
    setEditingAd(ad);
    setBannerFile(null);

    const isList = ad.placement.startsWith('BLOG_LIST');
    setTargetPage(isList ? 'LIST' : 'POST');

    reset({
      adType: ad.adType,
      placement: ad.placement,
      isActive: ad.isActive,
      ...(ad.adType === 'CLIENT'
        ? {
            clientName: ad.clientName || '',
            targetUrl: ad.targetUrl || '',
          }
        : {
            adCode: ad.adCode || '',
          }),
    } as AdFormData);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset(getDefaultAdFormValues('POST'));
    setBannerFile(null);
    setEditingAd(null);
  };

  const onSubmit = async (data: AdFormData) => {
    const formData = new FormData();
    formData.append('adType', data.adType);
    formData.append('placement', data.placement);
    formData.append('isActive', String(data.isActive));

    if (data.adType === 'CLIENT') {
      formData.append('clientName', data.clientName);
      formData.append('targetUrl', data.targetUrl);
      if (bannerFile) {
        formData.append('bannerImage', bannerFile);
      }
    } else {
      formData.append('adCode', data.adCode);
    }

    try {
      if (editingAd) {
        await adsService.updateAd(editingAd.id, formData);
      } else {
        await adsService.createAd(formData);
      }
      onSuccess();
      closeModal();
    } catch (error) {
      console.error('Failed to save ad', error);
      throw error;
    }
  };

  return {
    form,
    isModalOpen,
    editingAd,
    bannerFile,
    setBannerFile,
    targetPage,
    setTargetPage,
    openCreateModal,
    openEditModal,
    closeModal,
    onSubmit: form.handleSubmit(onSubmit as any),
    adType,
  };
}
