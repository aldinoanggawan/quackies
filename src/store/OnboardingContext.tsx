import React, { useState } from 'react';
import { OnboardingContext } from './useOnboarding';

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [palName, setPalName] = useState('');
  const [goal, setGoal] = useState('');

  return (
    <OnboardingContext.Provider value={{ palName, setPalName, goal, setGoal }}>
      {children}
    </OnboardingContext.Provider>
  );
};
