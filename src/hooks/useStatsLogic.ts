import { useState, useEffect } from 'react';
import { api } from '@/lib/axios';
import { StatsOverview } from '@/app/types/analytics.types';

export function useStatsLogic() {
  const [stats, setStats] = useState<StatsOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await api.fetchStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load stats', err);
        setError('Failed to load stats');
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  return { stats, isLoading, error };
}
