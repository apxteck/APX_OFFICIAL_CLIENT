'use client';

import { Suspense } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useResetPasswordLogic } from '@/hooks/useResetPasswordLogic';

function ResetPasswordForm() {
  const {
    isMounted,
    isLoading,
    errorMsg,
    token,
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    onSubmit,
  } = useResetPasswordLogic();

  if (!isMounted) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-md relative z-10"
      aria-labelledby="reset-password-heading"
    >
      <GlassCard className="p-8 sm:p-10 shadow-2xl border-accent/20">
        <header className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-4 shadow-[0_0_20px_rgba(14,165,233,0.2)]"
            aria-hidden="true"
          >
            <Lock className="w-7 h-7" aria-hidden="true" role="presentation" />
          </motion.div>
          <h1 id="reset-password-heading" className="text-3xl font-extrabold tracking-tight text-center">
            New Password
          </h1>
          <p className="text-foreground/60 text-sm mt-2 text-center">
            Create a strong, new password for your APXTeck account.
          </p>
        </header>

        {!token && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/35 text-rose-500 text-sm flex gap-2.5 items-center font-semibold mb-6" role="alert">
            <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" role="presentation" />
            <span>Invalid link. Reset token is missing from the browser URL address bar.</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate aria-label="Reset Password Form">
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/35 text-rose-500 text-sm flex gap-2.5 items-center font-semibold" role="alert">
              <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" role="presentation" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-foreground/75">
              New Password *
            </label>
            <input
              id="password"
              type="password"
              disabled={!token}
              {...register('password')}
              className="w-full bg-foreground/[0.02] border border-glass-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-sm font-medium disabled:opacity-50"
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && (
              <p id="password-error" className="text-xs text-rose-500 font-medium pl-1" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-foreground/75">
              Confirm New Password *
            </label>
            <input
              id="confirmPassword"
              type="password"
              disabled={!token}
              {...register('confirmPassword')}
              className="w-full bg-foreground/[0.02] border border-glass-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-sm font-medium disabled:opacity-50"
              placeholder="••••••••"
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
            />
            {errors.confirmPassword && (
              <p id="confirm-password-error" className="text-xs text-rose-500 font-medium pl-1" role="alert">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !token}
            className="group w-full h-12 mt-4 rounded-xl bg-accent text-white font-bold hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/25 disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
            aria-disabled={isLoading || !token}
          >
            {isLoading ? (
              <>
                <span className="sr-only">Saving your new password</span>
                Saving password...
              </>
            ) : (
              <>
                Reset Password
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" role="presentation" />
              </>
            )}
          </button>
        </form>
      </GlassCard>
    </motion.section>
  );
}

export default function ResetPasswordClient() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-md h-[400px] flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-2xl border border-glass-border" aria-label="Loading form...">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
