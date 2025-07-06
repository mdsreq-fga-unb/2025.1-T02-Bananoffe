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
  InputGroup,
  Dialog,
  Portal,
  Field,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useUsers } from "@/hooks/useUsers";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/User.type";
import NavBar from "@/components/NavBar";
import { useSession } from "next-auth/react";

export default function MinhaConta() {
  const { user, logout } = useAuth();
  const { deleteMyAccount, verificarSenha, getUser } = useUsers();
  const [changedFields, setChangedFields] = useState<Partial<User>>({});
  const router = useRouter();
  const { updateUser } = useUsers();
  const [telefoneFormatado, setTelefoneFormatado] = useState(user?.telefone || "");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  useEffect(() => {
    if (session === undefined || !user) return;

    const fetchUsuario = async () => {
      const userData = await getUser(user.id);
      if (userData !== null) {
        setNome(userData.nome || "");
        setTelefoneFormatado(userData.telefone || "");
        setDataNascimento(userData.dataNascimento?.split("T")[0] || "");
      }
    };

    fetchUsuario();
  }, [session, user, getUser]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  function formatPhoneVisual(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const match = digits.match(/^(\d{2})(\d{5})(\d{0,4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return digits;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  }

  const handleDeleteAccount = async () => {
    setErro("");
    setIsLoading(true);
    try {
      const resultado = await verificarSenha(senha);
      console.log("Resultado da verificação de senha:", resultado);

      if (resultado.message === "Senha correta") {
        await deleteMyAccount();
      } else {
        setErro("Senha incorreta");
      }
    } catch (err) {
      console.error("Erro ao excluir conta:", err);
      setErro("Erro ao excluir conta. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
      setSenha("");
    }
  };

  const handleInputChange = (field: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setChangedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!user || Object.keys(changedFields).length === 0) return;
    console.log("Campos alterados:", changedFields);
    const sucesso = await updateUser({ ...changedFields, id: user.id });

    if (sucesso) {
      setChangedFields({});
    }
  };

  return (
    <Box minH="100vh" bg="#F1DD2F" display="flex" flexDirection="column">
      <Container maxW="lg" flex="1" py={10} pb="120px">
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
                defaultValue={nome}
                onChange={handleInputChange("nome")}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="black">Telefone</FormLabel>
              <Input
                bg="#D9D9D9"
                color="black"
                size="lg"
                value={formatPhoneVisual(telefoneFormatado)}
                placeholder="(XX) XXXXX-XXXX"

                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  setTelefoneFormatado(raw);
                  setChangedFields((prev) => ({ ...prev, telefone: raw }));
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="black">Data de Nascimento</FormLabel>
              <Input
                type="date"
                bg="#D9D9D9"
                color="black"
                size="lg"
                defaultValue={dataNascimento}
                onChange={handleInputChange("dataNascimento")}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="black">Nova Senha</FormLabel>
              <InputGroup
                endElement={
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    _hover={{ bg: "transparent" }}
                  >
                    {mostrarSenha ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                }
              >
                <Input
                  type={mostrarSenha ? "text" : "password"}
                  bg="#D9D9D9"
                  color="black"
                  size="lg"
                  placeholder="Deixe em branco para manter a atual"
                  onChange={handleInputChange("senha")}
                />
              </InputGroup>
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
            <Button
              bgColor="#895023"
              color="white"
              size="lg"
              _hover={{ bgColor: "#6a3d1a" }}
              loading={isLoading}
              loadingText="Salvando..."
              onClick={handleLogout}
            >
              Sair
            </Button>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button
                  bgColor="red.700"
                  color="white"
                  size="lg"
                  _hover={{ bgColor: "red.900" }}
                  loading={isLoading}
                  loadingText="Carregando..."
                >
                  Apagar Conta
                </Button>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Excluir Conta</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body pb="4">
                      <Stack gap="4">
                        <Field.Root>
                          <Field.Label>Digite sua Senha para continuar</Field.Label>
                          <Input
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                          />
                          {erro && (
                            <Text color={"red.100"}>Senha Incorreta</Text>
                          )}
                        </Field.Root>
                      </Stack>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Cancelar</Button>
                      </Dialog.ActionTrigger>
                      <Button
                        bg={"red.200"}
                        _hover={{ bgColor: "red.400" }}
                        onClick={handleDeleteAccount}
                        loading={isLoading}
                        loadingText="Excluindo..."
                        disabled={!senha || senha.length < 6}
                      >
                        Excluir Conta
                      </Button>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          </Stack>
        </Stack>
      </Container>
      <NavBar />
    </Box>
  );
}
