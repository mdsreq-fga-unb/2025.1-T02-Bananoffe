"use client";
import {
  Box,
  Image,
  Input,
  InputGroup,
  Spinner,
  Stack,
  Table,
  useBreakpointValue,
  Text,
  Center,
  Dialog,
  Button,
  Portal,
  CloseButton,
  Flex,
  useDisclosure,
  Field,
  NumberInput,
} from "@chakra-ui/react";

import { useProducts } from "@/hooks/useProducts";
import { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdEdit, MdSearch } from "react-icons/md";
import { Product } from "@/types/Product.type";
import { useForm } from "react-hook-form";

interface FormValues {
  _id: string;
  nome: string;
  descricao: string;
  precoTortaP: number;
  precoTortaG: number;
  precoPedacoP: number;
  precoPedacoG: number;
  quantidade: number;
  imagem?: string;
}
// }

function adminCardapio() {
  const {
    products,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    isLoading,
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const { onOpen, onClose } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const imageSize = "50px";

  const filteredProducts = products.filter(
    (product) =>
      product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    getProducts();
  }, []);

  const onSubmit = async (data: FormValues) => {
    const dados = {
      _id: data._id,
      nome: data.nome,
      descricao: data.descricao,
      precoTortaP: data.precoTortaP,
      precoTortaG: data.precoTortaG,
      precoPedacoP: data.precoPedacoP,
      precoPedacoG: data.precoPedacoG,
      quantidade: data.quantidade,
      imagem: data.imagem,
    };
    const sucesso = await createProduct(dados);
  };

  const handleAdd = () => {
    setOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    reset(product);
    onOpen();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
      await deleteProduct(id);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      className="pageContainer"
      p={5}
      bg="gray.50"
      minH="100vh"
      width="100%"
      overflow="auto"
    >
      <Stack className="pageContent" gap="2">
        <Flex
          className="Header"
          flexDirection={isMobile ? "column" : "row"}
          gap="1"
        >
          <Button
            bgColor="#222222"
            color="#FFF"
            marginRight={isMobile ? "0" : "2"}
            onClick={handleAdd}
          >
            <MdAdd /> Adicionar Produto
          </Button>
          <InputGroup endElement={<MdSearch />} w={isMobile ? "100%" : "30%"}>
            <Input
              placeholder="Pesquise"
              bgColor="#ededed"
              color="#000"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Flex>
        {isLoading ? (
          <Center mx="auto" my={20} borderWidth={"0px"}>
            <Spinner size="xl" color="blue.500" />
          </Center>
        ) : (
          <Table.Root
            stickyHeader
            variant="outline"
            colorPalette="gray"
            color="black"
            borderRadius="sm"
            overflow="auto"
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Produto</Table.ColumnHeader>
                <Table.ColumnHeader>Descrição</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  Preço Torta P
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  Preço Torta G
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  Preço Pedaço P
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  Preço Pedaço G
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  Quantidade
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  Imagem
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign={"center"} p="0">
                  Editar
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredProducts.map((item) => (
                <Table.Row key={item._id}>
                  <Table.Cell>{item.nome}</Table.Cell>
                  <Table.Cell>{item.descricao}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {item.precoPedacoP}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {item.precoPedacoG}
                  </Table.Cell>
                  <Table.Cell textAlign="center">{item.precoTortaP}</Table.Cell>
                  <Table.Cell textAlign="center">{item.precoTortaG}</Table.Cell>
                  <Table.Cell textAlign="center">{item.quantidade}</Table.Cell>
                  <Table.Cell
                    width={imageSize}
                    height={imageSize}
                    padding={1} // Espaçamento interno reduzido
                  >
                    <Box
                      width="100%"
                      height="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg="gray.100" // Fundo cinza claro para visualização
                      borderRadius="md" // Bordas arredondadas
                      overflow="hidden" // Esconde qualquer overflow da imagem
                    >
                      <Image
                        src={item.imagem}
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                        alt={item.nome}
                      />
                    </Box>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Flex gap="2" justify="center">
                      <Button
                        bgColor="#141414"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        <MdEdit color="white" />
                      </Button>
                      <Button
                        size="sm"
                        bgColor="#141414"
                        onClick={() => handleDelete(item._id)}
                      >
                        <MdDelete color="white" />
                      </Button>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Stack>
      <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Dialog Title</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Center>
                    <Stack gap="4" width="100%" maxW="md">
                      <Field.Root invalid={!!errors.nome}>
                        <Field.Label htmlFor="nome" color="white">
                          Nome
                        </Field.Label>
                        <Input
                          variant="subtle"
                          bgColor="#D9D9D9"
                          color="black"
                          size="lg"
                          type="text"
                          placeholder="Nome"
                          {...register("nome", {
                            required: "Nome é obrigatório",
                          })}
                        />
                        <Field.ErrorText>
                          {errors.nome?.message}
                        </Field.ErrorText>
                      </Field.Root>

                      <Field.Root invalid={!!errors.descricao}>
                        <Field.Label color="white">Descricao</Field.Label>
                        <Input
                          variant="subtle"
                          bgColor="#D9D9D9"
                          color="black"
                          size="lg"
                          placeholder="Descrição"
                          {...register("descricao", {
                            required: "Descrição é obrigatória",
                          })}
                        />
                        <Field.ErrorText>
                          {errors.descricao?.message}
                        </Field.ErrorText>
                      </Field.Root>

                      <Field.Root invalid={!!errors.precoTortaP}>
                        <Field.Label color="white">Preço Torta P</Field.Label>
                        <Input
                          variant="subtle"
                          bgColor="#D9D9D9"
                          color="black"
                          size="lg"
                          type="number"
                          {...register("precoTortaP", {
                            required: "Preço é obrigatório",
                            min: {
                              value: 0,
                              message: "Preço deve ser positivo",
                            },
                          })}
                        />
                        <Field.ErrorText>
                          {errors.precoTortaP?.message}
                        </Field.ErrorText>
                      </Field.Root>
                      <Field.Root invalid={!!errors.precoTortaG}>
                        <Field.Label color="white">Preço Torta G</Field.Label>
                        <Input
                          variant="subtle"
                          bgColor="#D9D9D9"
                          color="black"
                          size="lg"
                          type="number"
                          {...register("precoTortaG", {
                            required: "Preço da Torta G é obrigatório",
                            min: {
                              value: 0,
                              message: "Preço deve ser positivo",
                            },
                          })}
                        />
                        <Field.ErrorText>
                          {errors.precoTortaG?.message}
                        </Field.ErrorText>
                      </Field.Root>
                      <Field.Root invalid={!!errors.precoPedacoP}>
                        <Field.Label color="white">Preço Pedaço P</Field.Label>
                        <Input
                          variant="subtle"
                          bgColor="#D9D9D9"
                          color="black"
                          size="lg"
                          type="number"
                          {...register("precoPedacoP", {
                            required: "Preço do Pedaço P é obrigatório",
                            min: {
                              value: 0,
                              message: "Preço deve ser positivo",
                            },
                          })}
                        />
                        <Field.ErrorText>
                          {errors.precoTortaG?.message}
                        </Field.ErrorText>
                      </Field.Root>
                      <Field.Root invalid={!!errors.precoPedacoG}>
                        <Field.Label color="white">Preço Pedaço G</Field.Label>
                        <Input
                          variant="subtle"
                          bgColor="#D9D9D9"
                          color="black"
                          size="lg"
                          type="number"
                          {...register("precoPedacoG", {
                            required: "Preço do Pedaço G é obrigatório",
                            min: {
                              value: 0,
                              message: "Preço deve ser positivo",
                            },
                          })}
                        />
                        <Field.ErrorText>
                          {errors.precoPedacoG?.message}
                        </Field.ErrorText>
                      </Field.Root>
                      <Field.Root invalid={!!errors.quantidade}>
                        <Field.Label color="white">Quantidade</Field.Label>
                        <Input
                          variant="subtle"
                          bgColor="#D9D9D9"
                          color="black"
                          size="lg"
                          type="number"
                          {...register("quantidade", {
                            min: {
                              value: 0,
                              message: "Quantidade deve ser positivo",
                            },
                          })}
                        />
                        <Field.ErrorText>
                          {errors.quantidade?.message}
                        </Field.ErrorText>
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
                      >
                        Adicionar Produto
                      </Button>
                    </Stack>
                  </Center>
                </form>
              </Dialog.Body>
              <Dialog.Footer></Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}

export default adminCardapio;
