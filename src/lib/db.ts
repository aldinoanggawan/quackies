import { supabase } from './supabase';
import type {
  Profile,
  ProfileData,
  Meal,
  NewMeal,
  MealItem,
  NewMealItem,
  WaterLog,
  NewWaterLog,
  BottleConfig,
  Workout,
  NewWorkout,
} from '../types/models';

export const isUsernameTaken = async (username: string): Promise<boolean> => {
  const { data } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', username.toLowerCase().trim())
    .maybeSingle();
  return data !== null; // true = taken, false = available
};

export const saveUsername = async (
  userId: string,
  username: string,
): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
    .upsert({ user_id: userId, username }, { onConflict: 'user_id' });
  if (error) throw error;
};

export const saveProfile = async (
  userId: string,
  profile: ProfileData,
): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
    .upsert({ user_id: userId, ...profile }, { onConflict: 'user_id' });
  if (error) throw error;
};

export const getProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data;
};

export const logMeal = async (userId: string, meal: NewMeal): Promise<void> => {
  const { error } = await supabase
    .from('meals')
    .insert({ user_id: userId, ...meal });
  if (error) throw error;
};

export const getMealsForDate = async (
  userId: string,
  date: string,
): Promise<Meal[]> => {
  const { data, error } = await supabase
    .from('meals')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date)
    .order('logged_at');
  if (error) throw error;
  return data ?? [];
};

export const logMealItems = async (items: NewMealItem[]): Promise<void> => {
  const { error } = await supabase.from('meal_items').insert(items);
  if (error) throw error;
};

export const getMealItems = async (mealId: string): Promise<MealItem[]> => {
  const { data, error } = await supabase
    .from('meal_items')
    .select('*')
    .eq('meal_id', mealId);
  if (error) throw error;
  return data ?? [];
};

export const logWater = async (
  userId: string,
  log: NewWaterLog,
): Promise<void> => {
  const { error } = await supabase
    .from('water_logs')
    .insert({ user_id: userId, ...log });
  if (error) throw error;
};

export const getWaterForDate = async (
  userId: string,
  date: string,
): Promise<WaterLog[]> => {
  const { data, error } = await supabase
    .from('water_logs')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date)
    .order('logged_at');
  if (error) throw error;
  return data ?? [];
};

export const getBottleConfig = async (
  userId: string,
): Promise<BottleConfig | null> => {
  const { data, error } = await supabase
    .from('bottle_config')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data;
};

export const saveBottleConfig = async (
  userId: string,
  config: Omit<BottleConfig, 'user_id'>,
): Promise<void> => {
  const { error } = await supabase
    .from('bottle_config')
    .upsert({ user_id: userId, ...config }, { onConflict: 'user_id' });
  if (error) throw error;
};

export const logWorkout = async (
  userId: string,
  workout: NewWorkout,
): Promise<void> => {
  const { error } = await supabase
    .from('workouts')
    .insert({ user_id: userId, ...workout });
  if (error) throw error;
};

export const updateWorkout = async (
  workoutId: string,
  fields: Partial<NewWorkout>,
): Promise<void> => {
  const { error } = await supabase
    .from('workouts')
    .update(fields)
    .eq('id', workoutId);
  if (error) throw error;
};

export const getWorkoutsForDate = async (
  userId: string,
  date: string,
): Promise<Workout[]> => {
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date);
  if (error) throw error;
  return data ?? [];
};
