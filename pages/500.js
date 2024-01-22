import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { minH } from "lib/constants";
import Image from "next/image";
import Logo from "public/images/dribbble.gif";
import { Link } from "@chakra-ui/next-js";
export default function Custom500() {
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
          500
        </Heading>
        <Image src={Logo} alt="" style={{ margin: "0 auto" }} priority={true} />

        <Heading as={"h1"}>Server-side error occurred!</Heading>
        <Text color={"gray.400"} fontSize="lg">
          Something went wrong, Please refresh and try again!
        </Text>
        <Link href={"/"} color="teal">
          Go Home Page
        </Link>
      </Box>
    </Container>
  );
}
