'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type User = { email: string };

type AuthCtx = {
  user: User | null;
  login(email: string): void;
  logout(): void;
};

const AuthContext = createContext<AuthCtx>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const LS_KEY = 'heist-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = typeof window !== 'undefined' && localStorage.getItem(LS_KEY);
    if (raw) setUser(JSON.parse(raw));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(LS_KEY, JSON.stringify(user));
    else localStorage.removeItem(LS_KEY);
  }, [user]);

  const login = (email: string) => {
    setUser({ email });

    const guestCart = localStorage.getItem('heist-cart-guest');
    if (guestCart) {
      localStorage.setItem(`heist-cart-${email}`, guestCart);
      localStorage.removeItem('heist-cart-guest');
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
