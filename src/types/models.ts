export type Sex = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very';
export type PaceId = 'slow' | 'balanced' | 'fast';
export type Goal = 'lose' | 'maintain' | 'gain';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

// profiles
export interface ProfileData {
  username: string;
  pal_name: string;
  age: number;
  height_cm: number;
  weight_kg: number;
  target_weight_kg: number;
  sex: Sex;
  activity_level: ActivityLevel;
  goal_type: Goal;
  pace: PaceId;
  tdee: number;
  daily_budget: number;
}

export interface Profile extends ProfileData {
  user_id: string;
  created_at: string;
}

// meals
export interface NewMeal {
  date: string; // YYYY-MM-DD
  meal_type: MealType;
  description: string;
  total_kcal: number;
  photo_before_url?: string;
  photo_after_url?: string;
}

export interface Meal extends NewMeal {
  id: string;
  user_id: string;
  logged_at: string;
}

// meal_items
export interface NewMealItem {
  meal_id: string;
  name: string;
  portion?: string;
  kcal: number;
  eaten?: boolean;
}

export interface MealItem extends NewMealItem {
  id: string;
}

// water_logs
export interface NewWaterLog {
  date: string; // YYYY-MM-DD
  amount_bottles: number;
}

export interface WaterLog extends NewWaterLog {
  id: string;
  user_id: string;
  logged_at: string;
}

// bottle_config
export interface BottleConfig {
  user_id: string;
  bottle_name: string;
  bottle_ml: number;
}

// workouts
export interface NewWorkout {
  date: string; // YYYY-MM-DD
  name: string;
  duration_min: number;
  kcal_burned?: number;
  source?: string;
}

export interface Workout extends NewWorkout {
  id: string;
  user_id: string;
}
