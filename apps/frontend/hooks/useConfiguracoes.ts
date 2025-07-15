"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { toaster } from "../components/ui/toaster";
import { useCallback, useState } from "react";

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

    async function buscarNomeCompleto() {
        if (!session?.user.accessToken) {
            toaster.create({
                title: "Usuário não autenticado",
                type: "error",
            });
            return null;
        }

        try {
            const response = await axios.get(`${APIURL}/configuracoes/nome`, {
                headers: {
                    Authorization: `Bearer ${session.user.accessToken}`,
                },
            });
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Erro ao buscar nome:", error);
                toaster.create({
                    title: "Erro ao buscar nome completo",
                    description: error.response?.data?.message || "Tente novamente mais tarde.",
                    type: "error",
                });
            } else {
                console.error("Erro desconhecido ao buscar nome completo:", error);
                toaster.create({
                    title: "Erro ao buscar nome completo",
                    description: "Tente novamente mais tarde.",
                    type: "error",
                });
            }
            return null;
        }
    }

    async function alterarNomeCompleto(novoNome: string) {
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
                `${APIURL}/configuracoes/nome`,
                { nomeCompleto: novoNome },
                {
                    headers: {
                        Authorization: `Bearer ${session.user.accessToken}`,
                    },
                }
            );
            toaster.create({
                title: "Nome atualizado com sucesso!",
                type: "success",
            });
            return true;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Erro ao atualizar nome:", error);
                toaster.create({
                    title: "Erro ao atualizar nome",
                    description: error.response?.data?.message || "Tente novamente mais tarde.",
                    type: "error",
                });
            } else {
                console.error("Erro desconhecido ao atualizar nome:", error);
                toaster.create({
                    title: "Erro ao atualizar nome",
                    description: "Tente novamente mais tarde.",
                    type: "error",
                });
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    async function buscarCidadeBanco() {
        if (!session?.user.accessToken) {
            toaster.create({
                title: "Usuário não autenticado",
                type: "error",
            });
            return null;
        }

        try {
            const response = await axios.get(`${APIURL}/configuracoes/cidade`, {
                headers: {
                    Authorization: `Bearer ${session.user.accessToken}`,
                },
            });
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Erro ao buscar a cidade do banco:", error);
                toaster.create({
                    title: "Erro ao buscar a cidade do banco",
                    description: error.response?.data?.message || "Tente novamente mais tarde.",
                    type: "error",
                });
            } else {
                console.error("Erro desconhecido ao buscar a cidade do banco:", error);
                toaster.create({
                    title: "Erro ao buscar a cidade do banco",
                    description: "Tente novamente mais tarde.",
                    type: "error",
                });
            }
            return null;
        }
    }

    async function alterarCidadeBanco(novaCidade: string) {
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
                `${APIURL}/configuracoes/cidade`,
                { cidadeBanco: novaCidade },
                {
                    headers: {
                        Authorization: `Bearer ${session.user.accessToken}`,
                    },
                }
            );
            toaster.create({
                title: "Cidade do Banco atualizada com sucesso!",
                type: "success",
            });
            return true;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Erro ao atualizar a cidade do banco:", error);
                toaster.create({
                    title: "Erro ao atualizar a cidade do banco",
                    description: error.response?.data?.message || "Tente novamente mais tarde.",
                    type: "error",
                });
            } else {
                console.error("Erro desconhecido ao atualizar a cidade do banco:", error);
                toaster.create({
                    title: "Erro ao atualizar a cidade do banco",
                    description: "Tente novamente mais tarde.",
                    type: "error",
                });
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    }


    const gerarPixQrCode = useCallback(
        async (valor: number) => {
            if (!session?.user.accessToken) return null;

            const chavePix = await buscarChavePix();
            const nomeCompleto = await buscarNomeCompleto();
            const cidadeBanco = await buscarCidadeBanco();

            if (!chavePix) {
                toaster.create({
                    title: "Erro ao gerar QR Code",
                    description: "Não foi possível recuperar a chave PIX.",
                    type: "error",
                });
                return null;
            }

            try {
                const res = await axios.post(
                    `${APIURL}/pagamentos/gerar`,
                    {
                        chave: chavePix,
                        nome: nomeCompleto.nome,
                        cidade: cidadeBanco.cidadeBanco,
                        valor: parseFloat(valor.toFixed(2)),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${session.user.accessToken}`,
                        },
                    }
                );
                return res.data;
            } catch (error) {
                console.error("Erro ao gerar QR Code:", error);
                alert("Erro ao gerar QR Code");
                return null;
            }
        },
        [session, APIURL] // 🔁 Dependências
    );

    return {
        buscarChavePix,
        alterarChavePix,
        buscarNomeCompleto,
        alterarNomeCompleto,
        buscarCidadeBanco,
        alterarCidadeBanco,
        isLoading,
        gerarPixQrCode,
    };
};

