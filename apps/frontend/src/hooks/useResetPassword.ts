'use client';
import { useState } from 'react';
import axios from 'axios';
import { toaster } from '@/components/ui/toaster';
import { ResetPasswordDto } from '@/types/User.type';

const APIURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendResetCode = async (email: string) => {
    setIsLoading(true);
    try {
      await axios.post(`${APIURL}/auth/enviarCodigo`, { email });

      toaster.create({
        title: 'Código enviado com sucesso!',
        description: 'Verifique seu e-mail para digitar o código.',
        type: 'success',
      });

      return true;
    } catch (error) {
      console.error(error);
      toaster.create({
        title: 'Erro ao enviar código',
        description: 'Verifique seu e-mail e tente novamente.',
        type: 'error',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (data: ResetPasswordDto) => {
    setIsLoading(true);
    try {
      await axios.post(`${APIURL}/auth/resetPassword`, data);

      toaster.create({
        title: 'Senha redefinida!',
        description: 'Agora você pode fazer login.',
        type: 'success',
      });

      return true;
    } catch (error) {
      console.error(error);
      toaster.create({
        title: 'Erro ao redefinir senha',
        description: 'Tente novamente mais tarde.',
        type: 'error',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendResetCode, resetPassword, isLoading };
};
