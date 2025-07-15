"use client";
import { useCallback, useState } from "react";
import axios from "axios";
import { toaster } from "../components/ui/toaster";
import { useSession } from "next-auth/react";
import { Pedido } from "../types/Pedido.type";
import { useRouter } from 'next/navigation';

const APIURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface RespostaPedido {
    message: string;
    pedidoId: string;
    total: number;
}


export const usePedidos = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const realizarPedido = useCallback(
        async (formaPagamento: "local" | "pix"): Promise<RespostaPedido | null> => {
            setIsLoading(true);
            try {
                const response = await axios.post<RespostaPedido>(
                    `${APIURL}/pedido`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${session?.user.accessToken}`,
                        },
                    }
                );

                toaster.create({
                    title: "Pedido realizado com sucesso!",
                    type: "success",
                    duration: 1100,
                });

                if (formaPagamento === "pix") {
                    router.push(`/pagamento/${response.data.pedidoId}`);
                } else {
                    router.push("/pedidos");
                }

                return response.data;
            } catch (error) {
                console.error(error);
                let mensagemErro = "Tente novamente mais tarde.";

                if (axios.isAxiosError(error)) {
                    mensagemErro = error.response?.data?.message || mensagemErro;
                }

                toaster.create({
                    title: "Erro ao realizar pedido",
                    description: mensagemErro,
                    type: "error",
                });

                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [session, router]
    );

    const listarTodosPedidos = useCallback(async (): Promise<Pedido[]> => {
        setIsLoading(true);
        try {
            const response = await axios.get<Pedido[]>(`${APIURL}/pedido/listar-todos`, {
                headers: {
                    Authorization: `Bearer ${session?.user.accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            toaster.create({
                title: "Erro ao listar pedidos",
                description: "Tente novamente mais tarde.",
                type: "error",
            });
            return [];
        } finally {
            setIsLoading(false);
        }
    }, [session]);

    const listarPedidosDoUsuario = useCallback(async (): Promise<Pedido[]> => {
        setIsLoading(true);
        try {
            const response = await axios.get<Pedido[]>(`${APIURL}/pedido`, {
                headers: {
                    Authorization: `Bearer ${session?.user.accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            toaster.create({
                title: "Erro ao listar seus pedidos",
                description: "Tente novamente mais tarde.",
                type: "error",
            });
            return [];
        } finally {
            setIsLoading(false);
        }
    }, [session]);

    const deletePedido = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            await axios.delete(`${APIURL}/pedido/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.user.accessToken}`,
                },
            });

            toaster.create({
                title: "Produto deletado com sucesso!",
                type: "success",
                duration: 2000,
            });

            await listarPedidosDoUsuario();
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
    }, [session, listarPedidosDoUsuario]);

    const buscarPedidoPorId = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${APIURL}/pedido/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.user.accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            toaster.create({
                title: "Pedido não encontrado",
                type: "error",
            });
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [session]);

    return {
        realizarPedido,
        isLoading,
        listarTodosPedidos,
        listarPedidosDoUsuario,
        deletePedido,
        buscarPedidoPorId
    };
};
