"use client"

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { usePedidos } from "@/hooks/usePedidos";
import { Box, Button, Center, Dialog, DialogBody, DialogHeader, DialogTitle, Flex, Image, Portal, Separator, Spinner, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pedido } from "@/types/Pedido.type";
import { Fatia, Torta } from "@/types/Product.type";
import { useProducts } from "@/hooks/useProducts";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

export default function Pedidos() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { listarPedidosDoUsuario } = usePedidos();
    const { data: session } = useSession();
    const router = useRouter();
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const { tortas, fatias, getProducts } = useProducts();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (session === undefined) {
            return;
        }

        if (session === null) {
            router.push("/login");
            return;
        }

        const fetchPedidos = async () => {
            try {
                setIsLoading(true);
                const dados = await listarPedidosDoUsuario();
                getProducts();
                setPedidos(dados);
            } catch (err) {
                console.error("Erro ao buscar pedidos", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPedidos();
    }, [session, router,getProducts,listarPedidosDoUsuario]);

    function getImagemDoProduto(produtoId: string, fatias: Fatia[], tortas: Torta[]): string {
        const produto =
            fatias.find(p => p._id === produtoId) ||
            tortas.find(p => p._id === produtoId);

        return produto?.imagem || "/images/default.png";
    }

    function getProduto(produtoId: string, fatias: Fatia[], tortas: Torta[]) {
        const produto =
            fatias.find(p => p._id === produtoId) ||
            tortas.find(p => p._id === produtoId);

        return produto;
    }

    return (
        <Box minH="100vh" bgColor="#F1DD2F" flexDirection="column" pb="180px">
            <Header />
            <NavBar />
            <Box
                maxW={isMobile ? "100%" : "1200px"}
                mx="auto"
                p={4}
                mt={6}
                bg="white"
                borderRadius="md"
                shadow="md"
                flex="1"
                display="flex"
                flexDirection="column"
                pb={3}
            >
                <Center>
                    <Text fontSize="2xl" fontWeight="bold" mb={2} color={"black"}>
                        Meus pedidos
                    </Text>
                </Center>
                <Separator mb={4} />
                <VStack align="stretch">
                    <> {isLoading ? (
                        <Center py={10}>
                            <Spinner size="lg" color="#895023" />
                        </Center>
                    ) : pedidos.length === 0 ? (
                        <VStack gap={3} mt={6} textAlign="center">
                            <Text fontSize="lg" color={"black"}>Você ainda não realizou nenhum pedido</Text>
                            <Link href="/sacola" color="#895023">
                                <Text font={"bold"} color="#895023">
                                    Conclue seu pedido aqui
                                </Text>
                            </Link>
                        </VStack>
                    ) : (
                        pedidos.map((pedido, i) => (
                            <Box key={pedido._id || i} bg="gray.100" borderRadius="md" p={4} mb={4}>
                                <Text fontWeight="bold" fontSize="lg" mb={2} color="black">
                                    Pedido {i + 1}
                                </Text>
                                {pedido.itens.map((item, idx) => (
                                    <Flex key={idx} justify="space-between" align="center" mb={4} p={5}>
                                        {/* Informações à esquerda */}
                                        <Box flex="1" pr={4}>
                                            <Text color="black" fontWeight="semibold">
                                                {item.nome}
                                            </Text>
                                            <Text color="black">Quantidade: {item.quantidade}</Text>
                                            <Text color="black">R$ {item.precoUnitario.toFixed(2)}</Text>
                                        </Box>

                                        {/* Imagem e botão à direita */}
                                        <Dialog.Root motionPreset="slide-in-bottom" placement={"center"}>
                                            <Dialog.Trigger asChild>
                                                <Button
                                                    p={0}
                                                    bg="transparent"
                                                    _hover={{ bg: "gray.200" }}
                                                    borderRadius="md"
                                                    aria-label={`Abrir detalhes de ${item.nome}`}
                                                >
                                                    <Image
                                                        src={getImagemDoProduto(item.produtoId, fatias, tortas)}
                                                        alt={item.nome}
                                                        w="100px"
                                                        h="100px"
                                                        objectFit="cover"
                                                        borderRadius="md"
                                                        border="1px solid #ccc"
                                                    />
                                                </Button>
                                            </Dialog.Trigger>
                                            <Portal>
                                                <Dialog.Backdrop />
                                                <Dialog.Positioner>
                                                    <Dialog.Content bg="white">
                                                        <DialogHeader>
                                                            <DialogTitle color="black">
                                                                {getProduto(item.produtoId, fatias, tortas)?.nome}
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <DialogBody>
                                                            <VStack gap={4}>
                                                                <Image
                                                                    src={getProduto(item.produtoId, fatias, tortas)?.imagem}
                                                                    alt={getProduto(item.produtoId, fatias, tortas)?.nome}
                                                                    maxH="250px"
                                                                    objectFit="contain"
                                                                    borderRadius="md"
                                                                />
                                                                <Text whiteSpace="pre-wrap" textAlign="center" color="black">
                                                                    {getProduto(item.produtoId, fatias, tortas)?.descricao}
                                                                </Text>
                                                            </VStack>
                                                        </DialogBody>
                                                        <Dialog.CloseTrigger asChild>
                                                            <IoMdClose color="black" />
                                                        </Dialog.CloseTrigger>
                                                    </Dialog.Content>
                                                </Dialog.Positioner>
                                            </Portal>
                                        </Dialog.Root>
                                        <Separator />
                                    </Flex>
                                ))}
                                <Text mb={2} color={"black"} fontWeight="bold">Valor total: R$ {pedido.valorTotal.toFixed(2)}</Text>
                                <Separator mt={5} />
                            </Box>
                        ))
                    )}
                    </>
                </VStack>
            </Box>
        </Box >
    );
}