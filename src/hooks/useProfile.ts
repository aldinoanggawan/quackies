import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { getProfile } from '../lib/db';
import type { Profile } from '../types/models';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getProfile(user.id)
      .then(setProfile)
      .finally(() => setLoading(false));
  }, [user]);

  return { profile, loading };
};
