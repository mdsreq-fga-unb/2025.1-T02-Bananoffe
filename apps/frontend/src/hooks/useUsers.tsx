'use client';
import { useState } from 'react';
import axios from 'axios';
import { toaster } from '../components/ui/toaster';

const APIURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

interface CreateUserDto {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  dataNascimento: string;
}

interface UpdateUserDto {
  id: string;
  nome?: string;
  email?: string;
  telefone?: string;
  senha?: string;
  dataNascimento?: string;
}

export const userManager = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (data: CreateUserDto) => {
    setIsLoading(true);
    try {
      await axios.post(`${APIURL}/usuarios`, data);

      toaster.create({
        title: 'Usuário criado com sucesso!',
        type: 'success',
      });
      
      return true;
    } catch (error) {
      console.error(error);
      toaster.create({
        title: 'Erro ao criar usuário',
        description: 'Verifique os dados e tente novamente.',
        type: 'error',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updaterUser = async (data: UpdateUserDto) => {
    setIsLoading(true);
    try {
      await axios.patch(`${APIURL}/usuarios/${data.id}`, data);

      toaster.create({
        title: 'Usuário atualizado com sucesso!',
        type: 'success',
      });
      
      return true;
    } catch (error) {
      console.error(error);
      toaster.create({
        title: 'Erro ao atualizar usuário',
        description: 'Verifique os dados e tente novamente.',
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
      await axios.delete(`${APIURL}/usuarios/${id}`);

      toaster.create({
        title: 'Usuário deletado com sucesso!',
        type: 'success',
      });
      
      return true;
    } catch (error) {
      console.error(error);
      toaster.create({
        title: 'Erro ao deletar usuário',
        description: 'Tente novamente mais tarde.',
        type: 'error',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { createUser, updaterUser, deleteUser, isLoading };
};
