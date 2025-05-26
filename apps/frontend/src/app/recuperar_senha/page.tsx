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
  InputGroup,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import { useResetPassword } from "@/hooks/useResetPassword";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface FormValues {
  email: string;
  novaSenha: string;
  confirmarSenha: string;
}

function RecuperarSenha() {
  const [step, setStep] = useState(1);
  const [codigoDigitado, setCodigoDigitado] = useState<string[]>([]);
  const { sendResetCode, resetPassword, validateCode, isLoading } = useResetPassword();
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({
    mode: "onChange",
  });

  const handleEnviarCodigo = async (data: { email: string }) => {
    const sucesso = await sendResetCode(data.email);
    if (sucesso) {
      setEmail(data.email);
      setStep(2);
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

    const sucesso = await validateCode(email, codigoDigitado.join(''));
    if (sucesso) {
      setStep(3);
    }
  };

  const handleRedefinirSenha = async (data: { novaSenha: string; confirmarSenha: string }) => {
    if (data.novaSenha !== data.confirmarSenha) {
      toaster.create({
        title: "As senhas não coincidem",
        description: "Verifique e tente novamente.",
        type: "error",
      });
      return;
    }

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




          </Stack>


          <Container padding="30px" width="80%">
            {step === 1 && (

              <form onSubmit={handleSubmit(handleEnviarCodigo)}>
                <Text textStyle="3xl" fontWeight="semibold" color="black" textAlign="center">
                  Redefinição de Senha
                </Text>
                <Text textStyle="lg" color="black" textAlign="center" maxW="400px">
                  Digite o endereço de e-mail que você usa no site para enviarmos um código.
                </Text>
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
                      Enviar Código
                    </Button>
                  </Stack>
                </Center>
              </form>
            )}

            {step === 2 && (
              <>
                <Text textStyle="3xl" fontWeight="semibold" color="black" textAlign="center">
                  Redefinição de Senha
                </Text>
                <Text textStyle="3xl" fontWeight="semibold" color="black" textAlign="center">
                  Digite o código:
                </Text>
                <Text textStyle="md" color="black" textAlign="center" mt="2" maxW="400px">
                  Um código foi enviado para seu e-mail. Insira-o abaixo para continuar.
                </Text>

                <Center mt="5">
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
                    <Button
                      onClick={handleValidarCodigo}
                      bgColor="#895023"
                      color="white"
                      size="md"
                      width="100%"
                      loading={isLoading}
                      mt={4}
                    >
                      Validar Código
                    </Button>
                  </PinInput.Root>

                </Center>
              </>
            )}

            {step === 3 && (
              <>
                <Text textStyle="3xl" fontWeight="semibold" color="black" textAlign="center">
                  Redefinição de Senha
                </Text> 
                <form onSubmit={handleSubmit(handleRedefinirSenha)}>
                <Center>
                  <Stack gap="4" width="100%" maxW="md">
                    <Field.Root invalid={!!errors.novaSenha}>
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
                      <Field.ErrorText>{errors.novaSenha?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.confirmarSenha}>
                      <Field.Label color="black">Confirmar senha:</Field.Label>
                      <Input
                        variant="subtle"
                        bgColor="#FFFFFF"
                        color="black"
                        size="lg"
                        type="password"
                        {...register("confirmarSenha", {
                          required: "Confirme sua senha",
                          validate: (value, formValues) =>
                            value === formValues.novaSenha || "As senhas não coincidem",
                        })}
                      />
                      <Field.ErrorText>{errors.confirmarSenha?.message}</Field.ErrorText>
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
                      Redefinir Senha
                    </Button>
                  </Stack>
                </Center>
              </form>
              </>
            )}
          </Container>
        </Stack>
      </Flex>
    </Box>
  );
}
export default RecuperarSenha;
