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
};

export default function ProductModal({
    open,
    onClose,
    selectedProduct,
}: ProductDialogProps) {
    const [quantity, setQuantity] = useState(1);
    const { isLoading, setIsLoading } = useProducts();
    const { adicionarItemSacola } = useSacola();

    function isFatia(prod: Fatia | Torta): prod is Fatia {
        return (prod as Fatia).precoFatia !== undefined;
    }

    const form = useForm<FormValues>();
    const {
        register,
        control,
        handleSubmit,
        reset
    } = useForm<FormValues>({
        defaultValues: {
            produtoId: selectedProduct?._id ?? "",
            tipo: selectedProduct && isFatia(selectedProduct) ? "Fatia" : "Torta",
            quantidade: 1,
            //tamanho: undefined,
        },
    });

    useEffect(() => {
        if (selectedProduct) {
            reset({
                produtoId: selectedProduct._id,
                tipo: isFatia(selectedProduct) ? "Fatia" : "Torta",
                quantidade: 1,
                //tamanho: undefined,
            });
        }
    }, [selectedProduct, reset]);

    const onSubmit = async (data: FormValues) => {
        console.log(data);
        setIsLoading(true);
        try {
            await adicionarItemSacola(data);
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
                                        fontSize="2xl"
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

                                    {/* Preço */}
                                    {selectedProduct && (
                                        isFatia(selectedProduct) ? (
                                            <Text fontSize="3xl" fontWeight="bold" color="#895023" py={2}>
                                                R$ {selectedProduct.precoFatia.toFixed(2)}
                                            </Text>
                                        ) : (
                                            /* aqui é Torta */
                                            <Text fontSize="lg" color="gray.600">
                                                P: R$ {selectedProduct.precoTortaP.toFixed(2)} &nbsp;|&nbsp;
                                                G: R$ {selectedProduct.precoTortaG.toFixed(2)}
                                            </Text>
                                        )
                                    )}

                                    {/* Contador + Botão */}
                                    <Flex
                                        justify="space-between"
                                        align="center"
                                        bg="white"
                                        p={4}
                                        position="sticky"
                                        bottom={0}
                                        boxShadow="0px -2px 10px rgba(0, 0, 0, 0.05)"
                                    >
                                        {/* Quantidade via Controller */}
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

                                        {/* Botão COM type="submit" */}
                                        <Button
                                            type="submit"
                                            colorScheme="yellow"
                                            bg="#F1DD2F"
                                            color="#895023"
                                            size="lg"
                                            px={8}
                                            _hover={{ bg: "#E0CC28" }}
                                            loading={isLoading}
                                        >
                                            <HStack gap={2}>
                                                <FiShoppingBag size={24} />
                                                <Text>Adicionar</Text>
                                            </HStack>
                                        </Button>
                                    </Flex>
                                </Stack>
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
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}
