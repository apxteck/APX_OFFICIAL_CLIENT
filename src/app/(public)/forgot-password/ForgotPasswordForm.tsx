'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { KeyRound, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useForgotPasswordLogic } from '@/hooks/useForgotPasswordLogic';

export default function ForgotPasswordForm() {
  const {
    isMounted,
    isLoading,
    errorMsg,
    successMsg,
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    onSubmit,
  } = useForgotPasswordLogic();

  if (!isMounted) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-md z-10"
    >
      <GlassCard className="p-8 sm:p-10 shadow-2xl border-accent/20">
        <header className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-4 shadow-[0_0_20px_rgba(14,165,233,0.2)]"
          >
            <KeyRound className="w-7 h-7" aria-hidden="true" role="presentation" />
          </motion.div>
          <h1 className="text-3xl font-extrabold tracking-tight text-center">Reset Password</h1>
          <p className="text-foreground/60 text-sm mt-2 text-center">
            Enter your email address and we will send you a secure link to reset your password.
          </p>
        </header>

        {successMsg ? (
          <section className="space-y-6 text-center py-4" aria-live="polite">
            <div className="inline-flex w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/35 items-center justify-center text-emerald-500 mx-auto">
              <CheckCircle2 className="w-9 h-9" aria-hidden="true" role="presentation" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tight text-emerald-500">
                Reset Link Sent
              </h2>
              <p className="text-foreground/70 text-sm leading-relaxed max-w-sm mx-auto">
                {successMsg}
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-accent hover:bg-accent/90 text-white px-6 text-sm font-semibold transition-transform hover:scale-102 active:scale-98 shadow-md"
                aria-label="Return to login page"
              >
                Back to Login
              </Link>
            </div>
          </section>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {errorMsg && (
              <div 
                className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/35 text-rose-500 text-sm flex gap-2.5 items-center font-semibold"
                role="alert"
                aria-live="assertive"
              >
                <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" role="presentation" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-foreground/75">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full bg-foreground/[0.02] border border-glass-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-sm font-medium"
                placeholder="you@company.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                required
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-rose-500 font-medium pl-1" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group w-full h-12 mt-4 rounded-xl bg-accent text-white font-bold hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/25 disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
              aria-label={isLoading ? "Sending reset link" : "Send Reset Link"}
            >
              {isLoading ? 'Sending link...' : 'Send Reset Link'}
              {!isLoading && (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" role="presentation" />
              )}
            </button>

            <p className="text-center text-xs text-foreground/60 mt-6 font-medium">
              Remember your password?{' '}
              <Link href="/login" className="text-accent hover:underline font-bold">
                Sign In
              </Link>
            </p>
          </form>
        )}
      </GlassCard>
    </motion.article>
  );
}
