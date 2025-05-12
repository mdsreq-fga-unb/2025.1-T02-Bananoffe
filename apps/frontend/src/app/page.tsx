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
  SimpleGrid,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";

function Home() {
  const { products, getProducts, isLoading } = useProducts();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descricao.toLowerCase().includes(searchTerm.toLowerCase())
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
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
            {filteredProducts.map((product) => (
              <Flex
                key={product._id}
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
                    {product.nome}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    {product.descricao}
                  </Text>
                  <Stack gap={0.5} fontSize="sm" color="gray.700">
                    {product.precoTortaP > 0 && (
                      <Text>
                        <strong>Torta Pequena:</strong> R$ {product.precoTortaP.toFixed(2)}
                      </Text>
                    )}
                    {product.precoTortaG > 0 && (
                      <Text>
                        <strong>Torta Grande:</strong> R$ {product.precoTortaG.toFixed(2)}
                      </Text>
                    )}
                    {product.precoPedacoP > 0 && (
                      <Text>
                        <strong>Pedaço Pequeno:</strong> R$ {product.precoPedacoP.toFixed(2)}
                      </Text>
                    )}
                    {product.precoPedacoG > 0 && (
                      <Text>
                        <strong>Pedaço Grande:</strong> R$ {product.precoPedacoG.toFixed(2)}
                      </Text>
                    )}
                  </Stack>
                </Box>

                {product.imagem && (
                  <Image
                    src={product.imagem}
                    alt={product.nome}
                    objectFit="cover"
                    borderRadius="xl"
                    boxShadow="md"
                    w="6.5rem"
                    h="6.5rem"
                  />
                )}
              </Flex>
            ))}
          </SimpleGrid>
        )}
      </Box>

      <NavBar />
    </Box>
  );
}

export default Home;
