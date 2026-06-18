import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';
import { registerSchema, RegisterFormValues } from '@/lib/validations/register';
import { checkRateLimit, recordAttempt } from '@/lib/rate-limit';

const RATE_LIMIT_KEY = 'register_attempts';

export function useRegisterLogic() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setIsMounted(true);
    if (localStorage.getItem('isLoggedIn') === 'true') {
      router.push('/dashboard');
    }
  }, [router]);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false,
      botName: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setErrorMsg('');
    setSuccessMsg('');

    // Bot Honeypot check
    if (values.botName) {
      console.warn('Bot submission blocked via honeypot field.');
      setErrorMsg('An error occurred during submission. Please try again.');
      return;
    }

    // Rate Limit check
    if (checkRateLimit(RATE_LIMIT_KEY, 5, 900000)) {
      setErrorMsg('Too many registration attempts. Try again in 15 minutes.');
      return;
    }

    setIsLoading(true);
    recordAttempt(RATE_LIMIT_KEY);

    try {
      const result = await api.register({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone || undefined,
        passwordHash: values.password, // Maps to backend passwordHash schema requirement
      });

      if (result.success) {
        setSuccessMsg(result.message || 'Check your email to verify your account.');
      } else {
        setErrorMsg(result.message || 'Registration failed');
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Registration failed. Try a different email address.';
      setErrorMsg(msg);
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
