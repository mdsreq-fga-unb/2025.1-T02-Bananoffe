"use client";
import {
    Dialog,
    Portal,
    CloseButton,
    Flex,
    Text,
    Image,
    Stack,
    Box,
    Button,
    HStack,
    IconButton,
    NumberInput,
} from "@chakra-ui/react";
import { Fatia, Torta } from "@/types/Product.type";
import { FiShoppingBag } from "react-icons/fi";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useProducts } from "@/hooks/useProducts";
import { useSacola } from "@/hooks/useSacola";
import { get } from "http";

export interface FormValues {
    produtoId: string
    quantidade: number
    tipo: string
    tamanho?: string
}

type ProductDialogProps = {
    open: boolean;
    onClose: () => void;
    selectedProduct?: Fatia | Torta;
    token?: string;
};

export default function ProductModal({
    open,
    onClose,
    selectedProduct,
    token,
}: ProductDialogProps) {
    const { isLoading, setIsLoading } = useProducts();
    const { adicionarItemSacola, sacola, getSacola } = useSacola(token);
    const [tamanho] = useState<string | undefined>(undefined);
    const [sacolaCarregada, setSacolaCarregada] = useState(false);

    useEffect(() => {
        if (token && !sacolaCarregada) {
            getSacola();
            setSacolaCarregada(true);
        }
    }, [token, sacolaCarregada]);

    function isFatia(prod: Fatia | Torta): prod is Fatia {
        return (prod as Fatia).precoFatia !== undefined;
    }

    const {
        register,
        control,
        handleSubmit,
        reset,
        watch
    } = useForm<FormValues>({
        defaultValues: {
            produtoId: selectedProduct?._id ?? "",
            tipo: selectedProduct && isFatia(selectedProduct) ? "Fatia" : "Torta",
            quantidade: 1,
            ...(selectedProduct && !isFatia(selectedProduct) && { tamanho: "P" }),
        },

    });

    const quantidadeNaSacola = sacola?.itens?.find(
        (item) => item.produtoId === selectedProduct?._id
    )?.quantidade ?? 0;
    const quantidadeMaximaPermitida = selectedProduct?.quantidade !== undefined ? selectedProduct?.quantidade - quantidadeNaSacola : undefined;
    const quantidadeAtualSelecionada = watch("quantidade") ?? 1;
    const excedeuEstoque = quantidadeMaximaPermitida !== undefined
        ? quantidadeAtualSelecionada > quantidadeMaximaPermitida
        : false;

    useEffect(() => {
        if (selectedProduct) {
            reset({
                produtoId: selectedProduct._id,
                tipo: isFatia(selectedProduct) ? "Fatia" : "Torta",
                quantidade: 1,
                tamanho: isFatia(selectedProduct) ? undefined : tamanho,
            });
        }
    }, [selectedProduct, reset]);

    const onSubmit = async (data: FormValues) => {
        if (!token) {
            console.error("Token não disponível!");
            return;
        }

        setIsLoading(true);
        try {
            await adicionarItemSacola(data);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog.Root
            open={open}
            onOpenChange={({ open: isOpen }) => {
                if (!isOpen) onClose();
            }}
            size="full"
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content bg="white" maxH="100vh" overflowY="auto">
                        {/* Imagem em Destaque */}
                        <Box w="100%" h="60vh" position="relative">
                            {selectedProduct?.imagem && (
                                <Image
                                    src={selectedProduct.imagem}
                                    alt={selectedProduct.nome}
                                    objectFit="cover"
                                    w="100%"
                                    h="100%"
                                />
                            )}
                        </Box>

                        <Dialog.Body p={6}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input type="hidden" {...register("produtoId")} />
                                <input type="hidden" {...register("tipo")} />
                                <Stack gap={4}>
                                    {/* Nome, descrição, preço… */}
                                    <Text
                                        fontSize="3xl"
                                        fontWeight="bold"
                                        color="#895023"
                                        lineHeight="1.2"
                                    >
                                        {selectedProduct?.nome}
                                    </Text>

                                    {/* Descrição */}
                                    <Text fontSize="md" color="gray.600">
                                        {selectedProduct?.descricao}
                                    </Text>

                                    <Flex justify="space-between" align="center">
                                        {/* Preço */}
                                        {selectedProduct && (
                                            isFatia(selectedProduct) ? (
                                                // Produto do tipo fatia
                                                <Flex justify="space-between" align="center">
                                                    <Text fontSize="3xl" fontWeight="bold" color="#895023" py={2}>
                                                        R$ {selectedProduct.precoFatia.toFixed(2)}
                                                    </Text>

                                                    <Controller
                                                        name="quantidade"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <NumberInput.Root
                                                                value={field.value.toString()}
                                                                onValueChange={(v) => field.onChange(v.valueAsNumber)}
                                                                min={1}
                                                                spinOnPress={false}
                                                                ml={4}
                                                            >
                                                                <HStack gap={2}>
                                                                    <NumberInput.DecrementTrigger asChild>
                                                                        <IconButton
                                                                            variant="outline"
                                                                            size="sm"
                                                                            borderColor="#895023"
                                                                            color="#895023"
                                                                            aria-label="Remover"
                                                                        >
                                                                            <LuMinus />
                                                                        </IconButton>
                                                                    </NumberInput.DecrementTrigger>

                                                                    <NumberInput.ValueText
                                                                        textAlign="center"
                                                                        fontSize="lg"
                                                                        minW="3ch"
                                                                        color="#895023"
                                                                        fontWeight="bold"
                                                                    />

                                                                    <NumberInput.IncrementTrigger asChild>
                                                                        <IconButton
                                                                            variant="outline"
                                                                            size="sm"
                                                                            borderColor="#895023"
                                                                            color="#895023"
                                                                            aria-label="Adicionar"
                                                                        >
                                                                            <LuPlus />
                                                                        </IconButton>
                                                                    </NumberInput.IncrementTrigger>
                                                                </HStack>
                                                            </NumberInput.Root>
                                                        )}
                                                    />
                                                </Flex>
                                            ) : (
                                                // Produto do tipo torta inteira
                                                <Stack gap={2} w="full">
                                                    {/* Texto acima */}
                                                    <Text fontSize="xl" fontWeight="bold" color="#895023" py={2}>
                                                        Escolha um Tamanho:
                                                    </Text>

                                                    {/* Linha com botões de tamanho e contador */}
                                                    <Flex justify="space-between" align="center" gap={4} wrap="wrap">
                                                        <Controller
                                                            name="tamanho"
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field }) => (
                                                                <HStack gap={2}>
                                                                    <Button
                                                                        variant={field.value === "P" ? "solid" : "outline"}
                                                                        onClick={() => field.onChange("P")}
                                                                        colorScheme={field.value === "P" ? "yellow" : "gray"}
                                                                        color={field.value === "P" ? "#895023" : "gray.600"}
                                                                        bg={field.value === "P" ? "#F1DD2F" : "white"}
                                                                    >
                                                                        P - R$ {selectedProduct.precoTortaP.toFixed(2)}
                                                                    </Button>
                                                                    <Button
                                                                        variant={field.value === "G" ? "solid" : "outline"}
                                                                        onClick={() => field.onChange("G")}
                                                                        colorScheme={field.value === "G" ? "yellow" : "gray"}
                                                                        color={field.value === "G" ? "#895023" : "gray.600"}
                                                                        bg={field.value === "G" ? "#F1DD2F" : "white"}
                                                                    >
                                                                        G - R$ {selectedProduct.precoTortaG.toFixed(2)}
                                                                    </Button>
                                                                </HStack>
                                                            )}
                                                        />

                                                        <Controller
                                                            name="quantidade"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <NumberInput.Root
                                                                    value={field.value.toString()}
                                                                    onValueChange={(v) => field.onChange(v.valueAsNumber)}
                                                                    min={1}
                                                                    spinOnPress={false}
                                                                >
                                                                    <HStack gap={2}>
                                                                        <NumberInput.DecrementTrigger asChild>
                                                                            <IconButton
                                                                                variant="outline"
                                                                                size="sm"
                                                                                borderColor="#895023"
                                                                                color="#895023"
                                                                                aria-label="Remover"
                                                                            >
                                                                                <LuMinus />
                                                                            </IconButton>
                                                                        </NumberInput.DecrementTrigger>

                                                                        <NumberInput.ValueText
                                                                            textAlign="center"
                                                                            fontSize="lg"
                                                                            minW="3ch"
                                                                            color="#895023"
                                                                            fontWeight="bold"
                                                                        />

                                                                        <NumberInput.IncrementTrigger asChild>
                                                                            <IconButton
                                                                                variant="outline"
                                                                                size="sm"
                                                                                borderColor="#895023"
                                                                                color="#895023"
                                                                                aria-label="Adicionar"
                                                                            >
                                                                                <LuPlus />
                                                                            </IconButton>
                                                                        </NumberInput.IncrementTrigger>
                                                                    </HStack>
                                                                </NumberInput.Root>
                                                            )}
                                                        />
                                                    </Flex>
                                                </Stack>
                                            )
                                        )}
                                    </Flex>
                                    {/* Aviso de estoque excedido */}
                                    {excedeuEstoque && (
                                        <Text fontSize="sm" color="red.500" fontWeight="medium">
                                            {quantidadeMaximaPermitida && quantidadeMaximaPermitida > 0
                                                ? `Estoque insuficiente. Você pode adicionar até ${quantidadeMaximaPermitida} unidade${quantidadeMaximaPermitida > 1 ? 's' : ''}.`
                                                : "Estoque máximo atingido na sacola para este produto."}
                                        </Text>
                                    )}

                                    {/* Botão Adicionar */}
                                    {token ? (
                                        <Button
                                            type="submit"
                                            colorScheme="yellow"
                                            bg="#F1DD2F"
                                            color="#895023"
                                            size="lg"
                                            w="100%"
                                            maxW="full"
                                            _hover={{ bg: "#E0CC28" }}
                                            loading={isLoading}
                                            disabled={excedeuEstoque}
                                            mt={4}
                                        >
                                            <HStack gap={2} justify="center" w="100%">
                                                <FiShoppingBag size={24} />
                                                <Text>Adicionar à Sacola</Text>
                                            </HStack>
                                        </Button>
                                    ) : (
                                        <Text color="red.500" fontWeight="bold">
                                            Você precisa estar logado para adicionar produtos à sacola.
                                        </Text>
                                    )}
                                </Stack>
                                {!token && (
                                    <Text color="red.500" fontWeight="bold">
                                        Você precisa estar logado para adicionar produtos à sacola.
                                    </Text>
                                )}
                            </form>
                        </Dialog.Body>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton
                                size="lg"
                                position="absolute"
                                right={4}
                                top={4}
                                bg="white"
                                borderRadius="full"
                                boxShadow="md"
                            />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner >
            </Portal >
        </Dialog.Root >
    );
}
