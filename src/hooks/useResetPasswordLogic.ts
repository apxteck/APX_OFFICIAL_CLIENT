import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/axios';
import { resetPasswordSchema, ResetPasswordValues } from '@/lib/validations/resetPassword';

export function useResetPasswordLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: ResetPasswordValues) => {
    if (!token) {
      setErrorMsg('Reset token is missing from URL.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      const result = await api.resetPassword({
        token,
        passwordHash: values.password,
      });

      if (result.success) {
        router.push('/login?message=Password changed successfully. Please log in.');
      } else {
        setErrorMsg('Failed to reset password. The link may have expired.');
      }
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Failed to reset password. Try requesting a new link.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isMounted,
    isLoading,
    errorMsg,
    token,
    form,
    onSubmit,
  };
}
