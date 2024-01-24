import { Container, Heading } from "@chakra-ui/react";
import { minH } from "lib/constants";
import { NextSeo } from "next-seo";

export default function MyAccount() {
  return (
    <>
    <NextSeo
      title="My Account"
      description="My Account"
      nofollow
      noindex
    />
    <Container as={"main"} maxW="6xl" pt={20} minH={minH}>
      <Heading as={"h1"}>Hello!</Heading>
    </Container>
    </>
  );
}
