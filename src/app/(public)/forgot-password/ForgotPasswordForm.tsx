'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { ForgotPasswordSuccess } from './components/ForgotPasswordSuccess';
import { ForgotPasswordInputForm } from './components/ForgotPasswordInputForm';
import { useForgotPasswordLogic } from '@/hooks/useForgotPasswordLogic';

export default function ForgotPasswordForm() {
  const { isMounted, isLoading, errorMsg, successMsg, form, onSubmit } = useForgotPasswordLogic();

  if (!isMounted) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-md z-10 px-4 sm:px-0"
    >
      <GlassCard className="p-6 sm:p-8 md:p-10 shadow-lg md:shadow-2xl border-accent/20 w-full flex flex-col">
        <header className="flex flex-col items-center mb-6 sm:mb-8 w-full">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-[1rem] sm:rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-4 shadow-[0_0_20px_rgba(14,165,233,0.2)]"
          >
            <KeyRound className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" role="presentation" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center">
            Reset Your APXTeck Password
          </h1>
          <p className="text-foreground/60 text-xs sm:text-sm mt-2 text-center max-w-[280px] sm:max-w-none">
            Enter your email address and we will send you a secure link to reset your password.
          </p>
        </header>

        {successMsg ? (
          <ForgotPasswordSuccess successMsg={successMsg} />
        ) : (
          <ForgotPasswordInputForm
            errorMsg={errorMsg}
            isLoading={isLoading}
            form={form}
            onSubmit={onSubmit}
          />
        )}
      </GlassCard>
    </motion.article>
  );
}
