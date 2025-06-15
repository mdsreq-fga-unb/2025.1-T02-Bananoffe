"use client";
import {
  Box,
  Input,
  InputGroup,
  Stack,
  useBreakpointValue,
  Button,
  Flex,
} from "@chakra-ui/react";

import { useState } from "react";
import { MdSearch } from "react-icons/md";
import Link from "next/link";
import MenuBar from "@/components/MenuBar";

function adminPedido() {

  const [searchTerm, setSearchTerm] = useState("");

  const isMobile = useBreakpointValue({ base: true, md: false });

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
          <MenuBar/>
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
      </Stack>

    </Box>
  );
}

export default adminPedido;