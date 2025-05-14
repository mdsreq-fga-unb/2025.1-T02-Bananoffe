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
  Center,
  Button,
  Flex,
} from "@chakra-ui/react";

import { useProducts } from "@/hooks/useProducts";
import { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdEdit, MdSearch } from "react-icons/md";
import { Product } from "@/types/Product.type";
import { useForm } from "react-hook-form";
import { ProdutoDialog } from "@/components/ProdutoDialog";

export interface FormValues {
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

function adminCardapio() {
  const {
    products,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    isLoading,
    setIsLoading,
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const imageSize = "50px";

  const filteredProducts = products.filter(
    (product) =>
      product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const formCreate = useForm<FormValues>();
  const formEdit = useForm<FormValues>();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      reset({
        _id: selectedProduct._id,
        nome: selectedProduct.nome,
        descricao: selectedProduct.descricao,
        precoTortaP: selectedProduct.precoTortaP,
        precoTortaG: selectedProduct.precoTortaG,
        precoPedacoP: selectedProduct.precoPedacoP,
        precoPedacoG: selectedProduct.precoPedacoG,
        quantidade: selectedProduct.quantidade || 0,
        imagem: selectedProduct.imagem || "",
      });
    }
  }, [selectedProduct, reset]);

  const onSubmitCreate = async (data: FormValues) => {
    try {
      const formData = new FormData();

      formData.append("nome", data.nome);
      formData.append("descricao", data.descricao);
      formData.append("precoTortaP", data.precoTortaP.toString());
      formData.append("precoTortaG", data.precoTortaG.toString());
      formData.append("precoPedacoP", data.precoPedacoP.toString());
      formData.append("precoPedacoG", data.precoPedacoG.toString());
      formData.append("quantidade", data.quantidade.toString() || "0");

      if (selectedImage) {
        formData.append("imagem", selectedImage);
      }
      setIsLoading(true);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      if (formData === null) {
        console.log("formData is null");
      }
      await createProduct(formData);
    }
    catch (error) {
      console.error(error);
    }
  }

  const onSubmitEdit = async (data: FormValues) => {
    try {
      const formData = new FormData();

      if (data._id) formData.append("_id", data._id);
      if (data.nome) formData.append("nome", data.nome);
      if (data.descricao) formData.append("descricao", data.descricao);
      if (data.precoTortaP !== undefined) formData.append("precoTortaP", data.precoTortaP.toString());
      if (data.precoTortaG !== undefined) formData.append("precoTortaG", data.precoTortaG.toString());
      if (data.precoPedacoP !== undefined) formData.append("precoPedacoP", data.precoPedacoP.toString());
      if (data.precoPedacoG !== undefined) formData.append("precoPedacoG", data.precoPedacoG.toString());
      if (data.quantidade !== undefined) formData.append("quantidade", data.quantidade.toString());

      if (selectedImage) {
        formData.append("imagem", selectedImage);
      }

      // ✅ Debug do conteúdo enviado
      console.log("📦 Conteúdo do FormData:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      setIsLoading(true);
      await updateProduct(formData);
    } catch (error) {
      console.error("❌ Erro ao atualizar produto:", error);
    } finally {
      setIsLoading(false);
    }
  };



  const handleAdd = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
    }
    setOpenCreate(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setImagePreviewUrl(product.imagem || null); 
    setOpenEdit(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
      await deleteProduct(id);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreviewUrl(null);
  };

  useEffect(() => {
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImagePreviewUrl(imageUrl);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (openEdit && selectedProduct) {
      setImagePreviewUrl(selectedProduct.imagem ?? null);
    }
  }, [openEdit, selectedProduct]);

  useEffect(() => {
    if (openCreate) {
      setSelectedProduct(null);
      reset();
      setImagePreviewUrl(null);
    }
  }, [openCreate]);

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

      {/* Para criação de produtos: */}
      <ProdutoDialog
        open={openCreate}
        setOpen={setOpenCreate}
        onSubmit={onSubmitCreate}
        form={formCreate}
        errors={errors}
        isLoading={isLoading}
        imagePreviewUrl={imagePreviewUrl}
        handleImageChange={handleImageChange}
        handleRemoveImage={handleRemoveImage}
        reset={reset}
        mode="create"
        product={selectedProduct}
        setImagePreviewUrl={setImagePreviewUrl}
      />

      {/* Para edição de produtos: */}
      <ProdutoDialog
        open={openEdit}
        setOpen={setOpenEdit}
        onSubmit={onSubmitEdit}
        form={formEdit}
        errors={errors}
        isLoading={isLoading}
        imagePreviewUrl={imagePreviewUrl}
        handleImageChange={handleImageChange}
        handleRemoveImage={handleRemoveImage}
        reset={reset}
        mode="edit"
        product={selectedProduct}
        setImagePreviewUrl={setImagePreviewUrl}
      />

    </Box>
  );
}

export default adminCardapio;