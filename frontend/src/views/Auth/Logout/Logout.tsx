import { useAuth } from 'hooks/useAuth/useAuth';
import { useCallback, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { makeRequest } from 'utils/makeRequest';

export const Logout = () => {
  const { user, logout } = useAuth();

  const logOutEffect = useCallback(async () => {
    await makeRequest('/api/auth/logout', 'POST');

    logout();
  }, [logout]);

  useEffect(() => {
    logOutEffect();
  }, [logOutEffect]);

  if (user !== null) {
    return null;
  }

  return <Navigate to="/login" replace />;
};
