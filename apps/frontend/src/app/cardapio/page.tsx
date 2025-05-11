"use client";
import {
  Box,
  Stack,
  Flex,
  Text,
  Input,
  InputGroup,
  Center,
  useBreakpointValue,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { MdSearch, MdFilterList } from "react-icons/md";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { useProducts } from "@/hooks/useProducts";

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
  }, []);

  return (
    <Box minH="100vh" bgColor="#FEE" pb="130px">
      <Box
        bgColor="#F1DD2F"
        maxW={isMobile ? "100%" : "900px"}
        mx="auto"
        h="100vh"
        boxShadow="sm"
      >
        <Stack>
          <Flex justifyContent={"space-between"} alignItems={"center"} pl={"8"}>
            <Text
              textStyle={isMobile ? "2xl" : "3xl"}
              fontWeight="semibold"
              color="black"
            >
              Bananoffee Doceria
            </Text>
            <Image
              src="/Logo Bananoffee - Sem Fundo-02.png"
              maxHeight={isMobile ? "7rem" : "7.5rem"}
              maxWidth={"7.5rem"}
            />
          </Flex>
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
          </Flex>

          {isLoading ? (
            <Center mt="20">
              <Spinner size="xl" color="#895023" />
            </Center>
          ) : (
            <Stack gap="1">
              {filteredProducts.map((product, index) => (
                <Flex
                  key={index}
                  bg="white"
                  py="2"
                  justifyContent="space-between"
                  paddingX="4"
                  w="100%"
                  minHeight="9.5rem"
                >
                  <Stack gap={0} w="75%">
                    <Text fontWeight="bold" fontSize="lg" color="#895023">
                      {product.nome}
                    </Text>

                    <Text fontSize="sm" color="gray.600">
                      {product.descricao}
                    </Text>

                    <Stack gap={0.5} mt={1}>
                      {product.precoPedacoP > 0 && (
                        <Text fontSize="sm" color={"#000"}>
                          <strong>Torta Pequena:</strong> R${" "}
                          {product.precoTortaP.toFixed(2)}
                        </Text>
                      )}
                      {product.precoPedacoG > 0 && (
                        <Text fontSize="sm" color={"#000"}>
                          <strong>Torta Grande:</strong> R${" "}
                          {product.precoTortaG.toFixed(2)}
                        </Text>
                      )}
                      {product.precoPedacoP > 0 && (
                        <Text fontSize="sm" color={"#000"}>
                          <strong>Pedaço Pequeno:</strong> R${" "}
                          {product.precoPedacoP.toFixed(2)}
                        </Text>
                      )}
                      {product.precoTortaG > 0 && (
                        <Text fontSize="sm" color={"#000"}>
                          <strong>Pedaço Grande:</strong> R${" "}
                          {product.precoPedacoG.toFixed(2)}
                        </Text>
                      )}
                    </Stack>
                  </Stack>
                  {product.imagem && (
                    <Image
                      src={product.imagem}
                      alt={product.nome}
                      objectFit="cover"
                      maxH={isMobile ? "8rem" : "9.5rem"}
                      maxW={isMobile ? "8rem" : "9.5rem"}
                      position="relative"
                      borderRadius="lg"
                    />
                  )}
                </Flex>
              ))}
            </Stack>
          )}
          <NavBar />
        </Stack>
      </Box>
    </Box>
  );
}

export default Cardapio;
