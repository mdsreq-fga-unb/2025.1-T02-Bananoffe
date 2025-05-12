"use client";
import { useState } from "react";
import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { CreateUserDto, UpdateUserDto, User } from "@/types/User.type";

const APIURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<User[]>(`${APIURL}/usuario/listar`);
      setUsers(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Erro ao buscar usuários",
        description: "Tente novamente mais tarde.",
        type: "error",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (data: CreateUserDto) => {
    setIsLoading(true);
    console.log(data);
    try {
      await axios.post(`${APIURL}/usuario/cadastrar`, data);

      toaster.create({
        title: "Usuário criado com sucesso!",
        type: "success",
      });

      await getUsers();
      return true;
    } catch (error) {
      let errorMessage = "Erro ao criar usuário";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      }

      toaster.create({
        title: "Erro",
        description: errorMessage,
        type: "error",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (data: UpdateUserDto) => {
    setIsLoading(true);
    try {
      console.log(data);
      await axios.patch(`${APIURL}/usuario/atualizar/${data.id}`, data);
  
      toaster.create({
        title: "Usuário atualizado com sucesso!",
        type: "success",
      });
  
      await getUsers();
      return true;
    } catch (error) {
      console.error(error);
  
      let errorMessage = "Verifique os dados e tente novamente.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      }
  
      toaster.create({
        title: "Erro ao atualizar usuário",
        description: errorMessage,
        type: "error",
      });
  
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteUser = async (id: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`${APIURL}/usuario/deletar`, {
        data: { id }, 
      });
      
      toaster.create({
        title: "Usuário deletado com sucesso!",
        type: "success",
      });

      await getUsers();
      return true;
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Erro ao deletar usuário",
        description: "Tente novamente mais tarde.",
        type: "error",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { users, getUsers, createUser, updateUser, deleteUser, isLoading };
};
