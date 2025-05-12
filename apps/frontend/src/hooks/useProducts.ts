"use client";
import { useState } from "react";
import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { Product } from "@/types/Product.type";
import { useSession } from "next-auth/react";

const APIURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const useProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const token = localStorage.getItem("authToken");
  const { data: session } = useSession();

  const getProducts = async () => {
    setIsLoading(true);
    
    try {
      const response = await axios.get<Product[]>(`${APIURL}/cardapio/listar`);
      setProducts(response.data);
      
      return response.data;
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Erro ao buscar produtos",
        description: "Tente novamente mais tarde.",
        type: "error",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (data: Product) => {
    setIsLoading(true);
    console.log(data);
    try {
      await axios.post(`${APIURL}/cardapio/adicionar`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await axios.post(`${APIURL}/cardapio/adicionar`, data, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });
      

      toaster.create({
        title: "Produto criado com sucesso!",
        type: "success",
      });

      await getProducts();
      return true;
    } catch (error) {
      let errorMessage = "Erro ao criar Produto";

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
  const updateProduct = async (data: Product) => {
  
  const updateUser = async (data: Product) => {
    setIsLoading(true);
    try {
      await axios.patch(`${APIURL}/cardapio/${data._id}`, data);

      toaster.create({
        title: "Produto atualizado com sucesso!",
        type: "success",
      });

      await getProducts();
      return true;
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Erro ao atualizar Produto",
        description: "Verifique os dados e tente novamente.",
        type: "error",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`${APIURL}/cardapio/${id}`);

      toaster.create({
        title: "Produto deletado com sucesso!",
        type: "success",
      });

      await getProducts();
      return true;
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Erro ao deletar produto",
        description: "Tente novamente mais tarde.",
        type: "error",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    isLoading,
  };
};
