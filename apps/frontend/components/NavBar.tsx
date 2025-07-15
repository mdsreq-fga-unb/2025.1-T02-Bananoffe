"use client";
import { usePathname } from "next/navigation";
import {
  Stack,
  Icon,
  Flex,
  Text,
  Box,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  MdOutlineMenuBook,
  MdOutlineShoppingBag,
  MdInventory,
  MdPerson,
} from "react-icons/md";
function NavBar() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const RotaAtual = usePathname();
  const navItems = [
    { iconName: <MdOutlineMenuBook />, title: "Cardápio", rota: "/" },
    { iconName: <MdOutlineShoppingBag />, title: "Sacola", rota: "/sacola" },
    { iconName: <MdInventory />, title: "Pedidos", rota: "/pedidos" },
    { iconName: <MdPerson />, title: "Perfil", rota: "/minha_conta" },
  ];
  const icons = navItems.map((item, index) => {
    const isActive = RotaAtual === item.rota;
    return (
      <Link href={item.rota} key={index}>
        <Stack
          gap="1"
          align="center"
          px="4"
          py="2"
          borderRadius="md"
          transition="all 0.2s ease"
          bg={isActive ? "green.100" : "transparent"}
          _hover={{
            bg: "green.50",
            transform: "translateY(-2px)",
          }}
        >
          <Icon
            as={item.iconName.type}
            boxSize={6}
            color={isActive ? "#16ed48" : "#000"}
            transition="color 0.2s"
          />
          <Text color={isActive ? "#16ed48" : "#000"} fontSize="sm">
            {item.title}
          </Text>
        </Stack>
      </Link>
    );
  });
  
  return (
    <Box
      maxW={isMobile ? "100%" : "1200px"}
      mx="auto"
      position="fixed" // Fixa na tela
      bottom="0" // Coloca no rodapé
      left="0" // Alinha à esquerda
      right="0" // Estica até a direita
      bg="white" // Fundo branco
      borderTopRadius="xl" // Bordas arredondadas apenas no topo
      boxShadow="md" // Sombra para efeito de elevação
      zIndex="sticky" // Garante que fique acima de outros elementos
      py={isMobile ? "3" : "6"}
    >
      <Flex justifyContent="space-evenly">{icons}</Flex>
    </Box>
  );
}
export default NavBar;
