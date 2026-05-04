import { createContext, useContext } from 'react';

interface OnboardingState {
  palName: string;
  setPalName: (name: string) => void;
  goal: string;
  setGoal: (goal: string) => void;
}

export const OnboardingContext = createContext<OnboardingState | null>(null);

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx)
    throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
};
