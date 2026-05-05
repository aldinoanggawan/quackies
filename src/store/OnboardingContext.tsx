import React, { useState } from 'react';
import {
  OnboardingContext,
  type Goal,
  type PaceId,
  type ProfileSetup,
} from './useOnboarding';

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [palName, setPalName] = useState('');
  const [goal, setGoal] = useState<Goal>('lose');
  const [pace, setPace] = useState<PaceId>('balanced');
  const [profile, setProfile] = useState<ProfileSetup | null>(null);

  return (
    <OnboardingContext.Provider
      value={{
        palName,
        setPalName,
        goal,
        setGoal,
        pace,
        setPace,
        profile,
        setProfile,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
