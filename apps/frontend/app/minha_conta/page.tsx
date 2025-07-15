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
  Center,
  Spinner,
} from "@chakra-ui/react";
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useUsers } from "../../hooks/useUsers";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { User } from "../../types/User.type";
import NavBar from "../../components/NavBar";
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
  const [isLoading, setIsLoading] = useState(true);
  const [nome, setNome] = useState(user?.nome || "");
  const [dataNascimento, setDataNascimento] = useState(user?.dataNascimento?.split("T")[0] || "");
  const [erros, setErros] = useState<{ [K in keyof User]?: string }>({});

  useEffect(() => {
    if (session === undefined || !user) return;

    const fetchUsuario = async () => {
      try {
        const userData = await getUser(user.id);
        if (userData !== null) {
          setNome(userData.nome || "");
          setTelefoneFormatado(userData.telefone || "");
          setDataNascimento(userData.dataNascimento?.split("T")[0] || "");
        }
      } catch (err) {
        console.error("Erro ao buscar usuário", err);
      } finally {
        setIsLoading(false);
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

    const erro = validarCampo(field, value);
    setErros((prev) => ({ ...prev, [field]: erro || undefined }));

    switch (field) {
      case "nome":
        setNome(value);
        break;
      case "dataNascimento":
        setDataNascimento(value);
        break;
      case "senha":
        setSenha(value);
        break;
    }

    setChangedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!user || Object.keys(changedFields).length === 0) return;
    const sucesso = await updateUser({ ...changedFields, id: user.id });

    if (sucesso) {
      setChangedFields({});
    }
  };

  const validarCampo = (campo: keyof User, valor: string): string | null => {
    switch (campo) {
      case "nome":
        if (!valor.trim()) return "Nome é obrigatório";
        if (valor.length < 3) return "Nome deve ter pelo menos 3 letras";
        if (valor.length > 50) return "Nome muito longo";
        if (!/^(?!.* {2})[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*(?: )?$/.test(valor))
          return "Use apenas letras e espaços simples";

        const texto = valor.trim().replace(/\s/g, "").toLowerCase();
        const counts = [...texto].reduce((acc, letra) => {
          acc[letra] = (acc[letra] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        if (Object.values(counts).some((qtd) => qtd > 5))
          return "Evite repetições excessivas";

        return null;

      case "senha":
        if (valor && valor.length < 6)
          return "Senha deve ter pelo menos 6 caracteres";
        return null;

      case "dataNascimento":
        if (!valor) return null; // opcional
        const hoje = new Date();
        const data = new Date(valor);
        const idadeMinima = 13;
        const limite = new Date();
        limite.setFullYear(limite.getFullYear() - idadeMinima);

        if (data > hoje) return "Data no futuro não é válida";
        if (data > limite) return `É necessário ter pelo menos ${idadeMinima} anos`;
        return null;

      default:
        return null;
    }
  };

  const houveMudanca = (): boolean => {
    if (!user) return false;

    const normalizarTelefone = (t: string) => t.replace(/\D/g, ""); // remove tudo que não for dígito

    const nomeAlterado = nome !== user.nome;
    const dataNascimentoAlterado = dataNascimento !== (user.dataNascimento?.split("T")[0] || "");
    const telefoneAlterado = normalizarTelefone(telefoneFormatado) !== normalizarTelefone(user.telefone || "");
    const senhaInformada = !!changedFields.senha && changedFields.senha.length > 0;

    return nomeAlterado || dataNascimentoAlterado || telefoneAlterado || senhaInformada;
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

          <> {isLoading === true ? (
            <Center py={10}>
              <Spinner size="lg" color="#895023" />
            </Center>
          ) : (
            <Stack gap={5}>
              <Stack gap={5} align="stretch">
                {/* Nome */}
                <FormControl isInvalid={!!erros.nome}>
                  <FormLabel color="black">Nome</FormLabel>
                  <Input
                    value={nome}
                    onChange={handleInputChange("nome")}
                    placeholder="Nome e Sobrenome"
                    bg="#D9D9D9"
                    color="black"
                    size="lg"
                    type="text"
                    variant="subtle"
                    borderColor={erros.nome ? "red.500" : "gray.300"}
                  />
                  <FormErrorMessage color="red">{erros.nome}</FormErrorMessage>
                </FormControl>

                {/* Telefone */}
                <FormControl isInvalid={!!erros.telefone}>
                  <FormLabel color="black">Telefone</FormLabel>
                  <Input
                    bg="#D9D9D9"
                    color="black"
                    size="lg"
                    value={formatPhoneVisual(telefoneFormatado)}
                    placeholder="(XX) XXXXX-XXXX"
                    variant="subtle"
                    borderColor={erros.telefone ? "red.500" : "gray.300"}

                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      setTelefoneFormatado(raw);
                      setChangedFields((prev) => ({ ...prev, telefone: raw }));
                    }}
                  />
                  <FormErrorMessage color="red">{erros.telefone}</FormErrorMessage>
                </FormControl>

                {/* Data de nascimento */}
                <FormControl isInvalid={!!erros.dataNascimento}>
                  <FormLabel color="black">Data de Nascimento</FormLabel>
                  <Input
                    type="date"
                    bg="#D9D9D9"
                    color="black"
                    size="lg"
                    value={dataNascimento}
                    onChange={handleInputChange("dataNascimento")}
                    variant="subtle"
                    borderColor={erros.dataNascimento ? "red.500" : "gray.300"}
                  />
                  <FormErrorMessage color="red">{erros.dataNascimento}</FormErrorMessage>
                </FormControl>

                {/* Nova Senha */}
                <FormControl isInvalid={!!erros.senha}>
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
                      variant="subtle"
                      borderColor={erros.senha ? "red.500" : "gray.300"}
                    />
                  </InputGroup>
                  <FormErrorMessage color="red">{erros.senha}</FormErrorMessage>
                </FormControl>

                {/* Botão de envio */}
                <Button
                  bgColor="#895023"
                  color="white"
                  size="lg"
                  _hover={{ bgColor: "#6a3d1a" }}
                  loading={isLoading}
                  loadingText="Salvando..."
                  disabled={!houveMudanca() || Object.values(erros).some(Boolean)}
                  onClick={handleSubmit}
                >
                  Salvar Alterações
                </Button>
              </Stack>
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
          )}
          </>
        </Stack>
      </Container>
      <NavBar />
    </Box>
  );
}
