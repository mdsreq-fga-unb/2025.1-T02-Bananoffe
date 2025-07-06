"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { toaster } from "@/components/ui/toaster";
import { useState } from "react";

const APIURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const useConfiguracoes = () => {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    async function buscarChavePix() {
        if (!session?.user.accessToken) {
            toaster.create({
                title: "Usuário não autenticado",
                type: "error",
            });
            return null;
        }

        try {
            const response = await axios.get(`${APIURL}/configuracoes/pix`, {
                headers: {
                    Authorization: `Bearer ${session.user.accessToken}`,
                },
            });
            return response.data.chavePix;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Erro ao buscar chave PIX:", error);
                toaster.create({
                    title: "Erro ao buscar chave PIX",
                    description: error.response?.data?.message || "Tente novamente mais tarde.",
                    type: "error",
                });
            } else {
                console.error("Erro desconhecido ao buscar chave PIX:", error);
                toaster.create({
                    title: "Erro ao buscar chave PIX",
                    description: "Tente novamente mais tarde.",
                    type: "error",
                });
            }
            return null;
        }
    }

    async function alterarChavePix(novaChave: string) {
        if (!session?.user.accessToken) {
            toaster.create({
                title: "Usuário não autenticado",
                type: "error",
            });
            return false;
        }

        setIsLoading(true);
        try {
            await axios.put(
                `${APIURL}/configuracoes/pix`,
                { chavePix: novaChave },
                {
                    headers: {
                        Authorization: `Bearer ${session.user.accessToken}`,
                    },
                }
            );
            toaster.create({
                title: "Chave PIX atualizada com sucesso!",
                type: "success",
            });
            return true;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Erro ao atualizar chave PIX:", error);
                toaster.create({
                    title: "Erro ao atualizar chave PIX",
                    description: error.response?.data?.message || "Tente novamente mais tarde.",
                    type: "error",
                });
            } else {
                console.error("Erro desconhecido ao atualizar chave PIX:", error);
                toaster.create({
                    title: "Erro ao atualizar chave PIX",
                    description: "Tente novamente mais tarde.",
                    type: "error",
                });
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        buscarChavePix,
        alterarChavePix,
        isLoading,
    };
};

