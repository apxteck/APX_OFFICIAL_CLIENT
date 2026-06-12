import { useState, useEffect } from 'react';
import { api } from '@/lib/axios';
import { TeamMember } from '@/app/types/user.types';

export function useTeamLogic() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTeam() {
      try {
        const data = await api.fetchTeamMembers();
        setTeam(data);
      } catch (err) {
        console.error('Failed to load team profiles', err);
        setError('Failed to load team profiles');
      } finally {
        setIsLoading(false);
      }
    }
    loadTeam();
  }, []);

  return { team, isLoading, error };
}
