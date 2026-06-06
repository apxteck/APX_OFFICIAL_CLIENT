'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

export default function GoogleAuthSuccessPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    if (typeof window !== 'undefined') {
      // Set authenticated indicators
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'CUSTOMER'); // Default Customer role assigned by OAuth
      localStorage.setItem('userName', 'Google Client');

      // Redirect immediately to dashboard portal
      setTimeout(() => {
        router.push('/dashboard');
      }, 800);
    }
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-4 p-8 rounded-3xl glass-panel border border-glass-border shadow-xl max-w-sm text-center">
        <Loader className="w-10 h-10 text-accent animate-spin" />
        <h2 className="text-xl font-extrabold tracking-tight">Authenticating with Google</h2>
        <p className="text-foreground/50 text-xs leading-relaxed">
          Google authentication successful! Setting session states and redirecting you to your
          portal dashboard...
        </p>
      </div>
    </div>
  );
}
