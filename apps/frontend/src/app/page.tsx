"use client";
import {
  Box,
  Stack,
  Flex,
  Text,
  Input,
  InputGroup,
  Center,
  Spinner,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { useProducts } from "@/hooks/useProducts";
import Header from "@/components/Header";
import { Fatia, Torta } from "@/types/Product.type";

function Home() {
  const { fatias, tortas, getProducts, isLoading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = <T extends Fatia | Torta>(items: T[], term: string = searchTerm) =>
    items.filter(
      (item) =>
        item.nome.toLowerCase().includes(term.toLowerCase()) ||
        item.descricao.toLowerCase().includes(term.toLowerCase())
    );

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box minH="100vh" bgColor="#F1DD2F">
      <Header />

      <Box maxW="1200px" mx="auto" px={6} pt={6} pb="110px">

        <InputGroup
          w="100%"
          endElement={<MdSearch color="gray.500" size={20} />}
          mb={6}
        >
          <Input
            placeholder="Buscar produto..."
            bgColor="white"
            borderRadius="full"
            color="gray.700"
            pl={4}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            _focus={{ borderColor: "#895023" }}
          />
        </InputGroup>

        {/* Produtos */}
        {isLoading ? (
          <Center mt={20}>
            <Spinner size="xl" color="#895023" />
          </Center>
        ) : (
          <>

            {/* Fatia Section */}
            <Text fontSize="xl" fontWeight="bold" color="#895023" mb={4}>
              Fatias
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
              {filteredProducts(fatias).map((item) => {
                // Aqui TypeScript já sabe que é Fatia, então funciona direto
                return (
                  <Flex
                    key={item._id}
                    bg="white"
                    borderRadius="2xl"
                    boxShadow="lg"
                    p={4}
                    align="center"
                    justify="space-between"
                    gap={4}
                  >
                    <Box flex="1">
                      <Text fontWeight="bold" fontSize="lg" color="#895023" mb={1}>
                        {item.nome}
                      </Text>
                      <Text fontSize="sm" color="gray.600" mb={2}>
                        {item.descricao}
                      </Text>
                      <Text fontSize="sm" color="gray.700">
                        <strong>Preço:</strong> R$ {item.precoFatia.toFixed(2)}
                      </Text>
                    </Box>
                    {item.imagem && (
                      <Image
                        src={item.imagem}
                        alt={item.nome}
                        objectFit="cover"
                        borderRadius="xl"
                        boxShadow="md"
                        w="6.5rem"
                        h="6.5rem"
                      />
                    )}
                  </Flex>
                );
              })}
            </SimpleGrid>


            {/* Torta Section */}
            <Text fontSize="xl" fontWeight="bold" color="#895023" mb={4} mt={4}>
              Tortas
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
              {filteredProducts(tortas).map((item) => {
                // Aqui TypeScript já sabe que é Fatia, então funciona direto
                return (
                  <Flex
                    key={item._id}
                    bg="white"
                    borderRadius="2xl"
                    boxShadow="lg"
                    p={4}
                    align="center"
                    justify="space-between"
                    gap={4}
                  >
                    <Box flex="1">
                      <Text fontWeight="bold" fontSize="lg" color="#895023" mb={1}>
                        {item.nome}
                      </Text>
                      <Text fontSize="sm" color="gray.600" mb={2}>
                        {item.descricao}
                      </Text>
                      <Stack gap={0.5} fontSize="sm" color="gray.700">
                        {item.precoTortaP > 0 && (
                          <Text>
                            <strong>Pequena:</strong> R$ {item.precoTortaP.toFixed(2)}
                          </Text>
                        )}
                        {item.precoTortaG > 0 && (
                          <Text>
                            <strong>Grande:</strong> R$ {item.precoTortaG.toFixed(2)}
                          </Text>
                        )}
                      </Stack>
                    </Box>
                    {item.imagem && (
                      <Image
                        src={item.imagem}
                        alt={item.nome}
                        objectFit="cover"
                        borderRadius="xl"
                        boxShadow="md"
                        w="6.5rem"
                        h="6.5rem"
                      />
                    )}
                  </Flex>
                );
              })}
            </SimpleGrid>
          </>
        )}
      </Box>

      <NavBar />
    </Box>
  );
}

export default Home;
