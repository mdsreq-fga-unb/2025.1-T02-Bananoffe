'use client';
import { Box, Heading, Text, VStack, Image, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <Flex
      minH="100vh"
      direction={{ base: 'column', md: 'row' }}
      bgGradient="linear(to-br, yellow.100, orange.200)"
    >
      <Box flex="1" display="flex" alignItems="center" justifyContent="center" p={8}>
        <VStack gap={6} align="start" maxW="lg">
          <Heading as="h1" size="2xl" >
            Bem-vindo à Plataforma
          </Heading>
          <Text fontSize="lg" >
                Aqui vamos fazer todo resto ai, pagina inicial so de modelo.
          </Text>
        </VStack>
      </Box>

      <Box flex="1" display={{ base: 'none', md: 'block' }}>
        <Image
          src="/ImgBanoffeeLogin.png"
          alt="Imagem decorativa"
          objectFit="cover"
          w="100%"
          h="100vh"
        />
      </Box>
    </Flex>
  );
}
