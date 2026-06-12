'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { ShieldAlert, Mail, Send, CheckCircle2, AlertCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useVerifyEmailLogic } from '@/hooks/useVerifyEmailLogic';

export default function VerifyEmailClient() {
  const {
    isMounted,
    verifying,
    errorState,
    isResending,
    resendSuccess,
    resendError,
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    onResendSubmit,
  } = useVerifyEmailLogic();

  if (!isMounted) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-md"
      aria-labelledby="verify-email-heading"
    >
      <GlassCard className="p-8 sm:p-10 shadow-2xl border-accent/20">
        {verifying ? (
          <section className="flex flex-col items-center py-12 space-y-4" aria-live="polite">
            <Loader className="w-10 h-10 text-accent animate-spin" aria-hidden="true" role="presentation" />
            <h1 id="verify-email-heading" className="text-xl font-bold tracking-tight">Verifying Email</h1>
            <p className="text-foreground/50 text-xs text-center max-w-xs leading-relaxed">
              Cryptographically checking token validity. You will be redirected shortly...
            </p>
          </section>
        ) : errorState ? (
          <section className="space-y-6" aria-live="assertive">
            <header className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4 shadow-[0_0_20px_rgba(244,63,94,0.15)]" aria-hidden="true">
                <ShieldAlert className="w-7 h-7" aria-hidden="true" role="presentation" />
              </div>
              <h1 id="verify-email-heading" className="text-2xl font-extrabold tracking-tight text-center text-rose-500">
                Link Expired
              </h1>
              <p className="text-foreground/60 text-xs mt-2 text-center max-w-xs leading-relaxed">
                {errorState}
              </p>
            </header>

            <div className="h-px bg-glass-border w-full my-6" aria-hidden="true" />

            {resendSuccess ? (
              <div 
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/35 text-emerald-500 text-xs flex gap-2.5 items-center font-semibold"
                role="status"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" role="presentation" />
                <span>{resendSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onResendSubmit)} className="space-y-4" aria-label="Resend Verification Form">
                <h2 className="font-bold text-sm tracking-tight text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" aria-hidden="true" role="presentation" /> Request New Code
                </h2>

                {resendError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/35 text-rose-500 text-xs flex gap-2 items-center font-semibold" role="alert">
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" role="presentation" />
                    <span>{resendError}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="w-full bg-foreground/[0.02] border border-glass-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-xs font-medium"
                    placeholder="you@company.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-rose-500 font-medium pl-1" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isResending}
                  className="group w-full h-10 rounded-xl bg-accent text-white font-bold hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-xs shadow-md shadow-accent/15 cursor-pointer disabled:opacity-75"
                  aria-busy={isResending}
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" role="presentation" />
                  <span>{isResending ? 'Sending...' : 'Resend Verification'}</span>
                </button>
              </form>
            )}

            <nav className="text-center pt-4" aria-label="Back to Login Navigation">
              <Link
                href="/login"
                className="text-xs text-foreground/50 hover:text-foreground font-semibold"
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
