import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoadingScreen } from './LoadingScreen';

export const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
