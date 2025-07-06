"use client";
import { useCallback, useState } from "react";
import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { Sacola } from "@/types/Sacola.type";
import { useSession } from "next-auth/react";
import { FormValues } from "@/components/ProdutoModal";

const APIURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const useSacola = (token?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [sacola, setSacola] = useState<Sacola | null>(null);
    const { data: session } = useSession();

    const getSacola = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get<Sacola>(`${APIURL}/sacola`, {
                headers: {
                    Authorization: `Bearer ${session?.user.accessToken}`,
                },
            });
            setSacola(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            toaster.create({
                title: "Erro ao buscar sacola",
                description: "Tente novamente mais tarde.",
                type: "error",
            });
            return null;
        } finally {
            setIsLoading(false);
        }
    },[session,setSacola]);

    const atualizarItemSacola = useCallback(async (itemId: string, novaQuantidade: number) => {
        try {
            await axios.put(
                `${APIURL}/sacola/${itemId}`,
                { quantidade: novaQuantidade },
                {
                    headers: {
                        Authorization: `Bearer ${session?.user.accessToken}`,
                    },
                }
            );
            await getSacola();
        } catch (error) {
            console.error(error);
            let mensagemErro = "Tente novamente mais tarde.";

            if (axios.isAxiosError(error)) {
                mensagemErro = error.response?.data?.message || mensagemErro;
            }
            toaster.create({
                title: "Erro ao atualizar item",
                description: mensagemErro,
                type: "error",
                duration: 1000,
            });
        }
    },[session,getSacola]);

    const excluirItemSacola = useCallback(async (itemId: string) => {
        try {
            await axios.delete(`${APIURL}/sacola/item/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${session?.user.accessToken}`,
                },
            });
            await getSacola();
        } catch (error) {
            console.error(error);
            toaster.create({
                title: "Erro ao remover item",
                description: "Tente novamente.",
                type: "error",
            });
        }
    },[session,getSacola]);

    const adicionarItemSacola = useCallback(async (data: FormValues) => {
        try {

            await axios.post(`${APIURL}/sacola/adicionar`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            await getSacola();
            toaster.create({
                title: "Produto adicionado à sacola com sucesso!",
                type: "success",
                duration: 800,
            });
            return true;
        } catch (error) {
            console.error(error);
            toaster.create({
                title: "Erro ao adicionar item à sacola",
                description: "Tente novamente.",
                type: "error",
            });
        }
    },[getSacola,token]);


    return { getSacola, isLoading,setIsLoading, sacola, setSacola, atualizarItemSacola, excluirItemSacola, adicionarItemSacola };
};
