'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toaster } from '@/components/ui/toaster';
import { User } from '@/types/User.type';


interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const APIURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const login = async (email: string, senha: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${APIURL}/auth/login`, { email, senha });
      
      if (!response.data.access_token) {
        throw new Error('Token não recebido');
      }

      const userData: User = {
          id: response.data.id,
          nome: response.data.nome,
          role: response.data.role,
          telefone: '',
          email: ''
      };

      localStorage.setItem('authToken', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      toaster.create({
        title: 'Login realizado com sucesso!',
        type: 'success',
      });

      router.push(userData.role === 'admin' ? '/cadastro' : '/');

      return true;
    } catch (error) {
      let errorMessage = 'Verifique seus dados e tente novamente.';

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      }

      toaster.create({
        title: 'Erro ao fazer login',
        description: errorMessage,
        type: 'error',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
