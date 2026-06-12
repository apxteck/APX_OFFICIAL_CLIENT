import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/lib/axios';
import { forgotPasswordSchema, ForgotPasswordValues } from '@/lib/validations/forgotPassword';

export function useForgotPasswordLogic() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      const result = await api.forgotPassword(values.email);
      if (result.success) {
        setSuccessMsg(result.message || 'A password reset link has been sent to your email.');
      } else {
        setErrorMsg('Failed to process request');
      }
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isMounted,
    isLoading,
    errorMsg,
    successMsg,
    form,
    onSubmit,
  };
}
