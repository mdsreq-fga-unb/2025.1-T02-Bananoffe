'use client';
import {
  Box,
  Flex,
  Stack,
  Text,
  Image,
  Separator,
  Field,
  Input,
  Container,
  Button,
  Center,
  Link,
} from "@chakra-ui/react";
import { PasswordInput } from "../../components/ui/password-input";
import { useForm } from "react-hook-form";
import React from "react";
import { useUsers } from "../../hooks/useUsers";
import { useHookFormMask } from "use-mask-input"
import { useRouter } from "next/navigation";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface FormValues {
  nome: string;
  email: string;
  senha: string;
  dataNascimento: string;
  telefone: string;
}

function Cadastro() {
  const { createUser, isLoading } = useUsers();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const registerWithMask = useHookFormMask(register);

  const onSubmit = async (data: FormValues) => {
    const dados = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      dataNascimento: data.dataNascimento || undefined,
      telefone: data.telefone,
    }
    const sucesso = await createUser(dados);

    if (sucesso) {
      router.push('/login');
    }
  };

  return (
    <Box minHeight="100vh" backgroundColor="#F1DD2F">
      <Flex height="100%">
        <Box flex="0.5" position="relative" hideBelow={'md'}>
          <Image
            src="/ImgBanoffeeCadastro.png"
            alt="Banoffee Boxes"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>

        <Stack flex={{ base: "1", md: "0.5" }} backgroundColor="#F1DD2F">
          <Stack
            gap="5px"
            alignItems="center"
            justifyItems="center"
            padding="60px 30px 0px 30px"
          >
            <Text textStyle="3xl" fontWeight="semibold" color="black">
              Criar Nova Conta
            </Text>

            <Text textStyle={"lg"} color={"black"}>
              Já tem cadastro?
              <Link ml={2} href="/login" color={"#895023"} _hover={{ textDecoration: "underline" }}>

                Login
              </Link>
            </Text>
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
          </Stack>

          <Separator size="md" />

          <Container padding="30px" width="80%">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Center>
                <Stack gap="4" width="100%" maxW="md">
                  <Field.Root invalid={!!errors.nome}>
                    <Field.Label htmlFor="nome" color="black">
                      Nome
                    </Field.Label>
                    <Input
                      variant="subtle"
                      bgColor="#D9D9D9"
                      color="black"
                      size="lg"
                      type="text"
                      placeholder="Nome e Sobrenome"
                      {...register("nome", {
                        required: "Nome é obrigatório",
                        minLength: {
                          value: 3,
                          message: "Nome deve ter pelo menos 3 letras",
                        },
                        maxLength: {
                          value: 50,
                          message: "Nome muito longo",
                        },
                        validate: {
                          apenasLetras: (value) => {
                            const regex = /^(?!.* {2})[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*(?: )?$/;
                            return regex.test(value) || "Use apenas letras e espaços simples";
                          },
                          muitasRepeticoes: (value) => {
                            const texto = value.trim().replace(/\s/g, "").toLowerCase();
                            const counts = [...texto].reduce((acc, letra) => {
                              acc[letra] = (acc[letra] || 0) + 1;
                              return acc;
                            }, {} as Record<string, number>);
                            return Object.values(counts).some((qtd) => qtd > 5)
                              ? "Evite repetições excessivas"
                              : true;
                          },
                          tamanho: (value) =>
                            value.trim().length <= 50 || "Nome muito longo (máx. 50 caracteres)",
                        }
                      })}
                    />
                    <Field.ErrorText>{errors.nome?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.email}>
                    <Field.Label htmlFor="email" color="black">
                      E-mail
                    </Field.Label>
                    <Input
                      variant="subtle"
                      bgColor="#D9D9D9"
                      color="black"
                      size="lg"
                      type="email"
                      placeholder="novousuario@gmail.com"
                      {...register("email", {
                        required: "Email é obrigatório",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Email inválido",
                        },
                      })}
                    />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.senha}>
                    <Field.Label color="black">Senha</Field.Label>
                    <PasswordInput
                      variant="subtle"
                      bgColor="#D9D9D9"
                      color="black"
                      size="lg"
                      placeholder="******"
                      {...register("senha", {
                        required: "Senha é obrigatória",
                        minLength: {
                          value: 6,
                          message: "Senha deve ter pelo menos 6 caracteres",
                        },
                      })}
                      visibilityIcon={{
                        on: (
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            h="100%"
                            px={2}
                            color="black"
                            _hover={{ bg: "#D9D9D9" }}
                          >
                            <ViewOffIcon />
                          </Box>
                        ),
                        off: (
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            h="100%"
                            px={2}
                            color="black"
                            _hover={{ bg: "#D9D9D9" }}
                          >
                            <ViewIcon />
                          </Box>
                        ),
                      }}
                    />
                    <Field.ErrorText>{errors.senha?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.telefone}>
                    <Field.Label color="black">Número de Telefone</Field.Label>
                    <Input
                      variant="subtle"
                      bgColor="#D9D9D9"
                      color="black"
                      size="lg"
                      type="tel"
                      placeholder="(99)99999-9999"
                      {...registerWithMask("telefone", "(99)99999-9999", {
                        required: "Telefone é obrigatório",
                        pattern: {
                          value: /^\(\d{2}\)\d{5}-\d{4}$/,
                          message: "Formato inválido",
                        },
                      })}
                    />
                    <Field.ErrorText>{errors.telefone?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.dataNascimento}>
                    <Field.Label color="black">
                      Data de Nascimento <span style={{ fontStyle: 'italic', fontSize: '0.8em' }}>*opcional</span>
                    </Field.Label>
                    <Input
                      variant="subtle"
                      bgColor="#D9D9D9"
                      color="black"
                      size="lg"
                      type="date"
                      {...register("dataNascimento", {
                        validate: (value) => {
                          if (!value) return true; // opcional
                          const hoje = new Date();
                          const data = new Date(value);
                          const idadeMinima = 13;
                          const limite = new Date();
                          limite.setFullYear(limite.getFullYear() - idadeMinima);

                          if (data > hoje) return "Data no futuro não é válida";
                          if (data > limite) return `É necessário ter pelo menos ${idadeMinima} anos`;

                          return true;
                        },
                      })}
                    />
                    <Field.ErrorText>{errors.dataNascimento?.message}</Field.ErrorText>
                  </Field.Root>

                  <Button
                    type="submit"
                    bgColor="#895023"
                    color="white"
                    size="md"
                    width="100%"
                    alignSelf="center"
                    loading={isLoading}
                    loadingText="Criando conta..."
                    _hover={{ bgColor: "#6a3d1a" }}
                    disabled={!isValid}
                  >
                    CRIAR CONTA
                  </Button>
                </Stack>
              </Center>
            </form>
          </Container>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Cadastro;
