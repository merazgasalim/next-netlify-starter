import {
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
  Link,
} from "@chakra-ui/react";
import { minH } from "lib/constants";
import { getCsrfToken } from "next-auth/react";
import { NextSeo } from "next-seo";

import NextLink from "next/link";
export default function SignIn({ csrfToken }) {
  return (
    <>
      <NextSeo title="Sign In" description="Sign In" nofollow noindex />
      <Container as={"main"} maxW="6xl" pt={20} minH={minH}>
        <VStack
          as={"form"}
          maxW={"md"}
          mx="auto"
          spacing={5}
          method="post"
          action="/api/auth/callback/credentials"
          minH={minH}
          justify={"center"}
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="username" type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>{" "}
            <Input name="password" type="password" />
          </FormControl>
          <HStack justify={"space-between"} w="full">
            <Button type="submit" colorScheme={"blue"}>
              Sign in
            </Button>
            <Link as={NextLink} href="/auth/register" color="teal">
              Not register? Register.
            </Link>
          </HStack>
        </VStack>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
