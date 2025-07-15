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
  Text,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import MenuBar from "../../components/MenuBar";
import { usePedidos } from "../../hooks/usePedidos";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pedido } from "../../types/Pedido.type";
import { useSession } from "next-auth/react";
import React from "react";
import { FaFileCircleCheck } from "react-icons/fa6";

function AdminPedido() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { listarTodosPedidos, isLoading, deletePedido } = usePedidos();
  const router = useRouter();
  const { data: session } = useSession();

  const pedidosFiltrados = pedidos.filter(
    (pedido) =>
      pedido._id.includes(searchTerm) ||
      pedido.usuarioId?.nome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (session === undefined) return;

    if (session === null) {
      router.push("/login");
      return;
    }

    const fetchPedidos = async () => {
      const data = await listarTodosPedidos();
      setPedidos(data);
    };

    fetchPedidos();
  }, [session, router, listarTodosPedidos]);

  const toggleExpand = (id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja Concluir/Excluir este pedido?")) {
      try {
        await deletePedido(id);
        setPedidos((prev) => prev.filter((pedido) => pedido._id !== id));
      } catch (error) {
        console.error("Erro ao excluir pedido:", error);
      }
    }
  }

  const cellStyle = { textAlign: "center", bg: "white", p: 2, color: "gray.800" };

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
          <InputGroup w={isMobile ? "100%" : "30%"}>
            <Input
              placeholder="Buscar por número ou usuário"
              bgColor="#ededed"
              color="#000"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
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

        {isLoading ? (
          <Flex justify="center" mt={10}>
            <Spinner size="xl" />
          </Flex>
        ) : pedidosFiltrados.length === 0 ? (
          <Text mt={5} fontSize="lg" textAlign="center" color="gray.600">
            Nenhum pedido encontrado.
          </Text>
        ) : (
          <Box mt={4} borderRadius="md" overflow="hidden">
            <Table.Root
              size="sm"
              showColumnBorder
              borderWidth="1px"
              variant="outline"
            >
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader textAlign="center" p={2}>
                    Número
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center" p={2}>
                    Usuário
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center" p={2}>
                    Telefone
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center" p={2}>
                    Total
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center" p={2}>
                    Data
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center" p={2}>
                    Concluir
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {pedidosFiltrados.map((pedido) => (
                  <React.Fragment key={pedido._id}>
                    <Table.Row
                      _hover={{ bg: "gray.100", cursor: "pointer" }}
                    >
                      <Table.Cell {...cellStyle} onClick={() => toggleExpand(pedido._id)}>
                        {pedido._id}
                      </Table.Cell>
                      <Table.Cell {...cellStyle} onClick={() => toggleExpand(pedido._id)}>
                        {pedido.usuarioId?.nome ?? "—"}
                      </Table.Cell>
                      <Table.Cell {...cellStyle} onClick={() => toggleExpand(pedido._id)}>
                        {pedido.usuarioId?.telefone ?? "—"}
                      </Table.Cell>
                      <Table.Cell {...cellStyle} onClick={() => toggleExpand(pedido._id)}>
                        R$ {pedido.valorTotal.toFixed(2)}
                      </Table.Cell>
                      <Table.Cell {...cellStyle} onClick={() => toggleExpand(pedido._id)}>
                        {pedido.createdAt
                          ? new Date(pedido.createdAt).toLocaleDateString()
                          : "—"}
                      </Table.Cell>
                      <Table.Cell {...cellStyle}>
                        <Button
                          size="sm"
                          variant="ghost"
                          _hover={{ bgColor: "#e2e2e2" }}
                          color="green.600"
                          onClick={() => handleDelete(pedido._id)}
                        >
                          <FaFileCircleCheck />
                        </Button>

                      </Table.Cell>
                    </Table.Row>

                    {expandedRow === pedido._id && (
                      <Table.Row>
                        <Table.Cell colSpan={4} bg="gray.100" p={4}>
                          <Text fontWeight="bold" mb={2} color="gray.800">
                            Detalhes do Pedido:
                          </Text>
                          <Stack gap={2}>
                            {pedido.itens.map((item, index) => (
                              <Box
                                key={index}
                                p={3}
                                borderRadius="md"
                                boxShadow="base"
                              >
                                <Text color="gray.800">
                                  <strong>Produto:</strong> {item.nome}
                                </Text>
                                <Text color="gray.800">
                                  <strong>Tipo:</strong> {item.tipo}
                                </Text>
                                <Text color="gray.800">
                                  <strong>Quantidade:</strong> {item.quantidade}
                                </Text>
                                <Text color="gray.800">
                                  <strong>Preço unitário:</strong> R${" "}
                                  {item.precoUnitario.toFixed(2)}
                                </Text>
                                <Text color="gray.800">
                                  <strong>Total:</strong> R${" "}
                                  {item.precoTotal.toFixed(2)}
                                </Text>
                              </Box>
                            ))}
                          </Stack>
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </React.Fragment>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export default AdminPedido;
