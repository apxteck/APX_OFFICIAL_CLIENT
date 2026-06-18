'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function LoginFormHeader() {
  return (
    <div className="flex flex-col items-center mb-8">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="relative w-40 h-14 mb-4"
      >
        <Image
          src="/APX Teck - Final Logo -01.png"
          alt="APXTeck IT Agency Logo Light"
          fill
          sizes="160px"
          className="object-contain dark:hidden"
          priority
        />
        <Image
          src="/APX Teck - Final Logo -03.png"
          alt="APXTeck IT Agency Logo Dark"
          fill
          sizes="160px"
          className="object-contain hidden dark:block"
          priority
        />
      </motion.div>
      <h1 id="login-heading" className="text-2xl font-bold tracking-tight text-foreground">
        Welcome Back to APXTeck
      </h1>
      <p className="text-foreground/60 text-sm mt-1 text-center font-medium">
        Sign in to your IT dashboard
      </p>
    </div>
  );
}
