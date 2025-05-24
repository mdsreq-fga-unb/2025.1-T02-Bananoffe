'use client';

import { createContext, useContext } from 'react';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toaster } from '@/components/ui/toaster';
import axios from 'axios';
import { User, UserRole } from '@/types/User.type';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const res = await signIn("credentials", {
      email,
      senha: password,
      redirect: false,
    });

    if (res?.error) {
      toaster.create({
        title: 'Erro ao fazer login',
        description: res.error,
        type: 'error',
      });
    } else {
      toaster.create({
        title: 'Login realizado com sucesso!',
        type: 'success',
      });

      const session = await getSession();
      router.push(session?.user?.role === 'admin' ? '/admin_cardapio' : '/');
    }
  };

  const logout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        login,
        logout,
        isLoading: status === 'loading',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
