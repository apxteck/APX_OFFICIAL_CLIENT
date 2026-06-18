'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { ShieldAlert, Mail, Send, CheckCircle2, AlertCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useVerifyEmailLogic } from '@/hooks/useVerifyEmailLogic';

import { VerifyingState } from './components/VerifyingState';
import { LinkExpiredState } from './components/LinkExpiredState';
import { ResendVerificationForm } from './components/ResendVerificationForm';

export default function VerifyEmailClient() {
  const {
    isMounted,
    verifying,
    errorState,
    isResending,
    resendSuccess,
    resendError,
    form,
    onResendSubmit,
  } = useVerifyEmailLogic();

  if (!isMounted) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-md px-4 sm:px-0"
      aria-labelledby="verify-email-heading"
    >
      <GlassCard className="p-6 sm:p-8 md:p-10 shadow-lg md:shadow-2xl border-accent/20 w-full flex flex-col">
        {verifying ? (
          <VerifyingState />
        ) : errorState ? (
          <section className="space-y-6 w-full flex flex-col" aria-live="assertive">
            <LinkExpiredState errorState={errorState} />

            <div className="h-px bg-glass-border w-full my-4 md:my-6 shrink-0" aria-hidden="true" />

            <ResendVerificationForm
              resendSuccess={resendSuccess}
              resendError={resendError}
              isResending={isResending}
              form={form}
              onResendSubmit={onResendSubmit}
            />

            <nav
              className="text-center pt-2 md:pt-4 w-full flex items-center justify-center"
              aria-label="Back to Login Navigation"
            >
              <Link
                href="/login"
                className="text-xs sm:text-sm text-foreground/50 hover:text-foreground font-semibold inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-4 rounded-full transition-colors"
              >
                Back to Sign In
              </Link>
            </nav>
          </section>
        ) : null}
      </GlassCard>
    </motion.article>
  );
}
