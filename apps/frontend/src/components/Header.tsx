"use client";

import {
    Box,
    Flex,
    Button,
    useBreakpointValue,
    Menu,
    Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const isMobile = useBreakpointValue({ base: true, md: false });
    const isAdmin = user?.role === "admin"

    return (
        <Box
            as="header"
            maxW={isMobile ? "100%" : "1200px"}
            display="flex"
            mx="auto"
            justifyContent="center"
            bg="#F1DD2F"
            position="sticky"
            top={0}
            zIndex={10}
            left={0}
            right={0}
        >
            <Box
                w="100%"
                maxW="1200px"
                bg="white"
                borderBottomRadius="xl"
                boxShadow="md"
                px={6}
                py={isMobile ? 3 : 5}
            >
                <Flex justify="space-between" align="center" position="relative">
                    <Menu.Root>
                        <Menu.Trigger>
                            <Button
                                variant="ghost"
                                fontWeight="normal"
                                color="gray.600"
                                display="flex"
                                alignItems="center"
                                gap={2}
                                _hover={{ bg: "gray.300" }}
                            >
                                Olá, {user?.nome || "Visitante"}!
                                <ChevronDownIcon />
                            </Button>
                        </Menu.Trigger>
                        <Menu.Positioner>
                            <Menu.Content bg="white" borderRadius="md" boxShadow="lg" minW="200px">
                                {isAdmin && (
                                    <Menu.Item color="black" _hover={{
                                        bg: "gray.300", transform: "translateY(-2px)",
                                    }} value="admin_cardapio" onSelect={() => router.push("/admin_cardapio")}>
                                        Gerenciar Cardápio
                                    </Menu.Item>
                                )}
                                <Menu.Separator />
                                <Menu.Item
                                    color="black"
                                    value="logout"
                                    onSelect={() => {
                                        logout();
                                        router.push("/");
                                    }}
                                    _hover={{
                                        bg: "gray.300", transform: "translateY(-2px)",
                                    }}
                                >
                                    Sair
                                </Menu.Item>
                                <Menu.Arrow />
                            </Menu.Content>
                        </Menu.Positioner>
                    </Menu.Root>

                    {/* Nome da doceria centralizado */}
                    <Box position="absolute" left="50%" transform="translateX(-50%)">
                        <Text fontSize="xl" fontWeight="bold" color="#2D2D2D" textAlign="center">
                            Bananoffee Doceria
                        </Text>
                    </Box>

                    <Box
                        maxH="5rem"
                        borderRadius="full"
                        cursor="pointer"
                        onClick={() => router.push("/")}
                        w="100px"
                        overflow="hidden"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Image
                            src="/Logo Bananoffee - Sem Fundo-02 alt.png"
                            alt="Logo Bananoffee"
                            width={100}
                            height={80}
                            style={{ objectFit: "contain", borderRadius: "9999px" }}
                        />
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}

export default Header;
