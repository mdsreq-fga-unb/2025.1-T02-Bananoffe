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
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface FormValues {
  email: string;
  password: string;
}
interface LoginResponse {
  token: string;
  role: 'ADMIN' | 'CLIENTE';
}

function Login() {
  const router = useRouter();
  // const toast = useToast(); 
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();


  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Chamada à API de login
      const response = await axios.post<LoginResponse>('/api/login', data);
      
      // Armazenar o token (pode ser localStorage, cookie, etc.)
      localStorage.setItem('authToken', response.data.token);
      
      // Redirecionar de acordo com o role
      if (response.data.role === 'ADMIN') {
        router.push('/admin/dashboard');
      } else {
        router.push('/cliente/home');
      }
      
      // Feedback visual para o usuário
      // toast({
      //   title: 'Login realizado com sucesso!',
      //   status: 'success',
      //   duration: 3000,
      //   isClosable: true,
      // });
      
    } catch (error) {
      console.error('Erro no login:', error);
      
      // Exibir mensagem de erro genérica ou específica da API
      let errorMessage = 'Erro ao fazer login. Tente novamente.';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      
      // toast({
      //   title: 'Erro no login',
      //   description: errorMessage,
      //   status: 'error',
      //   duration: 5000,
      //   isClosable: true,
      // });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Box height="100vh">
      <Flex height="100%">
        {/* Image Section */}
        <Box flex="0.5" position="relative">
          <Image
            src="/ImgBanoffeeLogin.png"
            alt="Banoffee"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>
        <Stack flex={"0.5"} backgroundColor={" #F1DD2F"}>
          <Stack
            gap={"5px"}
            alignItems={"center"}
            justifyItems="center"
            padding={"60px 30px 30px 30px"}
          >
            <Text textStyle={"3xl"} fontWeight={"semibold"} color={"black"}>
              Login
            </Text>
            <Text textStyle={"lg"} color={"black"}>
              Entre para continuar
            </Text>
          </Stack>
          <Separator size="md" />
          <Container padding={"30px 30px 30px 30px"} width={"80%"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Center>
                <Stack gap="4" width="100%">
                  <Field.Root invalid={!!errors.email}>
                    <Field.Label htmlFor="email" color={"black"}>Email</Field.Label>
                    <Input
                      variant="subtle"
                      bgColor=" #D9D9D9"
                      color={"black"}
                      size="lg"
                      type="email"
                      {...register("email", {
                        required: "Email é obrigatório",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i,
                          message: "Email inválido",
                        },
                      })}
                    />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.password}>
                    <Field.Label color={"black"}>Senha</Field.Label>
                    <PasswordInput
                      variant="subtle"
                      bgColor=" #D9D9D9"
                      color={"black"}
                      size="lg"
                      {...register("password", {
                        required: "Senha é obrigatória",
                        minLength: {
                          value: 5,
                          message: "Senha deve ter pelo menos 5 caracteres",
                        },
                      })}
                    />
                    <Field.ErrorText>
                      {errors.password?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Button
                    type="submit"
                    bgColor={"#895023"}
                    color={"white"}
                    size="md"
                    width={"40%"}
                    alignSelf={"center"}
                    loading={isLoading}
                    loadingText="Entrando..."
                    _hover={{ bgColor: "#6a3d1a" }}
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
