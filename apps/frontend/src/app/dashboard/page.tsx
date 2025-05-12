"use client";

import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Icon,
  Button,
  Stat,
  Text,
  Table,
  Progress,
} from "@chakra-ui/react";
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
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4} mb={6}>
        {cards.map((card, i) => (
          <Stat.Root
            key={i}
            bg={`${card.color}.400`}
            color="white"
            rounded="md"
            shadow="md"
            p={4}
          >
            <Flex align="center" gap={2}>
              <Icon as={card.icon} boxSize={6} />
              <Stat.Label fontSize="sm">{card.title}</Stat.Label>
            </Flex>
            <Text fontSize="xl" fontWeight="bold">{card.value}</Text>
            <Progress.Root
              mt={2}
              size="sm"
              value={card.progress}
              colorScheme="whiteAlpha"
            />
          </Stat.Root>
        ))}
      </SimpleGrid>

      <Box bg="white" rounded="md" shadow="md" p={4}>
        <Heading size="md" mb={4}>
          Vendas do Dia
        </Heading>
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Número</Table.ColumnHeader>
              <Table.ColumnHeader>Nome do Cliente</Table.ColumnHeader>
              <Table.ColumnHeader>Categoria</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Valor</Table.ColumnHeader>
              <Table.ColumnHeader>Horário</Table.ColumnHeader>
              <Table.ColumnHeader>Forma de Pagamento</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {vendas.map((venda) => (
              <Table.Row key={venda.numero}>
                <Table.Cell>{venda.numero}</Table.Cell>
                <Table.Cell fontWeight="bold">{venda.nome}</Table.Cell>
                <Table.Cell>{venda.categoria}</Table.Cell>
                <Table.Cell>{venda.status}</Table.Cell>
                <Table.Cell>{venda.valor}</Table.Cell>
                <Table.Cell>{venda.horario}</Table.Cell>
                <Table.Cell>{venda.pagamento}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

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
