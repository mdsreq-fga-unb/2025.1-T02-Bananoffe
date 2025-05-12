"use client";
import { usePathname } from "next/navigation";
import {
  Stack,
  Center,
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
    { iconName: <MdOutlineMenuBook />, title: "Cardápio", rota: "/cardapio" },
    { iconName: <MdOutlineShoppingBag />, title: "Sacola", rota: "/sacola" },
    { iconName: <MdInventory />, title: "Pedidos", rota: "/pedidos" },
    { iconName: <MdPerson />, title: "Perfil", rota: "/perfil" },
  ];
  const icons = navItems.map((item, index) => {
    const isActive = RotaAtual === item.rota;
    return (
      <Link href={item.rota} key={index}>
        <Stack gap="1">
          <Center>
            <Icon size="2xl" color={isActive ? "#16ed48" : "#000"}>
              {item.iconName}
            </Icon>
          </Center>
          <Text color={isActive ? "#16ed48" : "#000"} font="lg">
            {item.title}
          </Text>
        </Stack>
      </Link>
    );
  });
  return (
    <Box
      maxW={isMobile ? "100%" : "900px"}
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
