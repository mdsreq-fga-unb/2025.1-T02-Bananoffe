'use client'
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
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form"
import React from "react";

interface FormValues {
  username: string;
  password: string;
}

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormValues>()
    
      const onSubmit = handleSubmit((data: any) => console.log(data))

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
        <Stack flex={"0.5"} backgroundColor={" #F1DD2F;"}>
          <Stack
            gap={"5px"}
            alignItems={"center"}
            justifyItems="center"
            padding={"30px"}
          >
            <Text textStyle={"3xl"} fontWeight={"semibold"} color={"black"}>
              Login
            </Text>
            <Text textStyle={"lg"} color={"black"}>
              Entre para continuar
            </Text>
          </Stack>
          <Separator />
          <Container padding={"0px 30px 30px 30px"}>
            <form onSubmit={onSubmit}>
              <Stack gap="4" align="flex-start" maxW="sm">
                <Field.Root invalid={!!errors.username}>
                  <Field.Label color={'black'}>Username</Field.Label>
                  <Input {...register("username")} />
                  <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.password}>
                  <Field.Label color={'black'}>Password</Field.Label>
                  <PasswordInput {...register("password")} />
                  <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                </Field.Root>

                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </Container>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Login;
