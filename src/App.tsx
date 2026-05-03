import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const Placeholder = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center min-h-screen text-[var(--color-muted)]">
    {name}
  </div>
);

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<Placeholder name="Onboarding" />} />
        <Route path="/home" element={<Placeholder name="Home" />} />
        <Route path="/log" element={<Placeholder name="Log" />} />
        <Route path="/water" element={<Placeholder name="Water" />} />
        <Route path="/progress" element={<Placeholder name="Progress" />} />
        <Route path="/profile" element={<Placeholder name="Profile" />} />
      </Routes>
    </BrowserRouter>
  );
};
