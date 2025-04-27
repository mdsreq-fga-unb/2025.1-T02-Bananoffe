'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toaster } from '../components/ui/toaster';

type UserRole = 'ADMIN' | 'CLIENTE';

interface AuthResponse {
  token: string;
  role: UserRole;
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // 1. Faz a chamada para a API de login
      const response = await axios.post<AuthResponse>('/api/auth/login', { 
        email, 
        password 
      });

      // 2. Verifica se recebeu um token válido
      if (!response.data.token) {
        throw new Error('Token não recebido');
      }

      // 3. Armazena o token no localStorage
      localStorage.setItem('authToken', response.data.token);
      
      // 4. Redireciona com base no role do usuário
      const redirectPath = response.data.role === 'ADMIN' 
        ? '/admin/dashboard' 
        : '/cliente/home';
      
      // 5. Mostra mensagem de sucesso
      toaster.create({
        title: 'Login realizado com sucesso',
        type: 'success',
      })
      
      // 6. Redireciona o usuário
      router.push(redirectPath);
      
      return true;
    } catch (error) {
      // 7. Trata diferentes tipos de erro
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
            toaster.create({
                title: 'Erro ao fazer login',
                description: 'Verifique os campos e tente novamente.',
                type: 'error',
              });
        } else if (error.response?.status === 404) {
            toaster.create({
                title: 'Usuário não encontrado',
                description: 'Crie sua conta.',
                type: 'error',
            })
        } else {
          toaster.create({
            title: 'Erro ao fazer login',
            description: 'Verifique os campos e tente novamente.',
            type: 'error',
          });
        }
      } else {
        toaster.create({
            title: 'Erro ao fazer login',
            type: 'error',
          })
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};