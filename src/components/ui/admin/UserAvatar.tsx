import React from 'react';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  name?: string;
  src?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function UserAvatar({ name, src, size = 'md', className }: UserAvatarProps) {
  const sizes = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
    xl: 'w-14 h-14 text-xl',
  };

  const displayName = name || 'User';

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-bold overflow-hidden shrink-0',
        sizes[size],
        !src &&
          'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 shadow-sm',
        className
      )}
    >
      {src ? (
        <img src={src} alt={displayName} className="w-full h-full object-cover" />
      ) : (
        <span>{displayName.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}
