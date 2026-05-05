import { createContext, useContext } from 'react';

export type Sex = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very';
export type PaceId = 'slow' | 'balanced' | 'fast';

export interface ProfileSetup {
  age: number;
  heightCm: number;
  weightKg: number;
  targetWeightKg: number;
  sex: Sex;
  activityLevel: ActivityLevel;
  dailyBudgetKcal: number;
}

interface OnboardingState {
  palName: string;
  setPalName: (name: string) => void;
  goal: string;
  setGoal: (goal: string) => void;
  pace: PaceId;
  setPace: (pace: PaceId) => void;
  profile: ProfileSetup | null;
  setProfile: (profile: ProfileSetup) => void;
}

export const OnboardingContext = createContext<OnboardingState | null>(null);

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx)
    throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
};
