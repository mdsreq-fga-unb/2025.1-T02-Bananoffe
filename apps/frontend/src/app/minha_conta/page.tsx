"use client";

import {
  Box,
  Stack,
  Text,
  Container,
  Button,
  Input,
  Heading,
  Flex,
  Image,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from '@chakra-ui/form-control';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/User.type";
import NavBar from "@/components/NavBar";

export default function MinhaConta() {
  const { user, updateUser, isLoading } = useAuth();
  const [changedFields, setChangedFields] = useState<Partial<User>>({});
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const handleInputChange = (field: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setChangedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!user || Object.keys(changedFields).length === 0) return;
    try {
      await updateUser(changedFields);
      setChangedFields({});
    } catch (error) {}
  };

  if (!user) return null;

  return (
    <Box minH="100vh" bg="#F1DD2F" display="flex" flexDirection="column">
      <Container maxW="lg" flex="1" py={10}>
        <Stack gap={8} boxShadow="lg" p={8} borderRadius="2xl" bg="white">
          <Flex justify="space-between" align="center">
            <Link href="/">
              <Button
                variant="ghost"
                color="#895023"
                size="md"
                _hover={{ bg: "transparent", textDecoration: "underline" }}
              >
                Voltar
              </Button>
            </Link>
            <Image src="/logoBAnanoffe.jpg" alt="Logo" boxSize="80px" />
          </Flex>

          <Stack textAlign="center" gap={1}>
            <Heading fontSize="2xl" color="#895023">
              Minha Conta
            </Heading>
            <Text color="gray.600">Atualize seus dados</Text>
          </Stack>

          <Stack gap={5}>
            <FormControl>
              <FormLabel color="black">Nome</FormLabel>
              <Input
                bg="#D9D9D9"
                color="black"
                size="lg"
                defaultValue={user.nome || ""}
                onChange={handleInputChange("nome")}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="black">Telefone</FormLabel>
              <Input
                bg="#D9D9D9"
                color="black"
                size="lg"
                defaultValue={user.telefone || ""}
                onChange={handleInputChange("telefone")}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="black">Data de Nascimento</FormLabel>
              <Input
                type="date"
                bg="#D9D9D9"
                color="black"
                size="lg"
                defaultValue={user.dataNascimento?.split("T")[0] || ""}
                onChange={handleInputChange("dataNascimento")}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="black">Nova Senha</FormLabel>
              <Input
                type="password"
                bg="#D9D9D9"
                color="black"
                size="lg"
                placeholder="Deixe em branco para manter a atual"
                onChange={handleInputChange("senha")}
              />
            </FormControl>

            <Button
              bgColor="#895023"
              color="white"
              size="lg"
              _hover={{ bgColor: "#6a3d1a" }}
              loading={isLoading}
              loadingText="Salvando..."
              disabled={Object.keys(changedFields).length === 0}
              onClick={handleSubmit}
            >
              Salvar Alterações
            </Button>
          </Stack>
        </Stack>
      </Container>
      <NavBar />
    </Box>
  );
}
