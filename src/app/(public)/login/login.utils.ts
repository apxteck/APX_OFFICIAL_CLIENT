export const checkRateLimit = (): boolean => {
  if (typeof window === 'undefined') return false;
  const now = Date.now();
  const failedAttempts: number[] = JSON.parse(
    localStorage.getItem('failed_login_attempts') || '[]'
  ) as number[];

  // Keep attempts within the last 15 minutes (900000ms)
  const activeAttempts = failedAttempts.filter((t) => now - t < 900000);
  localStorage.setItem('failed_login_attempts', JSON.stringify(activeAttempts));

  return activeAttempts.length >= 5;
};

export const recordFailedAttempt = () => {
  if (typeof window === 'undefined') return;
  const failedAttempts: number[] = JSON.parse(
    localStorage.getItem('failed_login_attempts') || '[]'
  ) as number[];
  failedAttempts.push(Date.now());
  localStorage.setItem('failed_login_attempts', JSON.stringify(failedAttempts));
};

export const clearFailedAttempts = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('failed_login_attempts');
};
