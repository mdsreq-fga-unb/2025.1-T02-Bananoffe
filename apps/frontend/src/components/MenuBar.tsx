"use client";

import { Button, Link, Menu, Portal, Text } from "@chakra-ui/react"
import { CgMenuLeftAlt } from "react-icons/cg";
import { BiFoodMenu } from "react-icons/bi";
import { BiCommentError } from "react-icons/bi";

const links = [
    {
        title: "Cardápio",
        href: "/admin_cardapio",
        icon: <BiFoodMenu />,
    },
    {
        title: "Pedidos",
        href: "/admin_pedidos",
        icon: <BiCommentError />,
    },
]

function MenuBar() {
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button size="md" variant="outline" backgroundColor={"#222222"}>
                    <CgMenuLeftAlt /> Administração
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content backgroundColor="#222222">
                        {links.map((link) => (
                            <Menu.Item key={link.href} asChild value={link.title}>
                                <Link href={link.href} _hover={{backgroundColor: "#333333"}}>
                                    <Text color="white" fontSize="sm" display="inline-flex" alignItems="center" gap={2}>
                                        {link.icon} {link.title}
                                    </Text>
                                </Link>
                            </Menu.Item>
                        ))}
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )

}

export default MenuBar;
