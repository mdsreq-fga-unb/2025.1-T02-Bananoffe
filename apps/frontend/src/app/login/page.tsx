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
import React from "react";

interface FormValues {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data: any) => console.log(data));

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
            <form onSubmit={onSubmit}>
              <Center>
                <Stack gap="4">
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
                    color={"black"}
                    size="md"
                    width={"40%"}
                    alignSelf={"center"}
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
