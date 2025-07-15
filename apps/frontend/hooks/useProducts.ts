"use client";
import { useCallback, useState } from "react";
import axios from "axios";
import { toaster } from "../components/ui/toaster";
import { Fatia, Product, Torta } from "../types/Product.type";
import { useSession } from "next-auth/react";

const APIURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const useProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const [fatias, setFatias] = useState<Fatia[]>([]);
  const [tortas, setTortas] = useState<Torta[]>([]);

  const getProducts = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axios.get<Product>(`${APIURL}/cardapio/listar`);
      setFatias(response.data.Fatias);
      setTortas(response.data.Tortas);

      return response.data;
    } catch (error: any) {
      console.error(error);

      let message = "Erro ao buscar produtos. Tente novamente mais tarde.";
      let type = "error";

      if (error.code === "ECONNABORTED") {
        message = "Servidor demorou para responder. Pode estar iniciando.";
      } else if (error.response) {
        if (error.response.status === 503) {
          message = "Servidor está iniciando, tente novamente em alguns momentos.";
          type = "info";
        } else if (error.response.status >= 500) {
          message = "Erro no servidor. Por favor, tente mais tarde.";
        } else {
          message = `Erro ${error.response.status}: ${error.response.statusText}`;
        }
      } else if (error.request) {
        message = "Servidor sem resposta. Pode estar dormindo ou offline.";
      } else {
        message = "Erro inesperado. Verifique sua conexão e tente novamente.";
      }

      toaster.create({
        title: "Erro ao buscar produtos",
        description: message,
        type: type,
      });

      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (data: FormData) => {
    setIsLoading(true);
    try {
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
  }, [session, getProducts]);

  const updateProduct = useCallback(async (id: string, data: FormData) => {
    try {
      const response = await axios.patch(`${APIURL}/cardapio/${id}`, data, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });

      toaster.create({
        title: "Produto atualizado com sucesso!",
        type: "success",
      });

      await getProducts();
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao atualizar:", error);

      toaster.create({
        title: "Erro ao atualizar Produto",
        description: axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : "Erro desconhecido.",
        type: "error",
      });
      return null;
    }
  }, [session, getProducts]);

  const deleteProduct = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`${APIURL}/cardapio/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });

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
  }, [session, getProducts]);

  return {
    fatias,
    tortas,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    isLoading,
    setIsLoading
  };
};
