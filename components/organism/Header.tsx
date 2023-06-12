import { Text } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import MenuIcon from "../molecule/MenuIcon";
export default function Header() {
    return (
        <Flex
            px="1rem"
            py="1rem"
            borderBottomColor={"gray.300"}
            borderBottomWidth={0.5}
            alignItems={"center"}
            position="fixed"
            top={0}
            width="100%"
            bg={"white"}
            zIndex={1}
        >
            <Link href="/">
                <Text fontSize="2xl" fontFamily="nexonBold" as="b">
                    CodeLyst
                </Text>
            </Link>
            <Spacer />
            <MenuIcon />
        </Flex>
    );
}
