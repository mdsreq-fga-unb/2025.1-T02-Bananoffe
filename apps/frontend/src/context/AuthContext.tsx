'use client';

import { createContext, useContext } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toaster } from '@/components/ui/toaster';
import axios from 'axios';
import { User, UserRole } from '@/types/User.type';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  updateUser: (data: Partial<User>) => Promise<void>;
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

      router.push(session?.user?.role === 'admin' ? '/cadastro' : '/');
    }
  };

  const logout = () => {
    signOut({ callbackUrl: '/login' });
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      const token = session?.user?.accessToken;
      if (!token) throw new Error("Usuário não autenticado");

      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toaster.create({
        title: 'Dados atualizados!',
        description: 'Suas informações foram salvas com sucesso',
        type: 'success',
      });
    } catch (error) {
      let errorMessage = 'Erro ao atualizar dados';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      }

      toaster.create({
        title: 'Erro na atualização',
        description: errorMessage,
        type: 'error',
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        login,
        logout,
        isLoading: status === 'loading',
        updateUser,
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
