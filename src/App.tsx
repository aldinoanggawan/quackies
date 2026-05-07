import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingProvider } from './store/OnboardingContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { OnboardingLayout } from './screens/onboarding/OnboardingLayout';
import { Splash } from './screens/onboarding/Splash';
import { TrackCalories } from './screens/onboarding/TrackCalories';
import { StayHydrated } from './screens/onboarding/StayHydrated';
import { DailySummary } from './screens/onboarding/DailySummary';
import { MeetYourPal } from './screens/onboarding/MeetYourPal';
import { GoalSelection } from './screens/onboarding/GoalSelection';
import { PaceSelection } from './screens/onboarding/PaceSelection';
import { ProfileSetup } from './screens/onboarding/ProfileSetup';
import { HomeScreen } from './screens/Home';
import { AuthScreen } from './screens/auth/AuthScreen';

const Placeholder = ({ name }: { name: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100dvh',
      color: 'var(--color-muted)',
    }}
  >
    {name}
  </div>
);

export const App = () => {
  return (
    <OnboardingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/onboarding" element={<OnboardingLayout />}>
              <Route index element={<Navigate to="2" replace />} />
              <Route path="2" element={<TrackCalories />} />
              <Route path="3" element={<StayHydrated />} />
              <Route path="4" element={<DailySummary />} />
              <Route path="5" element={<MeetYourPal />} />
              <Route path="6" element={<GoalSelection />} />
              <Route path="7" element={<PaceSelection />} />
              <Route path="8" element={<ProfileSetup />} />
            </Route>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/log" element={<Placeholder name="Log" />} />
            <Route path="/water" element={<Placeholder name="Water" />} />
            <Route path="/progress" element={<Placeholder name="Progress" />} />
            <Route path="/profile" element={<Placeholder name="Profile" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </OnboardingProvider>
  );
};
