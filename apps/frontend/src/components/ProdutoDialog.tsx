import { FormValues } from "@/app/admin_cardapio/page";
import {
    Dialog,
    Portal,
    CloseButton,
    Field,
    Input,
    Button,
    Center,
    Stack,
    Flex,
} from "@chakra-ui/react";
import { UseFormReturn, FieldErrors } from "react-hook-form";
import { Product } from "@/types/Product.type";
import { useEffect, useState } from "react";

type ProdutoDialogProps = {
    open: boolean;
    setOpen: (value: boolean) => void;
    onSubmit: (data: FormValues) => void | Promise<void>;
    form: UseFormReturn<FormValues>;
    errors: FieldErrors<FormValues>;
    isLoading: boolean;
    imagePreviewUrl: string | null;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveImage: () => void;
    reset: () => void;
    mode: "create" | "edit";
    product: Product | null;
    setImagePreviewUrl: (url: string | null) => void;
};


export const ProdutoDialog = ({
    open,
    setOpen,
    onSubmit,
    form,
    errors,
    isLoading,
    imagePreviewUrl,
    handleImageChange,
    handleRemoveImage,
    reset,
    mode,
    product,
    setImagePreviewUrl,
}: ProdutoDialogProps) => {

    useEffect(() => {
        if (mode === 'create') {
            form.reset();
            setImagePreviewUrl(null);
        } else if (mode === 'edit' && product) {
            form.setValue('nome', product.nome);
            form.setValue('descricao', product.descricao);
            form.setValue('precoTortaP', product.precoTortaP);
            form.setValue('precoTortaG', product.precoTortaG);
            form.setValue('precoPedacoP', product.precoPedacoP);
            form.setValue('precoPedacoG', product.precoPedacoG);
            form.setValue('quantidade', product.quantidade);
            form.setValue('_id', product._id); // Passando o id para o form
            setImagePreviewUrl(product.imagem || null);
        }
    }, [product, form, setImagePreviewUrl]);


    return (
        <Dialog.Root
            open={open}
            onOpenChange={(e: { open: boolean }) => {
                setOpen(e.open);
                if (!e.open) {
                    reset();
                    handleRemoveImage();
                }
            }}
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>-
                        <Dialog.Header>
                            <Dialog.Title>
                                {mode === "create" ? "Cadastrar Produto" : "Editar Produto"}
                            </Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <Center>
                                    <Stack gap="4" width="100%" maxW="md">
                                        {[
                                            { name: "nome", label: "Nome", required: mode === "create" },
                                            { name: "descricao", label: "Descrição", required: mode === "create" }
                                        ].map(({ name, label, required }) => (
                                            <Field.Root key={name} invalid={!!errors[name as keyof FormValues]}>
                                                <Field.Label color="white">{label}</Field.Label>
                                                <Input
                                                    variant="subtle"
                                                    bgColor="#D9D9D9"
                                                    color="black"
                                                    size="lg"
                                                    type="text"
                                                    placeholder={label}
                                                    {...form.register(name as keyof FormValues, required
                                                        ? {
                                                            required: `${label} é obrigatório`,
                                                            min: {
                                                                value: 0,
                                                                message: "Preço deve ser positivo",
                                                            },
                                                        }
                                                        : {})}
                                                />
                                                <Field.ErrorText>
                                                    {errors[name as keyof FormValues]?.message}
                                                </Field.ErrorText>
                                            </Field.Root>
                                        ))}
                                        {[
                                            { name: "precoTortaP", label: "Preço Torta P", required: mode === "create" },
                                            { name: "precoTortaG", label: "Preço Torta G", required: mode === "create" },
                                            { name: "precoPedacoP", label: "Preço Pedaço P", required: mode === "create" },
                                            { name: "precoPedacoG", label: "Preço Pedaço G", required: mode === "create" },
                                            { name: "quantidade", label: "Quantidade", required: mode === "create" },
                                        ].map(({ name, label, required }) => (
                                            <Field.Root key={name} invalid={!!errors[name as keyof FormValues]}>
                                                <Field.Label color="white">{label}</Field.Label>
                                                <Input
                                                    variant="subtle"
                                                    bgColor="#D9D9D9"
                                                    color="black"
                                                    size="lg"
                                                    type="number"
                                                    placeholder={label}
                                                    {...form.register(name as keyof FormValues, required
                                                        ? {
                                                            required: `${label} é obrigatório`,
                                                            min: {
                                                                value: 0,
                                                                message: "Preço deve ser positivo",
                                                            },
                                                        }
                                                        : {})}
                                                />
                                                <Field.ErrorText>
                                                    {errors[name as keyof FormValues]?.message}
                                                </Field.ErrorText>
                                            </Field.Root>
                                        ))}

                                        <Field.Root>
                                            <Field.Label color="white">Imagem</Field.Label>
                                            {!imagePreviewUrl ? (
                                                <Input
                                                    variant="subtle"
                                                    bgColor="#D9D9D9"
                                                    color="black"
                                                    size="lg"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            ) : (
                                                <Flex mt="2" align="center" justify="center" gap="4">
                                                    <img
                                                        src={imagePreviewUrl}
                                                        alt="Pré-visualização"
                                                        style={{ maxHeight: "200px", borderRadius: "8px" }}
                                                    />
                                                    <Button onClick={handleRemoveImage} colorScheme="red" size="xs">
                                                        Remover imagem
                                                    </Button>
                                                </Flex>
                                            )}
                                        </Field.Root>

                                        <Button
                                            type="submit"
                                            bgColor="#895023"
                                            color="white"
                                            size="md"
                                            width="100%"
                                            alignSelf="center"
                                            loading={isLoading}
                                            loadingText={mode === "create" ? "Criando produto..." : "Salvando alterações..."}
                                            _hover={{ bgColor: "#6a3d1a" }}
                                        >
                                            {mode === "create" ? "Adicionar Produto" : "Salvar Alterações"}
                                        </Button>
                                    </Stack>
                                </Center>
                            </form>
                        </Dialog.Body>

                        <Dialog.Footer />
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
