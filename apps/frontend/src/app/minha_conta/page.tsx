// app/minha-conta/page.tsx
"use client";

import { useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  Stack,
  Text,
  Image,
  Container,
  Button,
  Input,
  Heading,
  IconButton,
  useBreakpointValue
} from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useAuth } from '../context/AuthContext';
import { User } from '@/types/User.type';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function MinhaConta() {
  const { user, updateUser, isLoading } = useAuth();
  const [changedFields, setChangedFields] = useState<Partial<User>>({});
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleInputChange = (field: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setChangedFields((prev: Partial<User>) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!user || Object.keys(changedFields).length === 0) return;
    
    try {
      await updateUser(changedFields);
      setChangedFields({});
    } catch (error) {
      // O erro já é tratado no contexto
    }
  };

  if (!user) return null;

  return (
    <Box height="100vh">
      <Flex height="100%">
        {/* Coluna da imagem (oculta em mobile) */}
        {!isMobile && (
          <Box flex="0.5" position="relative">
            <Image
              src="/ImgBanoffeeLogin.png"
              alt="Banoffee"
              objectFit="cover"
              width="100%"
              height="100%"
            />
          </Box>
        )}

        {/* Coluna do formulário */}
        <Stack flex={{ base: '1', md: '0.5' }} backgroundColor="#F1DD2F" position="relative">
          {/* Cabeçalho */}
          <Stack gap={4} p={8} align="center">
            <Flex width="100%" justify="space-between" align="center">
              <Link href="/">
              <Button
                variant="ghost"
                color="#895023"
                size="lg"
                _hover={{ bg: 'transparent', textDecoration: 'underline' }}
                px={2}
            >
                Voltar
            </Button>
              </Link>
              <Image src="/logoBAnanoffe.jpg" alt="Logo" boxSize="120px" />
              <Box width="48px" /> {/* Espaço vazio para alinhamento */}
            </Flex>

            <Heading fontSize="3xl" color="black" fontWeight="semibold">
              Minha Conta
            </Heading>
            <Text fontSize="lg" color="black">
              Atualize seus dados
            </Text>
          </Stack>

          {/* Formulário */}
          <Container centerContent maxW="md" pb={8}>
            <Stack gap={6} width="100%">
              <FormControl>
                <FormLabel color="black">Nome</FormLabel>
                <Input
                  variant="subtle"
                  bgColor="#D9D9D9"
                  color="black"
                  size="lg"
                  defaultValue={user.nome || ''}
                  onChange={handleInputChange('nome')}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="black">Telefone</FormLabel>
                <Input
                  variant="subtle"
                  bgColor="#D9D9D9"
                  color="black"
                  size="lg"
                  defaultValue={user.telefone || ''}
                  onChange={handleInputChange('telefone')}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="black">Data de Nascimento</FormLabel>
                <Input
                  type="date"
                  variant="subtle"
                  bgColor="#D9D9D9"
                  color="black"
                  size="lg"
                  defaultValue={user.dataNascimento?.split('T')[0] || ''}
                  onChange={handleInputChange('dataNascimento')}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="black">Nova Senha</FormLabel>
                <Input
                  type="password"
                  variant="subtle"
                  bgColor="#D9D9D9"
                  color="black"
                  size="lg"
                  placeholder="Deixe em branco para manter a atual"
                  onChange={handleInputChange('senha')}
                />
              </FormControl>

              <Button
                bgColor="#895023"
                color="white"
                size="lg"
                width="100%"
                _hover={{ bgColor: '#6a3d1a' }}
                _disabled={{
                  bgColor: 'gray.400',
                  cursor: 'not-allowed'
                }}
                loading={isLoading}
                loadingText="Salvando..."
                disabled={Object.keys(changedFields).length === 0}
                onClick={handleSubmit}
              >
                Salvar Alterações
              </Button>
            </Stack>
          </Container>
        </Stack>
      </Flex>
    </Box>
  );
}