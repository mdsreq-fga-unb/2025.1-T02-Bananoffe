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
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import React from "react";
import { useUsers } from "@/hooks/useUsers";
import { useHookFormMask  } from "use-mask-input"

interface FormValues {
  nome: string;
  email: string;
  senha: string;
  dataNascimento: string;
  telefone: string;
}

function Cadastro() {
  const { createUser, isLoading } = useUsers();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const registerWithMask = useHookFormMask(register);

  const onSubmit = async (data: FormValues) => {
    const sucesso = await createUser({
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      dataNascimento: data.dataNascimento || undefined,
      telefone: data.telefone,
    });

    if (sucesso) {
      console.log("Usuário criado com sucesso!");
    }
  };

  return (
    <Box height="100vh">
      <Flex height="100%">
        <Box flex="0.5" position="relative">
          <Image
            src="/ImgBanoffeeCadastro.png"
            alt="Banoffee Boxes"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>

        <Stack flex="0.5" backgroundColor="#F1DD2F">
          <Stack
            gap="5px"
            alignItems="center"
            justifyItems="center"
            padding="60px 30px 30px 30px"
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
                      placeholder="Primeiro Nome"
                      {...register("nome", { required: "Nome é obrigatório" })}
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
                      {...registerWithMask("telefone", '(99)99999-9999', {
                        required: true
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
                      {...register("dataNascimento")}
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
