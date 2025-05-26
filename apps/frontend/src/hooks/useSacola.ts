"use client";
import { useState } from "react";
import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { ItensSacola, Sacola } from "@/types/Sacola.type";
import { useSession } from "next-auth/react";

const APIURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const useSacola = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [sacola, setSacola] = useState<Sacola | null>(null);
    const { data: session } = useSession();

    const getSacola = async () => {
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
    };

    const atualizarItemSacola = async (itemId: string, novaQuantidade: number) => {
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
            toaster.create({
                title: "Erro ao atualizar item",
                description: "Tente novamente.",
                type: "error",
            });
        }
    };

    const excluirItemSacola = async (itemId: string) => {
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
    };

    const adicionarItemSacola = async (data: FormData) => {
        try {
            await axios.post(`${APIURL}/sacola/adicionar`, {
                headers: {
                    Authorization: `Bearer ${session?.user.accessToken}`,
                },
            });
            await getSacola();
            toaster.create({
                title: "Produto adicionado a sacola com sucesso!",
                type: "sucess",
            });
            return true
        } catch (error) {
            console.error(error);
            toaster.create({
                title: "Erro ao adicionar item a sacola",
                description: "Tente novamente.",
                type: "error",
            });
        }
    };

    return { getSacola, isLoading, sacola, setSacola, atualizarItemSacola, excluirItemSacola, adicionarItemSacola };
};
