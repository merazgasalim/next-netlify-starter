import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { minH } from "lib/constants";
import Image from "next/image";
import Logo from "public/images/dribbble.gif";
import { Link } from "@chakra-ui/next-js";
export default function Custom404() {
  return (
    <Container
      as={Flex}
      justify="center"
      align={"center"}
      pt={20}
      maxW="6xl"
      textAlign={"center"}
      minH={minH}
    >
      <Box>
        <Heading as={"h2"} mt={5}>
          404
        </Heading>
        <Image
          src={Logo}
          alt="404"
          //style={{ margin: "0 auto" }}
          priority={true}
          //placeholder="blur"
        />
        <Heading as={"h1"}>Looks like you are lost</Heading>
        <Text color={"gray.400"} fontSize="lg">
          The page you are looking for is not available!
        </Text>
        <Link href={"/"} color="teal">
          Go Home Page
        </Link>
      </Box>
    </Container>
  );
}
