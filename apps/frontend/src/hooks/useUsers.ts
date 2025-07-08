'use client';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { toaster } from '@/components/ui/toaster';
import { CreateUserDto, UpdateUserDto, User } from '@/types/User.type';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const APIURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Função utilitária para extrair mensagens de erro
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (Array.isArray(data?.message)) {
      return data.message.join(' | ');
    }

    return data?.message || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Erro desconhecido.';
};

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const { data: session } = useSession();
  const Router = useRouter();

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<User[]>(`${APIURL}/usuario/listar`);
      setUsers(response.data);
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toaster.create({
        title: 'Erro ao buscar usuários',
        description: errorMessage,
        type: 'error',
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = useCallback(async (id: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const response = await axios.get<User>(`${APIURL}/usuario/listar/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toaster.create({
        title: `Erro ao Buscar Usuário`,
        description: errorMessage,
        type: 'error',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  },[]);

  const createUser = async (data: CreateUserDto) => {
    setIsLoading(true);
    try {
      await axios.post(`${APIURL}/usuario/cadastrar`, data);

      toaster.create({
        title: 'Usuário criado com sucesso!',
        type: 'success',
      });

      await getUsers();
      return true;
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      toaster.create({
        title: 'Erro ao criar usuário',
        description: errorMessage,
        type: 'error',
      });

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (data: UpdateUserDto) => {
    setIsLoading(true);
    try {
      await axios.patch(`${APIURL}/usuario/atualizar/${data.id}`, data);

      toaster.create({
        title: 'Usuário atualizado com sucesso!',
        type: 'success',
      });

      await getUsers();
      return true;
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      toaster.create({
        title: 'Erro ao atualizar usuário',
        description: errorMessage,
        type: 'error',
      });

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`${APIURL}/usuario/${id}`, {
        data: { id },
      });

      toaster.create({
        title: 'Usuário deletado com sucesso!',
        type: 'success',
      });

      await getUsers();
      return true;
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      toaster.create({
        title: 'Erro ao deletar usuário',
        description: errorMessage,
        type: 'error',
      });

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMyAccount = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`${APIURL}/usuario/minha-conta`, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });

      toaster.create({
        title: 'Usuário deletado com sucesso!',
        type: 'success',
        duration: 1000,
      });

      Router.push('/login');
      return true;
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      toaster.create({
        title: 'Erro ao deletar usuário',
        description: errorMessage,
        type: 'error',
      });

      return false;
    } finally {
      setIsLoading(false);
    }
  }

  const verificarSenha = async (senha: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${APIURL}/usuario/verificar-senha`, { password: senha }, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toaster.create({
        title: 'Erro ao verificar senha',
        description: errorMessage,
        type: 'error',
      });
      return false;
    }
  }

  return { users, getUsers,getUser, createUser, updateUser, deleteUser, isLoading, deleteMyAccount, verificarSenha };
};
