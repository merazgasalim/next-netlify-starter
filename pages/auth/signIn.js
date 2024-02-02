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

import SigninForm from "@components/general/SigninForm";

import NextLink from "next/link";
import { useRouter } from "next/router";
export default function SignIn({ csrfToken }) {
  const router = useRouter();

  const goRegisterPage = () => router.push("/auth/register");
  return (
    <>
      <NextSeo title="Sign In" description="Sign In" nofollow noindex />
      <Container as={"main"} maxW="6xl" pt={20} minH={minH}>
        <SigninForm registerFn={goRegisterPage} />
        {/*  <VStack
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
            <Input name="email" type="email" />
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
  </VStack>*/}
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
