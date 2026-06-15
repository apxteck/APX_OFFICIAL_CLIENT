import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/axios';
import { resendSchema, ResendFormValues } from '@/lib/validations/resendVerification';

export function useVerifyEmailLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const [isMounted, setIsMounted] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [errorState, setErrorState] = useState('');

  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState('');
  const [resendError, setResendError] = useState('');

  const form = useForm<ResendFormValues>({
    resolver: zodResolver(resendSchema),
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    setIsMounted(true);

    if (!token || !email) {
      setErrorState('Verification link is invalid or incomplete.');
      setVerifying(false);
      return;
    }

    async function verify() {
      try {
        const res = await api.verifyEmail(token, email);
        if (res.success) {
          if (res.message === 'Already verified.') {
            router.push('/login?message=Already verified.');
          } else {
            router.push('/login?message=Email verified! Please sign in.');
          }
        } else {
          setErrorState('Link expired. Request a new verification email.');
        }
      } catch (err: unknown) {
        setErrorState(
          (err as Error).message || 'Email verification failed. The link may have expired.'
        );
      } finally {
        setVerifying(false);
      }
    }

    verify();
  }, [token, router]);

  const onResendSubmit = async (values: ResendFormValues) => {
    setResendError('');
    setResendSuccess('');
    setIsResending(true);

    try {
      const res = await api.resendVerification(values.email);
      if (res.success) {
        setResendSuccess('A new verification email has been sent! Check your inbox.');
      } else {
        setResendError('Failed to send verification email. Try again.');
      }
    } catch (err: unknown) {
      setResendError((err as Error).message || 'Failed to resend. Please check the email address.');
    } finally {
      setIsResending(false);
    }
  };

  return {
    isMounted,
    verifying,
    errorState,
    isResending,
    resendSuccess,
    resendError,
    form,
    onResendSubmit,
  };
}
