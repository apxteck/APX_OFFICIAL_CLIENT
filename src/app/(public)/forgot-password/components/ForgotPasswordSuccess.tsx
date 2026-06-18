'use client';

import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface ForgotPasswordSuccessProps {
  successMsg: string;
}

export function ForgotPasswordSuccess({ successMsg }: ForgotPasswordSuccessProps) {
  return (
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
      <div className="pt-4 flex items-center justify-center">
        <Link
          href="/login"
          className="inline-flex min-h-[44px] sm:min-h-[48px] w-full sm:w-auto items-center justify-center rounded-xl bg-accent hover:bg-accent/90 text-white px-8 text-sm sm:text-base font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
          aria-label="Return to login page"
        >
          Back to Login
        </Link>
      </div>
    </section>
  );
}
