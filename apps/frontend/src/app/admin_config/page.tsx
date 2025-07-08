"use client";
import {
    Box,
    Input,
    Stack,
    useBreakpointValue,
    Button,
    Flex,
    Table,
    Dialog,
    Portal,
    Field,
    Text,
    Center,
    QrCode,
} from "@chakra-ui/react";

import { useState } from "react";
import Link from "next/link";
import MenuBar from "@/components/MenuBar";
import { CiEdit } from "react-icons/ci";
import { useConfiguracoes } from "@/hooks/useConfiguracoes";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";

function AdminConfig() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { buscarChavePix, alterarChavePix, buscarCidadeBanco, alterarCidadeBanco, buscarNomeCompleto, alterarNomeCompleto, gerarPixQrCode } = useConfiguracoes();
    const [chaveAleatoria, setChaveAleatoria] = useState("carregando...");
    const [nomeCompleto, setNomeCompleto] = useState("carregando...");
    const [cidadeBanco, setCidadeBanco] = useState("carregando...");
    const [novaChave, setNovaChave] = useState("");
    const [novoNome, setNovoNome] = useState("");
    const [novaCidade, setNovaCidade] = useState("");
    const [pixCode, setPixCode] = useState("");
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

        const fetchNomeCompleto = async () => {
            try {
                const nome = await buscarNomeCompleto();
                if (nome) {
                    setNomeCompleto(nome.nome);
                }
            } catch (error) {
                console.error("Erro ao buscar Nome Completo", error);
            }
        }

        const fetchCidadeBanco = async () => {
            try {
                const cidade = await buscarCidadeBanco();
                if (cidade) {
                    setCidadeBanco(cidade.cidadeBanco);
                }
            } catch (error) {
                console.error("Erro ao buscar Cidade do Banco", error);
            }
        }

        fetchChavePix();
        fetchNomeCompleto();
        fetchCidadeBanco();
    }, [session, router, buscarChavePix, buscarCidadeBanco, buscarNomeCompleto]);

    async function handleSalvar() {
        if (
            novaChave.trim() === "" &&
            novoNome.trim() === "" &&
            novaCidade.trim() === ""
        ) {
            alert("Nenhuma alteração foi feita.");
            return;
        }

        try {
            let sucesso = false;

            if (novaChave.trim() !== "") {
                await alterarChavePix(novaChave);
                setChaveAleatoria(novaChave);
                setNovaChave("");
                sucesso = true;
            }

            if (novoNome.trim() !== "") {
                await alterarNomeCompleto(novoNome);
                setNomeCompleto(novoNome);
                setNovoNome("");
                sucesso = true;
            }

            if (novaCidade.trim() !== "") {
                await alterarCidadeBanco(novaCidade);
                setCidadeBanco(novaCidade);
                setNovaCidade("");
                sucesso = true;
            }
        } catch (error) {
            console.error("Erro ao salvar configurações:", error);
            alert("Erro inesperado ao salvar.");
        }
    }

    async function gerar() {
        try {
            const code = await gerarPixQrCode(0.01);
            if (code) setPixCode(code.pixCode);
        } catch (error) {
            console.error("Erro ao gerar Qr Code:", error);
            toaster.create({
                title: "Erro ao gerar Qr Code",
                description: "Por favor, tente mais tarde",
                type: "error"
            })
        }
    }

    const handleFechar = () => {
        setPixCode('');
    };

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
                                    Nome Completo
                                </Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center" p={2} color="white">
                                    Cidade do Banco
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
                                <Table.Cell bg="white" color="black" textAlign="center" p={2}>
                                    {nomeCompleto}
                                </Table.Cell>
                                <Table.Cell bg="white" color="black" textAlign="center" p={2}>
                                    {cidadeBanco}
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
                                                                {novaChave !== "" && (
                                                                    <Flex direction={"column"}>
                                                                        <Text color={'gray'}>Se a chave pix for telefone, utilizar o código do país antes</Text>
                                                                        <Text color={'gray'}>Ex: +5561912345678</Text>
                                                                    </Flex>
                                                                )}
                                                            </Field.Root>
                                                            <Field.Root>
                                                                <Field.Label>Nome Completo</Field.Label>
                                                                <Input
                                                                    placeholder="Novo Nome Completo"
                                                                    value={novoNome}
                                                                    onChange={(e) => setNovoNome(e.target.value)}
                                                                />
                                                            </Field.Root>
                                                            <Field.Root>
                                                                <Field.Label>Cidade do Banco</Field.Label>
                                                                <Input
                                                                    placeholder="Nova Cidade do Banco"
                                                                    value={novaCidade}
                                                                    onChange={(e) => setNovaCidade(e.target.value)}
                                                                />
                                                                {novaCidade !== "" && (
                                                                    <Flex direction={"column"}>
                                                                        <Text color={'gray'}>Não utilizar acentos</Text>
                                                                    </Flex>
                                                                )}
                                                            </Field.Root>
                                                        </Stack>
                                                    </Dialog.Body>
                                                    <Dialog.Footer>
                                                        <Dialog.ActionTrigger asChild>
                                                            <Button variant="outline">Cancelar</Button>
                                                        </Dialog.ActionTrigger>
                                                        <Dialog.Trigger asChild>
                                                            <Button onClick={handleSalvar} disabled={novaChave === "" && novaCidade === "" && novoNome === " "}>Salvar</Button>
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
                    <Button
                        bgColor="#895023"
                        color="#FFF"
                        marginRight={isMobile ? "0" : "2"}
                        mt={5}
                        onClick={() => (gerar())}
                    >
                        Testar Qr Code
                    </Button>
                </Box>
                {pixCode !== '' && (
                    <Box rounded="md" bgColor={'black'} p={5} w={"50%"}>
                        <Center>
                            <QrCode.Root value={pixCode} size={"2xl"}>
                                <QrCode.Frame>
                                    <QrCode.Pattern />
                                </QrCode.Frame>
                            </QrCode.Root>
                        </Center>
                        <Text mt={2} wordBreak="break-all">
                            <Text as="span" color="#895023" fontWeight="bold">
                                Chave:{' '}
                            </Text>
                            {pixCode}
                        </Text>

                        <Flex align={"center"} justifyContent={"space-between"} mt={6}>
                            <Button
                                bg="#895023"
                                color="white"
                                variant="solid"
                                _hover={{ bgColor: "#6f3f1b" }}
                                size={"2xl"}
                                onClick={() => {
                                    navigator.clipboard.writeText(pixCode);
                                    toaster.create({
                                        title: "Código copiado!",
                                        description: "O código Pix foi copiado para a área de transferência.",
                                        type: "success",
                                        duration: 2000,
                                        closable: true,
                                    });
                                }}
                            >
                                Copiar código copia e cola
                            </Button>
                            <Button
                                bg="#895023"
                                color="white"
                                variant="solid"
                                _hover={{ bgColor: "#6f3f1b" }}
                                size={"2xl"}
                                onClick={handleFechar}>
                                Fechar Qr Code
                            </Button>
                        </Flex>
                    </Box>
                )}
            </Stack>

        </Box>
    );
}

export default AdminConfig;