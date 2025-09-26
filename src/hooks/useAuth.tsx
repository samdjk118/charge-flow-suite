import { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signIn: (account: string, password: string) => Promise<{ error?: string }>;
  signUp: (account: string, password: string) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signOut: async () => {},
  signIn: async () => ({}),
  signUp: async () => ({}),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const userData = await apiFetch('/users/me/');
      setUser(userData);
    } catch (error) {
      localStorage.removeItem('access_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (account: string, password: string) => {
    try {
      const data = await apiFetch('/auth/login/', {
        method: 'POST',
        body: JSON.stringify({ account, password }),
      });
      
      if (data.access) {
        localStorage.setItem('access_token', data.access);
        setUser(data.user);
        window.location.reload();
        return {};
      }
      return { error: '登入失敗' };
    } catch (error: any) {
      return { error: error.message || '登入時發生錯誤' };
    }
  };

  const signUp = async (account: string, password: string) => {
    try {
      const data = await apiFetch('/auth/register/', {
        method: 'POST',
        body: JSON.stringify({ account, password }),
      });
      
      if (data.success) {
        return {};
      }
      return { error: '註冊失敗' };
    } catch (error: any) {
      return { error: error.message || '註冊時發生錯誤' };
    }
  };

  const signOut = async () => {
    try {
      await apiFetch('/auth/logout/', { method: 'POST' });
    } catch (error) {
      // 即使後端登出失敗，也要清除本地資料
    }
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);