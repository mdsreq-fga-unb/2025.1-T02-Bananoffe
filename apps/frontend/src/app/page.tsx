import { Box, Flex, Heading, Button, Text, VStack, StackProps, Stack, AbsoluteCenter, Center } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, yellow.50, orange.50)"
      p={8}
      display="grid"
      gridTemplateRows="auto 1fr auto"
      gap={16}
      backgroundColor={" #F1DD2F"}
    >
      {/* Header */}
      <Flex justify="space-between" align="center">
        <Heading size="lg" color="orange.500">
          Bananoffe
        </Heading>
      </Flex>

      {/* Main Content */}
      <VStack
        gap={8}
        justify="center"
        textAlign="center"
        maxW="2xl"
        mx="auto"
      >
        <Box>
          <Heading
            as="h1"
            size="2xl"
            fontWeight="extrabold"
            color="orange.600"
            mb={4}
          >
            Bem-vindo ao Bananoffe
          </Heading>
        </Box>

        <Stack gap={6} w="full" direction="row" gapX={8}>
            <Button
              colorScheme="orange"
              size="lg"
              w={{ base: "full", sm: "auto" }}
              backgroundColor="orange.600"
              _hover={{ backgroundColor: "orange.700" }}
            >
              <a href="/login">Login</a>
            </Button>
            <Button
              colorScheme="orange"
              size="lg"
              w={{ base: "full", sm: "auto" }}
              backgroundColor="orange.600"
              _hover={{ backgroundColor: "orange.700" }}
            >
              <a href="/login">Login</a>
            </Button>
        </Stack>
      </VStack>

      {/* Footer */}
      <Text textAlign="center" color="orange.600" fontSize="sm">
        © {new Date().getFullYear()} Bananoffe - Todos os direitos reservados
      </Text>
    </Box>
  );
}