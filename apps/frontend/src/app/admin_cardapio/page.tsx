"use client";
import {
  Box,
  Image,
  Input,
  InputGroup,
  Stack,
  Table,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useProducts } from "@/hooks/useProducts";
import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";

function adminCardapio() {
  const { products, getProducts, isLoading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const items = [
    {
      id: 1,
      nome: "Banoffee 1",
      descricao: "descrição banoffee 1",
      precoTortaP: 5,
      precoTortaG: 5,
      precoPedacoP: 10,
      precoPedacoG: 20,
      quantidade: 5,
      imagem: null,
    },
    {
      id: 2,
      nome: "Banoffee 2",
      descricao: "descrição banoffee 2",
      precoTortaP: 5,
      precoTortaG: 5,
      precoPedacoP: 10,
      precoPedacoG: 20,
      quantidade: 5,
      imagem: null,
    },
  ];
  const imageSize = "50px";

  const filteredProducts = products.filter(
    (product) =>
      product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box className="pageContainer">
      <Stack className="pageContent" gap="10">
        <InputGroup endElement={<MdSearch />} w="30%" ml="25px">
          <Input
            placeholder="Pesquise"
            bgColor="#ededed"
            color="#000"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Table.Root stickyHeader interactive variant="outline" color="white">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Produto</Table.ColumnHeader>
              <Table.ColumnHeader>Descrição</Table.ColumnHeader>
              <Table.ColumnHeader>Preço Torta P</Table.ColumnHeader>
              <Table.ColumnHeader>Preço Torta G</Table.ColumnHeader>
              <Table.ColumnHeader>Preço Pedaço P</Table.ColumnHeader>
              <Table.ColumnHeader>Preço Pedaço G</Table.ColumnHeader>
              <Table.ColumnHeader>Quantidade</Table.ColumnHeader>
              <Table.ColumnHeader>Imagem</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredProducts.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.nome}</Table.Cell>
                <Table.Cell>{item.descricao}</Table.Cell>
                <Table.Cell>{item.precoPedacoP}</Table.Cell>
                <Table.Cell>{item.precoPedacoG}</Table.Cell>
                <Table.Cell>{item.precoTortaP}</Table.Cell>
                <Table.Cell>{item.precoTortaG}</Table.Cell>
                <Table.Cell>{item.quantidade}</Table.Cell>
                <Table.Cell
                  width={imageSize}
                  height={imageSize}
                  padding={1} // Espaçamento interno reduzido
                >
                  <Box
                    width="100%"
                    height="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="gray.100" // Fundo cinza claro para visualização
                    borderRadius="md" // Bordas arredondadas
                    overflow="hidden" // Esconde qualquer overflow da imagem
                  >
                    <Image
                      src={item.imagem}
                      maxW="100%"
                      maxH="100%"
                      objectFit="contain"
                      alt={item.nome}
                    />
                  </Box>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Stack>
    </Box>
  );
}

export default adminCardapio;
