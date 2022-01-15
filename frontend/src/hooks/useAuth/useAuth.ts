import { AuthContext } from 'components/AuthContextWrapper/AuthContextWrapper';
import { useContext } from 'react';

export const useAuth = () => {
  const { user, login, logout } = useContext(AuthContext);

  const isParticipant = user?.userType === 'participant';
  const isAdmin = user?.userType === 'admin';
  const isLoggedIn = user !== null;

  return {
    user,
    login,
    logout,
    isParticipant,
    isAdmin,
    isLoggedIn,
  };
};
