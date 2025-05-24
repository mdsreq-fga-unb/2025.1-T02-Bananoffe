"use client";

import {
    Box,
    Flex,
    Image,
    Text,
    Button,
    useBreakpointValue,
    Stack,
} from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function Header() {
    const { user } = useAuth();
    const router = useRouter();
    const isMobile = useBreakpointValue({ base: true, md: false });
    const isAdmin = user?.role==="admin"

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
                <Flex justify="space-between" align="center">
                    <Stack gap={1}>
                        <Box w={isMobile ? "5rem" : "8rem"}>
                            <Text fontSize="md" color="gray.600">
                                Olá, {user?.nome || "visitante"}!
                            </Text>
                        </Box>
                        {isAdmin && (
                            <Button
                                size="xs"
                                color="red"
                                variant="ghost"
                                width="fit-content"
                                onClick={() => router.push("/admin_cardapio")}
                            >
                                Gerenciar Cardápio
                            </Button>
                        )}
                    </Stack>
                    <Box position="absolute" left="50%" transform="translateX(-50%)">
                        <Text fontSize="xl" fontWeight="bold" color="#2D2D2D" textAlign="center">
                            Bananoffee Doceria
                        </Text>
                    </Box>
                    <Image
                        src="/Logo Bananoffee - Sem Fundo-02 alt.png"
                        alt="Logo Bananoffee"
                        maxH="5rem"
                        borderRadius="full"
                        cursor="pointer"
                        onClick={() => router.push("/")}
                        left="75%"
                        w={100}
                    />
                </Flex>
            </Box>
        </Box>
    );
}

export default Header;
