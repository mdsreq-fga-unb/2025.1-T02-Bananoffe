"use client";
import {
  Box,
  Image,
  Input,
  InputGroup,
  Spinner,
  Stack,
  Table,
  useBreakpointValue,
  Text,
  Center,
} from "@chakra-ui/react";

import { useProducts } from "@/hooks/useProducts";
import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";

function adminCardapio() {
  const { products, getProducts, isLoading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const isMobile = useBreakpointValue({ base: true, md: false });
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
    <Box className="pageContainer" p={5} bg="gray.50" minH="100vh">
      <Stack className="pageContent" gap="2">
        <InputGroup endElement={<MdSearch />} w="30%">
          <Input
            placeholder="Pesquise"
            bgColor="#ededed"
            color="#000"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        {isLoading ? (
          <Center mx="auto" my={20} borderWidth={"0px"}>
            <Spinner size="xl" color="blue.500" />
          </Center>
        ) : (
          <Table.Root
            stickyHeader
            variant="outline"
            colorPalette="gray"
            color="black"
            borderRadius="sm"
            overflowY="auto"
          >
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
              {filteredProducts.map((item, index) => (
                <Table.Row key={index}>
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
        )}
      </Stack>
    </Box>
  );
}

export default adminCardapio;
