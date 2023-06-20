import { Menu, MenuButton, MenuList, MenuItem, IconButton, useToast } from "@chakra-ui/react";
import { IoMenuOutline } from "react-icons/io5";
export default function MenuIcon() {
    const toast = useToast();
    const onPreparingToast = () => {
        toast({
            title: "준비중입니다",
            status: "info",
            duration: 3000,
            position: "top",
            isClosable: true,
        });
    };
    return (
        <Menu>
            <MenuButton as={IconButton} aria-label="Options" icon={<IoMenuOutline size="1.3em" />} variant="outline" />
            <MenuList>
                <MenuItem onClick={onPreparingToast}>About</MenuItem>
                <MenuItem as="a" href="/contact">
                    Contact
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
