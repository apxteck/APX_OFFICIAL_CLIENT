export const checkRateLimit = (key: string, limit: number = 5, windowMs: number = 900000): boolean => {
  if (typeof window === 'undefined') return false;
  const now = Date.now();
  const attempts: number[] = JSON.parse(
    localStorage.getItem(key) || '[]'
  ) as number[];

  // Filter out attempts older than windowMs
  const activeAttempts = attempts.filter((timestamp) => now - timestamp < windowMs);
  localStorage.setItem(key, JSON.stringify(activeAttempts));

  return activeAttempts.length >= limit;
};

export const recordAttempt = (key: string) => {
  if (typeof window === 'undefined') return;
  const attempts: number[] = JSON.parse(
    localStorage.getItem(key) || '[]'
  ) as number[];
  attempts.push(Date.now());
  localStorage.setItem(key, JSON.stringify(attempts));
};
