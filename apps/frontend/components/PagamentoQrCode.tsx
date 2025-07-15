"use client"

import { useEffect, useState } from 'react';
import { Box, Button, Center, Container, Flex, Heading, Image, QrCode, Spinner, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import NavBar from './NavBar';
import { useConfiguracoes } from '../hooks/useConfiguracoes';
import { Pedido } from '../types/Pedido.type';
import { toaster } from './ui/toaster';

interface PagamentoQrCodeProps {
    pedido: Pedido;
}

export default function PagamentoQrCode({ pedido }: PagamentoQrCodeProps) {
    const [pixCode, setPixCode] = useState('');
    const { gerarPixQrCode } = useConfiguracoes();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function gerar() {
            try {
                setIsLoading(true);
                const code = await gerarPixQrCode(pedido.valorTotal);
                if (code) setPixCode(code.pixCode);
            } catch (error) {
                console.error("Erro ao gerar Pix:", error);
                toaster.create({
                    title: "Erro ao gerar Qr Code",
                    description: "Por favor, tente mais tarde",
                    type: "error"
                })
            } finally {
                setIsLoading(false);
            }
        }

        gerar();
    }, [pedido.valorTotal, gerarPixQrCode]);

    return (
        <Box minH="100vh" bg="#F1DD2F" display="flex" flexDirection="column">
            <Container maxW="lg" flex="1" py={10} pb="120px">
                <Stack gap={8} boxShadow="lg" p={8} borderRadius="2xl" bg="white">
                    <Flex justify="space-between" align="center">
                        <Link href="/pedidos">
                            <Button
                                variant="ghost"
                                color="#895023"
                                size={"lg"}
                                _hover={{ bg: "transparent", textDecoration: "underline" }}
                            >
                                Voltar
                            </Button>
                        </Link>
                        <Image src="/logoBAnanoffe.jpg" alt="Logo" boxSize="80px" />
                    </Flex>

                    <Stack textAlign="center" gap={4}>
                        <Heading fontSize="2xl" color="#895023">
                            Apresente o comprovante de pagamento quando retirar o pedido
                        </Heading>
                        <Text fontSize="3xl" color="black">
                            Valor: R${pedido.valorTotal}
                        </Text>

                        {isLoading ? (
                            <Stack>
                                <Center mt={20}>
                                    <Spinner size="xl" color="#895023" />
                                </Center>
                            </Stack>
                        ) : (
                            pixCode !== '' && (
                                <Box rounded="md" bgColor={'black'} p={5}>
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

                                    <Button
                                        mt={6}
                                        bg="#895023"
                                        color="white"
                                        variant="solid"
                                        _hover={{ bgColor: "#6f3f1b" }}
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
                                        size={"2xl"}
                                    >
                                        Copiar código copia e cola
                                    </Button>
                                </Box>
                            )
                        )}
                    </Stack>
                </Stack>
            </Container>
            <NavBar />
        </Box>
    );
}