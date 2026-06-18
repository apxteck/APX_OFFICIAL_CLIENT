import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useCreateRequestLogic = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/admin/requests');
    }, 1000);
  };

  const navigateBack = () => router.back();

  return {
    isSubmitting,
    handleSubmit,
    navigateBack,
  };
};
