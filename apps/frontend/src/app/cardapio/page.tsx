"use client";
import {
  Box,
  Stack,
  Flex,
  Text,
  Input,
  InputGroup,
  Icon,
  Center,
  useBreakpointValue,
  SimpleGrid,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { MdSearch, MdFilterList } from "react-icons/md";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { useProducts } from "@/hooks/useProducts";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  priceSmall: number;
  priceLarge: number;
  priceSlice: number;
  image?: string;
}

function Cardapio() {
  const { products, getProducts, isLoading } = useProducts(); //~ hook busca os produtos

  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useBreakpointValue({ base: true, md: false });

  const filteredProducts = products.filter(
    (product) =>
      product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Box minH="100vh" bgColor="#F1DD2F">
      <Stack>
        <Text textStyle="3xl" fontWeight="semibold" color="black" p="8">
          Bananoffee Doceria
        </Text>
        <Flex
          h="60px"
          bgColor="#FFF"
          w="100%"
          alignContent="center"
          justifyContent="space-between"
        >
          <InputGroup endElement={<MdSearch />} w="30%" ml="25px">
            <Input
              placeholder="Pesquise"
              bgColor="#ededed"
              color="#000"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Icon size="lg" color="#000" justifySelf={"end"} alignSelf="center">
            <MdFilterList />
          </Icon>
        </Flex>

        {isLoading ? (
          <Center mt="20">
            <Spinner size="xl" color="#895023" />
          </Center>
        ) : (
          <SimpleGrid columns={isMobile ? 1 : 2} gap={6}>
            {filteredProducts.map((product) => (
              <Box
                key={product.id}
                bg="white"
                borderRadius="xl"
                p={4}
                boxShadow="md"
                _hover={{ transform: "scale(1.02)", transition: "all 0.2s" }}
              >
                <Flex direction={isMobile ? "column" : "row"} gap={4}>
                  {/* Imagem do produto (se existir) */}
                  {product.imagem && (
                    <Image
                      // src={product.imagem}
                      alt={product.nome}
                      objectFit="cover"
                      borderRadius="lg"
                      maxH="150px"
                      w={isMobile ? "100%" : "150px"}
                    />
                  )}

                  {/* Informações do produto */}
                  <Stack gap={2} flex={1}>
                    <Text fontWeight="bold" fontSize="lg" color="#895023">
                      {product.nome}
                    </Text>

                    <Text fontSize="sm" color="gray.600">
                      {product.descricao}
                    </Text>

                    {/* Preços */}
                    <Stack gap={1} mt={2}>
                      <Text fontSize="sm">
                        <strong>Torta Pequena:</strong> R${" "}
                        {product.precoTortaP.toFixed(2)}
                      </Text>
                      <Text fontSize="sm">
                        <strong>Torta Grande:</strong> R${" "}
                        {product.precoTortaG.toFixed(2)}
                      </Text>
                      <Text fontSize="sm">
                        <strong>Pedaço Pequeno:</strong> R${" "}
                        {product.precoPedacoP.toFixed(2)}
                      </Text>
                      <Text fontSize="sm">
                        <strong>Pedaço Grande:</strong> R${" "}
                        {product.precoPedacoG.toFixed(2)}
                      </Text>
                    </Stack>
                  </Stack>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        )}
        <NavBar />
      </Stack>
    </Box>
  );
}

export default Cardapio;
