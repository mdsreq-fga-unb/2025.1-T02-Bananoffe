"use client";
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
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface FormValues {
  nome: string;
  email: string;
  senha: string;
  dataNascimento: string;
  telefone: string;
}

function Cadastro() {
  const { signup, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    await signup(data.nome, data.email, data.senha, data.dataNascimento, data.telefone);
  };

  return (
    <Box height="100vh">
      <Flex height="100%">
        <Box flex="0.5" position="relative">
          <Image
            src="/ImgBanoffeeCadastro.png" // Imagem para a página de cadastro
            alt="Banoffee Boxes"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>
        <Stack flex={"0.5"} backgroundColor={"#F1DD2F"}>
          <Stack
            gap={"5px"}
            alignItems={"center"}
            justifyItems="center"
            padding={"60px 30px 30px 30px"}
          >
            <Text textStyle={"3xl"} fontWeight={"semibold"} color={"black"}>
              Criar Nova Conta
            </Text>
            <Text textStyle={"lg"} color={"black"}>
              Já tem cadastro?
              <Link ml={2} href="/login" color={"#895023"} _hover={{ textDecoration: "underline" }}>
                Login
              </Link>
            </Text>
          </Stack>
          <Separator size="md" />
          <Container padding={"30px 30px 30px 30px"} width={"80%"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Center>
                <Stack gap="4" width="100%" maxW="md">
                  <Field.Root invalid={!!errors.nome}>
                    <Field.Label htmlFor="nome" color={"black"}>
                      Nome
                    </Field.Label>
                    <Input
                      variant="subtle"
                      bgColor="#D9D9D9"
                      color={"black"}
                      size="lg"
                      type="text"
                      placeholder="Primeiro"
                      {...register("nome", {
                        required: "Nome é obrigatório",
                      })}
                    />
                    <Field.ErrorText>{errors.nome?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.email}>
                    <Field.Label htmlFor="email" color={"black"}>
                      E-mail
                    </Field.Label>
                    <Input
                      variant="subtle"
                      bgColor="#D9D9D9"
                      color={"black"}
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
                    <Field.Label color={"black"}>Senha</Field.Label>
                    <PasswordInput
                      variant="subtle"
                      bgColor="#D9D9D9"
                      color={"black"}
                      size="lg"
                      placeholder="******"
                      {...register("senha", {
                        required: "Senha é obrigatória",
                        minLength: {
                          value: 5,
                          message: "Senha deve ter pelo menos 5 caracteres",
                        },
                      })}
                    />
                    <Field.ErrorText>
                      {errors.senha?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.telefone}>
                    <Field.Label color={"black"}>Número de Telefone</Field.Label>
                    <Input
                      variant="subtle"
                      bgColor="#D9D9D9"
                      color={"black"}
                      size="lg"
                      type="tel"
                      placeholder="61 999999999"
                      {...register("telefone", {
                        required: "Telefone é obrigatório",
                        pattern: {
                          value: /^\d{2}\s\d{8,9}$/,
                          message: "Telefone inválido. Use o formato: 61 999999999",
                        },
                      })}
                    />
                    <Field.ErrorText>
                      {errors.telefone?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.dataNascimento}>
                    <Field.Label color={"black"}>
                      Data de Nascimento <span style={{ fontStyle: 'italic', fontSize: '0.8em' }}>*opcional</span>
                    </Field.Label>
                    <Input
                      variant="subtle"
                      bgColor="#D9D9D9"
                      color={"black"}
                      size="lg"
                      type="date"
                      {...register("dataNascimento")}
                    />
                    <Field.ErrorText>
                      {errors.dataNascimento?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Button
                    type="submit"
                    bgColor={"#895023"}
                    color={"white"}
                    size="md"
                    width={"100%"}
                    alignSelf={"center"}
                    loading={isLoading}
                    loadingText="Criando conta..."
                    _hover={{ bgColor: "#6a3d1a" }}
                    disabled={!isValid}
                  >
                    ENTRAR
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
