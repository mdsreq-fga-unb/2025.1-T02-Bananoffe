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
import { Fatia, Torta } from "@/types/Product.type";
import { useEffect } from "react";

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
    handleFatiaImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveFatiaImage: () => void;
    handleTortaImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveTortaImage: () => void;
    reset: () => void;
    mode: "create" | "edit";
    product: Fatia | Torta | null;
    setImagePreviewUrl: (url: string | null) => void;
    FatiaImagePreviewUrl: string | null
    TortaImagePreviewUrl: string | null;
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
    FatiaImagePreviewUrl,
    TortaImagePreviewUrl,
    handleFatiaImageChange,
    handleRemoveFatiaImage,
    handleRemoveTortaImage,
    handleTortaImageChange
}: ProdutoDialogProps) => {

    const tipo = product ? ("precoTortaP" in product ? "Torta" : "Fatia") : null;

    useEffect(() => {
        if (mode === 'create') {
            form.reset();
            setImagePreviewUrl(null);
        } else if (mode === 'edit' && product) {
            form.setValue("_id", product._id);
            form.setValue("nome", product.nome);
            form.setValue("descricao", product.descricao);

            if ("precoTortaP" in product) {
                // produto tipo Torta
                form.setValue("precoTortaP", product.precoTortaP);
                form.setValue("precoTortaG", product.precoTortaG);
                form.setValue("quantidadeTorta", product.quantidade)
                form.setValue("precoFatia", -1);
                form.setValue("quantidadeFatia", -1)
            } else {
                // produto tipo Fatia
                form.setValue("precoFatia", product.precoFatia);
                form.setValue("quantidadeFatia", product.quantidade);
                form.setValue("precoTortaP", 0);
                form.setValue("precoTortaG", 0);
                form.setValue("quantidadeTorta", -1)
            }
            setImagePreviewUrl(product.imagem || null);
        }
    }, [product, form, setImagePreviewUrl, mode]);

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
                                {mode === "create" ? "Cadastrar Produto" : `Editar ${tipo}`}
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

                                        {(mode === "create" || tipo === "Torta") && (
                                            <>
                                                {[
                                                    { name: "precoTortaP", label: "Preço Torta P" },
                                                    { name: "precoTortaG", label: "Preço Torta G" },
                                                    { name: "quantidadeTorta", label: "Quantidade de Tortas" },
                                                ].map(({ name, label }) => (
                                                    <Field.Root key={name} invalid={!!errors[name as keyof FormValues]}>
                                                        <Field.Label color="white">{label}</Field.Label>
                                                        <Input
                                                            variant="subtle"
                                                            bgColor="#D9D9D9"
                                                            color="black"
                                                            size="lg"
                                                            type="number"
                                                            placeholder={label}
                                                            {...form.register(name as keyof FormValues, {
                                                                required: `${label} é obrigatório`,
                                                                min: { value: 0, message: "Preço deve ser positivo" },
                                                            })}
                                                        />
                                                        <Field.ErrorText>{errors[name as keyof FormValues]?.message}</Field.ErrorText>
                                                    </Field.Root>
                                                ))}
                                            </>
                                        )}

                                        {(mode === "create" || tipo === "Fatia") && (
                                            <>
                                                {[
                                                    { name: "precoFatia", label: "Preço Fatia" },
                                                    { name: "quantidadeFatia", label: "Quantidade de Fatias" },
                                                ].map(({ name, label }) => (
                                                    <Field.Root key={name} invalid={!!errors[name as keyof FormValues]}>
                                                        <Field.Label color="white">{label}</Field.Label>
                                                        <Input
                                                            variant="subtle"
                                                            bgColor="#D9D9D9"
                                                            color="black"
                                                            size="lg"
                                                            type="number"
                                                            placeholder={label}
                                                            {...form.register(name as keyof FormValues, {
                                                                required: `${label} é obrigatório`,
                                                                min: { value: 0, message: "Preço deve ser positivo" },
                                                            })}
                                                        />
                                                        <Field.ErrorText>{errors[name as keyof FormValues]?.message}</Field.ErrorText>
                                                    </Field.Root>
                                                ))}
                                            </>
                                        )}

                                        {mode === "create" ? (
                                            <>
                                                <Field.Root>
                                                    <Field.Label color="white">Imagem da Torta</Field.Label>
                                                    {!TortaImagePreviewUrl ? (
                                                        <Input
                                                            variant="subtle"
                                                            bgColor="#D9D9D9"
                                                            color="black"
                                                            size="lg"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleTortaImageChange}
                                                        />
                                                    ) : (
                                                        <Flex mt="2" align="center" justify="center" gap="4">
                                                            {TortaImagePreviewUrl ? (
                                                                /* eslint-disable @next/next/no-img-element */
                                                                <img
                                                                    src={TortaImagePreviewUrl}
                                                                    alt="Pré-visualização"
                                                                    style={{ maxHeight: "200px", borderRadius: "8px" }}
                                                                />
                                                                /* eslint-enable @next/next/no-img-element */
                                                            ) : null}
                                                            <Button onClick={handleRemoveTortaImage} colorScheme="red" size="xs">
                                                                Remover imagem
                                                            </Button>
                                                        </Flex>
                                                    )}
                                                </Field.Root>

                                                <Field.Root>
                                                    <Field.Label color="white">Imagem da Fatia</Field.Label>
                                                    {!FatiaImagePreviewUrl ? (
                                                        <Input
                                                            variant="subtle"
                                                            bgColor="#D9D9D9"
                                                            color="black"
                                                            size="lg"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleFatiaImageChange}
                                                        />
                                                    ) : (
                                                        <Flex mt="2" align="center" justify="center" gap="4">
                                                            {FatiaImagePreviewUrl ? (
                                                                /* eslint-disable @next/next/no-img-element */
                                                                <img
                                                                    src={FatiaImagePreviewUrl}
                                                                    alt="Pré-visualização"
                                                                    style={{ maxHeight: "200px", borderRadius: "8px" }}
                                                                />
                                                                /* eslint-enable @next/next/no-img-element */
                                                            ) : (
                                                                null)}
                                                            <Button onClick={handleRemoveFatiaImage} colorScheme="red" size="xs">
                                                                Remover imagem
                                                            </Button>
                                                        </Flex>
                                                    )}
                                                </Field.Root>
                                            </>
                                        ) : (
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
                                                        {imagePreviewUrl ?
                                                            (
                                                                /* eslint-disable @next/next/no-img-element */
                                                                <img
                                                                    src={imagePreviewUrl}
                                                                    alt="Pré-visualização"
                                                                    style={{ maxHeight: "200px", borderRadius: "8px" }}
                                                                />
                                                                /* eslint-enable @next/next/no-img-element */

                                                            ) : (
                                                                null
                                                            )}
                                                        <Button onClick={handleRemoveImage} colorScheme="red" size="xs">
                                                            Remover imagem
                                                        </Button>
                                                    </Flex>
                                                )}
                                            </Field.Root>
                                        )}

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
