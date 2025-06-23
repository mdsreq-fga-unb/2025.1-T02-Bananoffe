"use client";
import {
    Box,
    Input,
    InputGroup,
    Stack,
    useBreakpointValue,
    Button,
    Flex,
    Table,
    Dialog,
    Portal,
    Field,
    Text,
} from "@chakra-ui/react";

import { useState } from "react";
import Link from "next/link";
import MenuBar from "@/components/MenuBar";
import { CiEdit } from "react-icons/ci";
import { useConfiguracoes } from "@/hooks/useConfiguracoes";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function adminConfig() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { buscarChavePix, alterarChavePix } = useConfiguracoes();
    const [chaveAleatoria, setChaveAleatoria] = useState("carregando...");
    const [novaChave, setNovaChave] = useState("");
    const { data: session } = useSession();
    const router = useRouter();

    const fetchChavePix = async () => {
        try {
            const chave = await buscarChavePix();
            if (chave) {
                setChaveAleatoria(chave);
            }
        } catch (error) {
            console.error("Erro ao buscar chave Pix:", error);
        }
    }

    useEffect(() => {
        if (session === undefined) {
            return;
        }

        if (session === null) {
            router.push("/login");
            return;
        }

        fetchChavePix();
    }, [session]);

    async function handleSalvarChave() {
        if (novaChave.trim() === "") {
            alert("Por favor, insira uma nova chave Pix válida.");
            return;
        }

        const sucesso = await alterarChavePix(novaChave);
        if (sucesso) {
            setChaveAleatoria(novaChave);
            setNovaChave("");
        }
    }

    return (
        <Box
            className="pageContainer"
            p={5}
            bg="gray.50"
            minH="100vh"
            width="100%"
            overflow="auto"
        >
            <Stack className="pageContent" gap="2">
                <Flex
                    className="Header"
                    flexDirection={isMobile ? "column" : "row"}
                    gap="1"
                >
                    <MenuBar />
                    <Link href="/">
                        <Button
                            bgColor="#895023"
                            color="#FFF"
                            marginRight={isMobile ? "0" : "2"}
                        >
                            Cardápio Digital
                        </Button>
                    </Link>
                </Flex>
                <Box
                    mt={4}
                    borderRadius="md"
                    overflow="hidden"
                >
                    <Table.Root
                        size="sm"
                        showColumnBorder
                        borderWidth="1px"
                        variant="outline"
                    >
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader textAlign="center" p={2} color="white">
                                    Chave Pix Aleatória
                                </Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center" p={2} color="white">
                                    Editar
                                </Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell bg="white" color="black" textAlign="center" p={2}>
                                    {chaveAleatoria}
                                </Table.Cell>
                                <Table.Cell bg="white" textAlign="center" p={2}>
                                    <Dialog.Root>
                                        <Dialog.Trigger asChild>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                _hover={{ bgColor: "#e2e2e2" }}
                                                color="#895023"
                                            >
                                                <CiEdit />
                                            </Button>
                                        </Dialog.Trigger>
                                        <Portal>
                                            <Dialog.Backdrop />
                                            <Dialog.Positioner>
                                                <Dialog.Content>
                                                    <Dialog.Header>
                                                        <Dialog.Title>Editar Chave Pix</Dialog.Title>
                                                    </Dialog.Header>
                                                    <Dialog.Body pb="4">
                                                        <Stack gap="4">
                                                            <Field.Root>
                                                                <Field.Label>Chave Pix</Field.Label>
                                                                <Input
                                                                    placeholder="Nova Chave Pix"
                                                                    value={novaChave}
                                                                    onChange={(e) => setNovaChave(e.target.value.replace(/\s/g, ""))}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === " ") {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                            </Field.Root>
                                                        </Stack>
                                                    </Dialog.Body>
                                                    <Dialog.Footer>
                                                        <Dialog.ActionTrigger asChild>
                                                            <Button variant="outline">Cancelar</Button>
                                                        </Dialog.ActionTrigger>
                                                        <Dialog.Trigger asChild>
                                                            <Button onClick={handleSalvarChave} disabled={novaChave === ""}>Salvar</Button>
                                                        </Dialog.Trigger>
                                                    </Dialog.Footer>
                                                </Dialog.Content>
                                            </Dialog.Positioner>
                                        </Portal>
                                    </Dialog.Root>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table.Root>
                </Box>
                {chaveAleatoria === "123e4567-e89b-12d3-a456-426655440000" && (
                    <Flex direction="column" alignItems="center" mt={4} p={4}>
                        <Text color={"red"}>Essa é uma chave pix de exemplo</Text>
                    </Flex>
                )}
            </Stack>

        </Box>
    );
}

export default adminConfig;