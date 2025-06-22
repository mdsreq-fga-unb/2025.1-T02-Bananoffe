"use client";

import {
    Box,
    Text,
    VStack,
    HStack,
    Spinner,
    Separator,
    Center,
    useBreakpointValue,
    Button,
    Flex,
    Spacer,
    Image,
    Dialog,
    Portal,
    DialogHeader,
    DialogBody,
    DialogTitle,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { ItensSacola } from "@/types/Sacola.type";
import { useSacola } from "@/hooks/useSacola";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { Fatia, Torta } from "@/types/Product.type";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

export default function Sacola() {
    const { getSacola, isLoading, sacola, setSacola, atualizarItemSacola, excluirItemSacola } = useSacola();
    const { tortas, fatias, getProducts } = useProducts();
    const [itensSacola, setItensSacola] = useState<ItensSacola[] | []>([]);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session === undefined) {
            return;
        }

        if (session === null) {
            router.push("/login");
            return;
        }

        const fetchSacola = async () => {
            try {
                const dados = await getSacola();
                getProducts()
                setSacola(dados);
            } catch (err) {
                console.error("Erro ao buscar sacola", err);
            }
        };

        fetchSacola();
    }, [session]);

    useEffect(() => {
        if (sacola && sacola.itens) {
            setItensSacola(sacola.itens);
        } else {
            setItensSacola([]);
        }
    }, [sacola]);

    const atualizarQuantidade = async (itemId: string, novaQuantidade: number) => {
        try {
            await atualizarItemSacola(itemId, novaQuantidade);
        } catch (error) {
            console.error("Erro ao atualizar quantidade", error);
        }
    };

    const removerItem = async (itemId: string) => {
        const confirmacao = window.confirm("Tem certeza que deseja remover este item da sacola?");
        if (!confirmacao) return;

        try {
            await excluirItemSacola(itemId);
        } catch (error) {
            console.error("Erro ao remover item", error);
        }
    };

    function getImagemDoProduto(produtoId: string, fatias: Fatia[], tortas: Torta[]): string {
        const produto =
            fatias.find(p => p._id === produtoId) ||
            tortas.find(p => p._id === produtoId);

        return produto?.imagem || "/images/default.png";
    }

    function getEstoqueDoProduto(produtoId: string, fatias: Fatia[], tortas: Torta[]): number {
        const produto =
            fatias.find(p => p._id === produtoId) ||
            tortas.find(p => p._id === produtoId);

        return produto?.quantidade ?? 0; // Supondo que o campo estoque exista no produto
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
                        Minha sacola
                    </Text>
                </Center>
                <Separator mb={4} />

                {isLoading ? (
                    <HStack justify="center" mt={6}>
                        <Spinner size="lg" color="yellow.500" />
                    </HStack>
                ) : itensSacola.length === 0 ? (
                    <VStack gap={3} mt={6} textAlign="center">
                        <Text fontSize="lg" color={"black"}>Não há itens na sacola!</Text>
                        <Link href="/" color="#895023">
                            <Text font={"bold"} color="#895023">
                                Adicione itens aqui
                            </Text>
                        </Link>
                    </VStack>
                ) : (
                    <VStack align="stretch">
                        {itensSacola.map((item, index) => (
                            <Box key={index} bg="gray.100" borderRadius="md" overflowY="auto">
                                <Flex align="center" >
                                    {/* Parte do texto */}
                                    <Box flex="1">
                                        <Text fontWeight="bold" fontSize="lg" mb={2} color={"black"}>
                                            {item.tipo === "Fatia" ? item.nome : item.tamanho === "P" ? item.nome + " (P)" : item.nome + " (G)"}
                                        </Text>

                                        <Text fontSize="sm" color="gray.700" mb={1}>
                                            Preço unitário: R$ {item.precoUnitario.toFixed(2)}
                                        </Text>
                                        <Text fontSize="sm" color="gray.700" mb={1}>
                                            Total: R$ {item.precoTotal.toFixed(2)}
                                        </Text>
                                        {/* <Text fontSize="sm" color="gray.700" mb={3}>
                                            Em estoque: {getEstoqueDoProduto(item.produtoId, fatias, tortas)}
                                        </Text> */}

                                        <Flex align="center" gap={2}>
                                            {item.quantidade === 1 ? (
                                                <Button
                                                    size="sm"
                                                    colorScheme="red"
                                                    onClick={() => removerItem(item._id)}
                                                    aria-label="Remover item"
                                                >
                                                    🗑️
                                                </Button>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        atualizarQuantidade(item._id, item.quantidade - 1)
                                                    }
                                                    aria-label="Diminuir quantidade"
                                                >
                                                    <MinusIcon />
                                                </Button>
                                            )}

                                            <Text fontWeight="semibold" minW="24px" textAlign="center" color={"#895023"}>
                                                {item.quantidade}
                                            </Text>

                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    atualizarQuantidade(item._id, item.quantidade + 1)
                                                }
                                                aria-label="Aumentar quantidade"
                                                disabled={item.quantidade >= getEstoqueDoProduto(item.produtoId, fatias, tortas)}
                                            >
                                                <AddIcon />
                                            </Button>
                                        </Flex>
                                    </Box>

                                    {/* Imagem à direita */}
                                    <Dialog.Root motionPreset="slide-in-bottom" placement={"center"}>
                                        <Dialog.Trigger asChild>
                                            <Button
                                                p={0}
                                                bg="transparent"
                                                _hover={{ bg: "gray.100" }}
                                                borderRadius="md"
                                                aria-label={`Abrir detalhes de ${item.nome}`}
                                            >
                                                <Image
                                                    src={getImagemDoProduto(item.produtoId, fatias, tortas)}
                                                    alt={item.nome}
                                                    w="150px"
                                                    h="150px"
                                                    objectFit="cover"
                                                    borderRadius="md"
                                                    mb={4}
                                                    border="1px solid #ccc"
                                                />
                                            </Button>
                                        </Dialog.Trigger>
                                        <Portal>
                                            <Dialog.Backdrop />
                                            <Dialog.Positioner>
                                                <Dialog.Content bg={"white"}>
                                                    <DialogHeader>
                                                        <DialogTitle color={"black"}>{getProduto(item.produtoId, fatias, tortas)?.nome}</DialogTitle>
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
                                                            <Text whiteSpace="pre-wrap" textAlign="center" color={"black"}>
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
                                </Flex>
                                <Separator mt={4}></Separator>
                            </Box>
                        ))}
                    </VStack>
                )}
            </Box>
            {sacola && sacola.itens && sacola.itens.length > 0 && (
                <Center>
                    <Box
                        position="fixed"
                        bottom={isMobile ? "92px" : "115px"}
                        width="100%"
                        maxW={isMobile ? "100%" : "1200px"}
                        bg={"white"}
                        p={2}
                        mb={3}
                        borderRadius={"md"}
                        boxShadow="md"
                    >
                        <Center>
                            <Text fontWeight="bold" fontSize="xl" color="black">
                                Total: R${sacola?.valorTotal?.toFixed(2)}
                            </Text>
                        </Center>
                    </Box>
                </Center>
            )}
        </Box >
    );
}
