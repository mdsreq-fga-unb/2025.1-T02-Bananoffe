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
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";

interface FormValues {
  email: string;
}

function RecuperarSenha() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Chamar a API para enviar o link de redefinição de senha
      await axios.post('/api/auth/recuperar-senha', { email: data.email });
      
      // Mostrar mensagem de sucesso
      toaster.create({
        title: 'Link enviado com sucesso',
        description: 'Verifique seu e-mail para redefinir sua senha.',
        type: 'success',
      });
      
      // Redirecionar para a página de login após alguns segundos
      setTimeout(() => {
        router.push('/login');
      }, 3000);
      
    } catch (error) {
      // Tratar erros
      toaster.create({
        title: 'Erro ao enviar link',
        description: 'Verifique se o e-mail está correto e tente novamente.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box height="100vh">
      <Flex height="100%">
        <Box flex="0.5" position="relative">
          <Image
            src="/ImgBanoffeeEsqueciSenha.png" // Imagem do produto como mostrado na sua referência
            alt="Banoffee Dessert"
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
            <Text textStyle={"3xl"} fontWeight={"semibold"} color={"black"} textAlign="center">
              Redefina sua senha:
            </Text>
            <Text textStyle={"lg"} color={"black"} textAlign="center" maxW="400px">
              Digite o endereço de e-mail que você usa no site para enviarmos um link de redefinição de senha.
            </Text>
          </Stack>
          <Separator size="md" />
          <Container padding={"30px 30px 30px 30px"} width={"80%"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Center>
                <Stack gap="4" width="100%" maxW="md">
                  <Field.Root invalid={!!errors.email}>
                    <Field.Label htmlFor="email" color={"black"}>
                      Endereço de e-mail:
                    </Field.Label>
                    <Input
                      variant="subtle"
                      bgColor="#FFFFFF"
                      color={"black"}
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

                  <Button
                    type="submit"
                    bgColor={"#895023"}
                    color={"white"}
                    size="md"
                    width={"100%"}
                    alignSelf={"center"}
                    loading={isLoading}
                    loadingText="Enviando..."
                    _hover={{ bgColor: "#6a3d1a" }}
                    disabled={!isValid}
                    mt={4}
                  >
                    ENVIAR
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

export default RecuperarSenha;