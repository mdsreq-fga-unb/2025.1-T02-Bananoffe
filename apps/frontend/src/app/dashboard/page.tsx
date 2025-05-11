"use client";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Icon,
  Progress,
  Thead,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import { Stat } from "@chakra-ui/react";
import { Table } from "@chakra-ui/react"
import {
  MdOutlineMenuBook,
  MdOutlineShoppingBag,
  MdAttachMoney,
} from "react-icons/md";
import { useState } from "react";

const cards = [
  {
    title: "Quantidade de vendas realizadas",
    icon: MdOutlineShoppingBag,
    value: "75",
    progress: 70,
    color: "blue",
  },
  {
    title: "Valor total vendido",
    icon: MdAttachMoney,
    value: "R$5.000,00",
    progress: 60,
    color: "green",
  },
  {
    title: "9 Encomendas",
    icon: MdOutlineShoppingBag,
    value: "Quantidade de pedidos encomendados",
    progress: 45,
    color: "yellow",
  },
  {
    title: "Cardápio",
    icon: MdOutlineMenuBook,
    value: "Produtos cadastrados",
    progress: 80,
    color: "red",
  },
];

const vendasMock = Array.from({ length: 30 }, (_, i) => ({
  numero: 50 - i,
  nome: ["João", "Pedro", "Anna"][i % 3],
  categoria: "Encomenda",
  status: ["Pronto para retirada", "Finalizado", "Entregue"][i % 3],
  valor: ["R$150.99", "R$999.90", "R$45.99"][i % 3],
  horario: ["10:32", "12:09", "11:54"][i % 3],
  pagamento: "Pix",
}));

export default function Dashboard() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 3;
  const totalPaginas = Math.ceil(vendasMock.length / itensPorPagina);
  const vendas = vendasMock.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  return (
    <Box p={4} pb={24} bg="gray.100" minH="100vh">
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={4} mb={6}>
        {cards.map((card, i) => (
          <Stat
            key={i}
            bg={'${card.color}.400'}
            color="white"
            rounded="md"
            shadow="md"
            p={4}
          >
            <Flex align="center" gap={2}>
              <Icon as={card.icon} boxSize={6} />
              <StatLabel fontSize="sm">{card.title}</StatLabel>
            </Flex>
            <StatNumber fontSize="xl">{card.value}</StatNumber>
            <Progress
              mt={2}
              size="sm"
              value={card.progress}
              colorScheme="whiteAlpha"
            />
          </Stat>
        ))}
      </SimpleGrid>

      <Box bg="white" rounded="md" shadow="md" p={4}>
        <Heading size="md" mb={4}>
          Vendas do Dia
        </Heading>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Número</Th>
              <Th>Nome do Cliente</Th>
              <Th>Categoria</Th>
              <Th>Status</Th>
              <Th>Valor</Th>
              <Th>Horário</Th>
              <Th>Forma de Pagamento</Th>
            </Tr>
          </Thead>
          <Tbody>
            {vendas.map((venda) => (
              <Tr key={venda.numero}>
                <Td>{venda.numero}</Td>
                <Td fontWeight="bold">{venda.nome}</Td>
                <Td>{venda.categoria}</Td>
                <Td>{venda.status}</Td>
                <Td>{venda.valor}</Td>
                <Td>{venda.horario}</Td>
                <Td>{venda.pagamento}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Paginação */}
        <Flex justify="center" mt={4} gap={2} flexWrap="wrap">
          {Array.from({ length: totalPaginas }, (_, i) => (
            <Button
              key={i}
              size="sm"
              colorScheme={paginaAtual === i + 1 ? "blue" : "gray"}
              onClick={() => setPaginaAtual(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}