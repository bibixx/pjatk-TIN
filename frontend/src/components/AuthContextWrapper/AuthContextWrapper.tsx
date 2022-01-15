import { SafeUserTable } from '@s19192/shared';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Cookies from 'cookies-js';

export const AuthContext = createContext<{
  user: SafeUserTable | null;
  login: (user: SafeUserTable) => void;
  logout: () => void;
}>({
  user: null,
  login: () => undefined,
  logout: () => undefined,
});

interface Props {
  children: React.ReactNode;
}

const USER_STORAGE_KEY = 'USER';
const getUserFromStorage = () => {
  const rawItem = Cookies.get(USER_STORAGE_KEY);

  if (!rawItem) {
    return null;
  }

  return JSON.parse(rawItem);
};

const saveUserToStorage = (user: SafeUserTable | null) => {
  if (!user) {
    Cookies.expire(USER_STORAGE_KEY);
    return;
  }

  Cookies.set(USER_STORAGE_KEY, JSON.stringify(user));
};

export const AuthContextWrapper = ({ children }: Props) => {
  const [user, setUser] = useState<SafeUserTable | null>(getUserFromStorage());

  useEffect(() => {
    saveUserToStorage(user);
  }, [user]);

  const login = useCallback((newUser: SafeUserTable) => setUser(newUser), []);
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const context = useMemo(
    () => ({ user, login, logout }),
    [login, logout, user],
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
