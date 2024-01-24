import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useOutsideClick,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";

const Links = [
  { name: "Home", url: "/" },
  { name: "Plans", url: "/#plans" },
  { name: "Tutorials", url: "/blog" },
  { name: "Contact", url: "/#contact" },
];

const NavLink = (props) => {
  const { children } = props;
  return (
    <Box
      as={Link}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "gray.200",
      }}
      href={props.url}
      fontWeight="bold"
    >
      {children}
    </Box>
  );
};

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  })

  return (
    <Box
      as="nav"
      bg={useColorModeValue("gray.100", "gray.900")}
      px={{ base: 1, md: 4 }}
      pos="fixed"
      zIndex={9}
      width="full"
      boxShadow={"lg"}
    >
      <HStack
        spacing={8}
        alignItems={"center"}
        w={"full"}
        justify={{ base: "space-between", md: "space-around" }}
        py={2}
      >
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Box>Logo</Box>
        <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
          {Links.map((link) => (
            <NavLink key={link.name} url={link.url}>
              {link.name}
            </NavLink>
          ))}
        </HStack>
        <Button
          as={Link}
          href="/my-account"
          colorScheme={"facebook"}
          _hover={{
            textDecoration: "none",
          }}
          size={{ base: "sm", md: "md" }}
        >
          Client Area
        </Button>
      </HStack>

      {isOpen ? (
        <Box ref={ref} pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link} url={link.url}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
