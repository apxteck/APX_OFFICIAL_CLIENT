import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

export function useGoogleAuthLogic() {
  const router = useRouter();
  const { user, isLoading, refresh } = useAuth();
  const [hasRefreshed, setHasRefreshed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error('Failed to refresh user session:', err);
      } finally {
        if (isMounted) {
          setHasRefreshed(true);
        }
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, [refresh]);

  useEffect(() => {
    if (hasRefreshed && !isLoading) {
      if (user) {
        // Securely setting local storage states
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', user.role || 'CUSTOMER');
        localStorage.setItem('userName', user.fullName || 'User');

        const role = (user.role || 'CUSTOMER').toUpperCase();
        const redirectPath =
          role === 'ADMIN' || role === 'SUPER_ADMIN' || role === 'STAFF'
            ? '/admin'
            : role === 'EMPLOYEE'
              ? '/employee'
              : '/customer';

        // Use replace instead of push to prevent back-button looping to this success page
        router.replace(redirectPath);
      } else {
        // If no user is authenticated after refresh, redirect back to login
        router.replace('/login');
      }
    }
  }, [hasRefreshed, isLoading, user, router]);

  return null;
}
