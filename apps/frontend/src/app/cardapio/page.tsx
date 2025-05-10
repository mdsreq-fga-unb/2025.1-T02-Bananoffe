"use client";
import {
  Box,
  Stack,
  Flex,
  Text,
  Input,
  InputGroup,
  Icon,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  MdSearch,
  MdFilterList,
  MdOutlineMenuBook,
  MdOutlineShoppingBag,
  MdInventory,
  MdPerson,
} from "react-icons/md";
import NavBar from "@/components/NavBar";

function Cardapio() {
  const [value, setValue] = useState("");
  return (
    <Box minH="100vh" bgColor="#F1DD2F">
      <Stack>
        <Text textStyle="3xl" fontWeight="semibold" color="black" p="30px">
          Bananoffee Doceria
        </Text>
        <Flex
          h="60px"
          bgColor="#FFF"
          w="100%"
          alignContent="center"
          justifyContent="space-between"
        >
          <InputGroup endElement={<MdSearch />} w="30%" ml="25px">
            <Input
              placeholder="Pesquise"
              bgColor="#ededed"
              color="#000"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </InputGroup>
          <Icon size="lg" color="#000" justifySelf={"end"} alignSelf="center">
            <MdFilterList />
          </Icon>
        </Flex>
        <NavBar />
      </Stack>
    </Box>
  );
}

export default Cardapio;
