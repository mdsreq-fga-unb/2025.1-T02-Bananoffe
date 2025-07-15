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
import { PasswordInput } from "../../components/ui/password-input";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface FormValues {
  email: string;
  password: string;
}

function Login() {
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    await login(data.email, data.password);
    // o redirecionamento acontece automaticamente no contexto após sucesso
  };

  return (
    <Box minHeight="100vh" backgroundColor="#F1DD2F">
      <Flex height="100%">
        <Box flex="0.5" position="relative" hideBelow="md">
          <Image
            src="/ImgBanoffeeLogin.png"
            alt="Banoffee"
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
              Login
            </Text>
            <Text textStyle="lg" color="black">
              Entre para continuar
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
                  <Field.Root invalid={!!errors.email}>
                    <Field.Label htmlFor="email" color="black">
                      Email
                    </Field.Label>
                    <Input
                      variant="subtle"
                      bgColor="#D9D9D9"
                      color="black"
                      size="lg"
                      type="email"
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

                  <Field.Root invalid={!!errors.password}>
                    <Field.Label color="black">Senha</Field.Label>
                    <PasswordInput
                      variant="subtle"
                      bgColor="#D9D9D9"
                      color="black"
                      size="lg"
                      {...register("password", {
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
                    <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                  </Field.Root>

                  <Flex justify="space-between" width="100%" fontSize="sm">
                    <Link
                      href="/recuperar_senha"
                      color="#895023"
                      _hover={{ textDecoration: "underline" }}
                    >
                      Esqueceu a senha?
                    </Link>
                    <Text color="black">
                      Não possui cadastro?{" "}
                      <Link
                        href="/cadastro"
                        color="#895023"
                        _hover={{ textDecoration: "underline" }}
                      >
                        Cadastre-se
                      </Link>
                    </Text>
                  </Flex>

                  <Button
                    type="submit"
                    bgColor="#895023"
                    color="white"
                    size="md"
                    width="40%"
                    alignSelf="center"
                    loading={isLoading}
                    loadingText="Entrando..."
                    _hover={{ bgColor: "#6a3d1a" }}
                    disabled={!isValid}
                    mt={4}
                  >
                    Entrar
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

export default Login;
