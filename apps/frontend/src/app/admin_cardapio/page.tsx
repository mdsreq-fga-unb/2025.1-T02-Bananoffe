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
import { Fatia, Torta } from "@/types/Product.type";
import { useForm } from "react-hook-form";
import { ProdutoDialog } from "@/components/ProdutoDialog";
import Link from "next/link";
import MenuBar from "@/components/MenuBar";

export interface FormValues {
  _id: string;
  nome: string;
  descricao: string;
  precoTortaP: number;
  precoTortaG: number;
  precoFatia: number;
  quantidadeTorta: number;
  quantidadeFatia: number;
  imagem?: string;
}

function adminCardapio() {
  const {
    fatias,
    tortas,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    isLoading,
    setIsLoading,
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Torta | Fatia | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTortaImage, setSelectedTortaImage] = useState<File | null>(null);
  const [selectedFatiaImage, setSelectedFatiaImage] = useState<File | null>(null);
  const [selectedEditImage, setSelectedEditImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageTortaPreviewUrl, setTortaImagePreviewUrl] = useState<string | null>(null);
  const [imageFatiaPreviewUrl, setFatiaImagePreviewUrl] = useState<string | null>(null);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const imageSize = "50px";

  const filteredFatias = fatias.filter((item) =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTortas = tortas.filter((item) =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
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
      if ("precoTortaP" in selectedProduct) {
        // É uma Torta
        reset({
          _id: selectedProduct._id,
          nome: selectedProduct.nome,
          descricao: selectedProduct.descricao,
          precoTortaP: selectedProduct.precoTortaP,
          precoTortaG: selectedProduct.precoTortaG,
          precoFatia: 0,
          quantidadeTorta: selectedProduct.quantidade || 0,
          imagem: selectedProduct.imagem || "",
        });
      } else {
        // É uma Fatia
        reset({
          _id: selectedProduct._id,
          nome: selectedProduct.nome,
          descricao: selectedProduct.descricao,
          precoTortaP: 0,
          precoTortaG: 0,
          precoFatia: selectedProduct.precoFatia || 0,
          quantidadeFatia: selectedProduct.quantidade || 0,
          imagem: selectedProduct.imagem || "",
        });
      }
    }
  }, [selectedProduct, reset]);

  const onSubmitCreate = async (data: FormValues) => {
    try {
      const formData = new FormData();

      formData.append("nome", data.nome);
      formData.append("descricao", data.descricao);
      if (data.precoTortaP !== undefined)
        formData.append("precoTortaP", data.precoTortaP.toString());
      if (data.precoTortaG !== undefined)
        formData.append("precoTortaG", data.precoTortaG.toString());
      if (data.precoFatia !== undefined)
        formData.append("precoFatia", data.precoFatia.toString());
      if (data.quantidadeTorta !== undefined)
        formData.append("quantidadeTorta", data.quantidadeTorta.toString());
      if (data.quantidadeFatia !== undefined)
        formData.append("quantidadeFatia", data.quantidadeFatia.toString());
      if (selectedTortaImage) {
        formData.append("imagens", selectedTortaImage); // primeiro arquivo
      }
      if (selectedFatiaImage) {
        formData.append("imagens", selectedFatiaImage); // segundo arquivo
      }

      setIsLoading(true);

      await createProduct(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitEdit = async (data: FormValues) => {
    try {
      if (!data._id) {
        throw new Error("ID do produto não informado.");
      }

      const formData = new FormData();

      formData.append("nome", data.nome);
      formData.append("descricao", data.descricao);

      if (data.precoTortaP !== undefined)
        formData.append("precoTortaP", data.precoTortaP.toString());
      if (data.precoTortaG !== undefined)
        formData.append("precoTortaG", data.precoTortaG.toString());
      if (data.precoFatia !== undefined)
        formData.append("precoFatia", data.precoFatia.toString());
      if (data.quantidadeTorta !== undefined && data.quantidadeTorta > -1) {
        formData.append("quantidade", data.quantidadeTorta.toString());
      } else if (data.quantidadeFatia !== undefined && data.quantidadeFatia > -1) {
        formData.append("quantidade", data.quantidadeFatia.toString());
      }
      if (selectedEditImage instanceof File) {
        formData.append("imagem", selectedEditImage);
      }

      // ✅ Debug
      // console.log("📦 FormData enviado:");
      // for (const [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      setIsLoading(true);
      await updateProduct(data._id, formData);
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

  const handleEdit = (product: Torta | Fatia) => {
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
      setSelectedEditImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFatiaImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFatiaImage(file);
      setFatiaImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleTortaImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedTortaImage(file);
      setTortaImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedEditImage(null);
    setImagePreviewUrl(null);
  };
  const handleRemoveFatiaImage = () => {
    setSelectedFatiaImage(null);
    setFatiaImagePreviewUrl(null);
  };
  const handleRemoveTortaImage = () => {
    setSelectedTortaImage(null);
    setTortaImagePreviewUrl(null);
  };

  useEffect(() => {
    if (selectedTortaImage) {
      const imageUrl = URL.createObjectURL(selectedTortaImage);
      setTortaImagePreviewUrl(imageUrl)
    }
    if (selectedFatiaImage) {
      const imageUrl = URL.createObjectURL(selectedFatiaImage);
      setFatiaImagePreviewUrl(imageUrl);
    }
  }, [selectedTortaImage, selectedFatiaImage]);


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
          <MenuBar />
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
          <Link href="/">
            <Button
              bgColor="#895023"
              color="#FFF"
              marginRight={isMobile ? "0" : "2"}
            >
              Cardápio Digital
            </Button>
          </Link>
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
                  Preço Fatia
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
              {[...filteredFatias, ...filteredTortas].map((item) => (
                <Table.Row key={item._id}>
                  <Table.Cell>{item.nome}</Table.Cell>
                  <Table.Cell>{item.descricao}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {"precoTortaP" in item ? item.precoTortaP : "-"}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {"precoTortaG" in item ? item.precoTortaG : "-"}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {"precoFatia" in item ? item.precoFatia : "-"}
                  </Table.Cell>
                  <Table.Cell textAlign="center">{item.quantidade}</Table.Cell>
                  <Table.Cell width={imageSize} height={imageSize} padding={1}>
                    <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center" bg="gray.100" borderRadius="md" overflow="hidden">
                      <Image
                        src={typeof item.imagem === "string" ? item.imagem : ""}
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                        alt={item.nome}
                      />
                    </Box>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Flex gap="2" justify="center">
                      <Button bgColor="#141414" size="sm" onClick={() => handleEdit(item)}>
                        <MdEdit color="white" />
                      </Button>
                      <Button size="sm" bgColor="#141414" onClick={() => handleDelete(item._id)}>
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
        handleFatiaImageChange={handleFatiaImageChange}
        handleRemoveFatiaImage={handleRemoveFatiaImage}
        handleTortaImageChange={handleTortaImageChange}
        handleRemoveTortaImage={handleRemoveTortaImage}
        reset={reset}
        mode="create"
        product={selectedProduct}
        setImagePreviewUrl={setImagePreviewUrl}
        FatiaImagePreviewUrl={imageFatiaPreviewUrl}
        TortaImagePreviewUrl={imageTortaPreviewUrl}
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
        handleFatiaImageChange={handleFatiaImageChange}
        handleRemoveFatiaImage={handleRemoveFatiaImage}
        handleTortaImageChange={handleTortaImageChange}
        handleRemoveTortaImage={handleRemoveTortaImage}
        reset={reset}
        mode="edit"
        product={selectedProduct}
        setImagePreviewUrl={setImagePreviewUrl}
        FatiaImagePreviewUrl={imageFatiaPreviewUrl}
        TortaImagePreviewUrl={imageTortaPreviewUrl}
      />

    </Box>
  );
}

export default adminCardapio;