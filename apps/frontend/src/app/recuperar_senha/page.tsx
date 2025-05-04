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
  PinInput,
  Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import { useResetPassword } from "@/hooks/useResetPassword";

interface FormValues {
  email: string;
  novaSenha: string;
}

function RecuperarSenha() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [codigoDigitado, setCodigoDigitado] = useState<string[]>([]);
  const { sendResetCode, resetPassword, validateCode } = useResetPassword();
  const [email, setEmail] = useState('');
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({
    mode: "onChange",
  });

  const handleEnviarCodigo = async (data: { email: string }) => {
    setIsLoading(true);
    const sucesso = await sendResetCode(data.email);
    if (sucesso) {
      setEmail(data.email);
      setStep(2);
      setIsLoading(false);
    }
    if (!sucesso) {
      setIsLoading(false);
    }
  };

  const handleValidarCodigo = async () => {
    if (codigoDigitado.length !== 6) {
      toaster.create({
        title: 'Código incompleto',
        description: 'Preencha os 6 dígitos corretamente.',
        type: 'error',
      });
      return;
    }

    setIsLoading(true);
    const sucesso = await validateCode(email, codigoDigitado.join(''));
    setIsLoading(false);

    if (sucesso) {
      setStep(3);
    }
  };


  const handleRedefinirSenha = async (data: { novaSenha: string }) => {
    const sucesso = await resetPassword({
      email,
      codigo: codigoDigitado.join(''),
      novaSenha: data.novaSenha,
    });
    if (sucesso) {
      router.push('/login');
    }
  };

  return (
    <Box height="100vh">
      <Flex height="100%">
        <Box flex="0.5" position="relative" hideBelow={'md'}>
          <Image
            src="/ImgBanoffeeEsqueciSenha.png"
            alt="Banoffee Dessert"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>
        <Stack flex={{ base: "1", md: "0.5" }} backgroundColor={"#F1DD2F"}>
          <Stack gap="5" alignItems="center" padding="60px 30px 30px 30px">
            {step === 1 && (
              <>
                <Text textStyle="3xl" fontWeight="semibold" color="black" textAlign="center">
                  Redefina sua senha:
                </Text>
                <Text textStyle="lg" color="black" textAlign="center" maxW="400px">
                  Digite o endereço de e-mail que você usa no site para enviarmos um código.
                </Text>
                <Flex justify="space-between" gap={100}>
                  <Link
                    href="/login"
                    color="#895023"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/cadastro"
                    color="#895023"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Cadastre-se
                  </Link>
                </Flex>
              </>
            )}

            {step === 2 && (
              <>
                <Text textStyle="3xl" fontWeight="semibold" color="black" textAlign="center">
                  Digite o código:
                </Text>
                <Text textStyle="md" color="black" textAlign="center" mt="2" maxW="400px">
                  Um código foi enviado para seu e-mail. Insira-o abaixo para continuar.
                </Text>

                <Center mt="6">
                  <PinInput.Root
                    value={codigoDigitado}
                    onValueChange={(details) => setCodigoDigitado(details.value)}
                    gap="10px"
                  >
                    <PinInput.HiddenInput />
                    <PinInput.Control>
                      {[...Array(6)].map((_, index) => (
                        <PinInput.Input
                          key={index}
                          index={index}
                          style={{
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: '8px',
                            border: '1px solid black',
                            width: '50px',
                            height: '60px',
                            fontSize: '2xl',
                            textAlign: 'center'
                          }}
                        />
                      ))}
                    </PinInput.Control>
                  </PinInput.Root>
                </Center>
              </>
            )}

            {step === 3 && (
              <>
                <Text textStyle="3xl" fontWeight="semibold" color="black" textAlign="center">
                  Nova senha:
                </Text>
                <Text textStyle="lg" color="black" textAlign="center" maxW="400px">
                  Digite sua nova senha.
                </Text>
              </>
            )}
          </Stack>

          <Separator size="md" />

          <Container padding="30px" width="80%">
            {step === 1 && (
              <form onSubmit={handleSubmit(handleEnviarCodigo)}>
                <Center>
                  <Stack gap="4" width="100%" maxW="md">
                    <Field.Root invalid={!!errors.email}>
                      <Field.Label htmlFor="email" color="black">
                        Endereço de e-mail:
                      </Field.Label>
                      <Input
                        variant="subtle"
                        bgColor="#FFFFFF"
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

                    <Button
                      type="submit"
                      bgColor="#895023"
                      color="white"
                      size="md"
                      width="100%"
                      loading={isLoading}
                      loadingText="Enviando..."
                      disabled={!isValid}
                      mt={4}
                    >
                      ENVIAR CÓDIGO
                    </Button>
                  </Stack>
                </Center>
              </form>
            )}

            {step === 2 && (
              <Center mt={4}>
                <Button
                  onClick={handleValidarCodigo}
                  bgColor="#895023"
                  color="white"
                  size="md"
                  width="100%"
                  loading={isLoading}
                  mt={4}
                >
                  VALIDAR CÓDIGO
                </Button>
              </Center>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit(handleRedefinirSenha)}>
                <Center>
                  <Stack gap="4" width="100%" maxW="md">
                    <Field.Root>
                      <Field.Label color="black">Nova senha:</Field.Label>
                      <Input
                        variant="subtle"
                        bgColor="#FFFFFF"
                        color="black"
                        size="lg"
                        type="password"
                        {...register("novaSenha", {
                          required: "Senha é obrigatória",
                          minLength: {
                            value: 6,
                            message: "A senha deve ter pelo menos 6 caracteres",
                          },
                        })}
                      />
                    </Field.Root>

                    <Button
                      type="submit"
                      bgColor="#895023"
                      color="white"
                      size="md"
                      width="100%"
                      loading={isLoading}
                      mt={4}
                    >
                      REDEFINIR SENHA
                    </Button>
                  </Stack>
                </Center>
              </form>
            )}
          </Container>
        </Stack>
      </Flex>
    </Box>
  );
}

export default RecuperarSenha;
