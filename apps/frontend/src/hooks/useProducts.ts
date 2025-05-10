"use client";
import { useState } from "react";
import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { Product } from "@/types/Product.type";

const APIURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const useProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Product[]>(`${APIURL}/cardapio/listar`);
      // Converta a imagem de Buffer para base64 se existir
      const adaptedProducts = response.data.map((item: any) => ({
        ...item,
        imagem: item.imagem
          ? `data:image/jpeg;base64,${Buffer.from(item.imagem).toString(
              "base64"
            )}`
          : undefined,
      }));
      setProducts(adaptedProducts);
      return adaptedProducts;
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

  return {
    products,
    getProducts,
    isLoading,
  };
};
