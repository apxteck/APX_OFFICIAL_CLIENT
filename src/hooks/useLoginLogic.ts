import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { api } from '@/lib/axios';

import { loginSchema, type LoginFormValues } from '@/app/(public)/login/login.schema';
import {
  checkRateLimit,
  recordFailedAttempt,
  clearFailedAttempts,
} from '@/app/(public)/login/login.utils';

export function useLoginLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login: authLogin, user, isLoading: authLoading } = useAuth();

  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Specific inline error messages
  const [errorMsg, setErrorMsg] = useState('');
  const [resendEmail, setResendEmail] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const redirectParam = searchParams.get('redirect') || '';

  useEffect(() => {
    setIsMounted(true);
    const msgParam = searchParams.get('message');
    if (msgParam) {
      setSuccessMsg(msgParam);
    }
  }, [searchParams]);

  useEffect(() => {
    // Redirect already logged in user dynamically based on role
    if (isMounted && !authLoading && user) {
      const role = (user.role || 'CUSTOMER').toUpperCase();
      const redirectPath =
        role === 'ADMIN' || role === 'SUPER_ADMIN' || role === 'STAFF'
          ? '/admin'
          : role === 'EMPLOYEE'
            ? '/employee'
            : '/customer';
      router.push(redirectParam || redirectPath);
    }
  }, [isMounted, authLoading, user, router, redirectParam]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setErrorMsg('');
    setResendEmail('');
    setInfoMsg('');
    setSuccessMsg('');

    if (checkRateLimit()) {
      setErrorMsg('Too many attempts. Try again in 15 minutes.');
      return;
    }

    setIsLoading(true);

    try {
      // Use authLogin which stores user state in context AND localStorage
      const userData = await authLogin({
        email: values.email,
        password: values.password,
      });

      if (userData) {
        clearFailedAttempts();

        // Save remember state
        if (values.rememberMe) {
          localStorage.setItem('rememberUser', 'true');
        }

        // Redirect flow based on role
        const role = (userData.role || 'CUSTOMER').toUpperCase();
        if (redirectParam) {
          router.push(redirectParam);
        } else if (role === 'ADMIN' || role === 'SUPER_ADMIN' || role === 'STAFF') {
          router.push('/admin');
        } else if (role === 'EMPLOYEE') {
          router.push('/employee');
        } else {
          router.push('/customer');
        }
      }
    } catch (err: any) {
      recordFailedAttempt();

      const msg = (err.response?.data?.message || err.message || '').toLowerCase();
      if (msg.includes('verify your email') || msg.includes('unverified')) {
        setErrorMsg('Please verify your email.');
        setResendEmail(values.email);
      } else if (
        msg.includes('deactivated') ||
        msg.includes('suspended') ||
        msg.includes('block')
      ) {
        setErrorMsg(
          err.response?.data?.message ||
            'Your account has been deactivated. Please contact support.'
        );
      } else {
        setErrorMsg(err.response?.data?.message || 'Invalid email or password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!resendEmail) return;
    setInfoMsg('Sending verification email...');
    try {
      const res = await api.resendVerification(resendEmail);
      if (res.success) {
        setSuccessMsg('Verification email resent successfully! Check your inbox.');
        setInfoMsg('');
        setResendEmail('');
      }
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Failed to resend verification link.');
      setInfoMsg('');
    }
  };

  return {
    form,
    onSubmit,
    handleResendVerification,
    isLoading,
    errorMsg,
    resendEmail,
    infoMsg,
    successMsg,
  };
}
