'use client';
import { useState } from 'react';
import axios from 'axios';
import { toaster } from '@/components/ui/toaster';
import { ResetPasswordDto } from '@/types/User.type';

const APIURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (Array.isArray(data?.message)) {
      return data.message[0]; // ou junte todos com .join(' | ') se quiser
    }

    return data?.message || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Erro desconhecido.';
};

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [codigoValidado, setCodigoValidado] = useState(false);

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
      const errorMessage = getErrorMessage(error);

      toaster.create({
        title: 'Erro ao enviar código',
        description: errorMessage,
        type: 'error',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const validateCode = async (email: string, codigo: string) => {
    setIsLoading(true);
    try {
      await axios.post(`${APIURL}/auth/validarCodigo`, { email, codigo });

      toaster.create({
        title: 'Código validado!',
        description: 'Você pode redefinir sua senha.',
        type: 'success',
      });

      setCodigoValidado(true);
      return true;
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      toaster.create({
        title: 'Erro ao validar código',
        description: errorMessage,
        type: 'error',
      });

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (data: ResetPasswordDto) => {
    if (!codigoValidado) {
      toaster.create({
        title: 'Código ainda não validado!',
        description: 'Valide o código antes de redefinir a senha.',
        type: 'warning',
      });
      return false;
    }

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
      const errorMessage = getErrorMessage(error);

      toaster.create({
        title: 'Erro ao redefinir senha',
        description: errorMessage,
        type: 'error',
      });

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendResetCode, validateCode, resetPassword, isLoading };
};
