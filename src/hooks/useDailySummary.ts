import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { getMealsForDate, getWorkoutsForDate } from '../lib/db';
import { toDateString } from '../lib/dateHelpers';
import type { Meal, Workout } from '../types/models';

interface DailySummary {
  meals: Meal[];
  workouts: Workout[];
  eaten: number;
  burned: number;
  remaining: number;
  loading: boolean;
  refresh: () => void;
}

export const useDailySummary = (tdee: number, date: Date): DailySummary => {
  const { user } = useAuth();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  const dateStr = toDateString(date);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    Promise.all([
      getMealsForDate(user.id, dateStr),
      getWorkoutsForDate(user.id, dateStr),
    ]).then(([m, w]) => {
      if (cancelled) return;
      setMeals(m);
      setWorkouts(w);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [user, dateStr, tick]);

  const refresh = () => setTick((t) => t + 1);

  const eaten = meals.reduce((sum, m) => sum + m.total_kcal, 0);
  const burned = workouts.reduce((sum, w) => sum + (w.kcal_burned ?? 0), 0);
  const remaining = tdee - eaten + burned;

  return { meals, workouts, eaten, burned, remaining, loading, refresh };
};
