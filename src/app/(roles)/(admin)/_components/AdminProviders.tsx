'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useSocket } from '@/hooks/useSocket';

export function AdminProviders() {
  useSocket();

  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: 'dark:bg-[#151515] dark:text-white dark:border-white/10 border',
        style: {
          borderRadius: '12px',
          padding: '12px 16px',
          fontWeight: 600,
          fontSize: '14px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        },
      }}
    />
  );
}
