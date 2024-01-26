import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Link,
  VStack,
} from "@chakra-ui/react";
import { minH } from "lib/constants";
import { NextSeo } from "next-seo";
import NextLink from "next/link";
export default function Register() {
  return (
    <>
      <NextSeo title="Register" description="Register" nofollow noindex />
      <Container as={"main"} maxW="6xl" pt={20} minH={minH}>
        <VStack
          as={"form"}
          maxW={"md"}
          mx="auto"
          spacing={5}
          minH={minH}
          justify={"center"}
        >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="username" type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>{" "}
            <Input name="password" type="password" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>{" "}
            <Input name="password" type="password" />
          </FormControl>

          <Button type="submit" colorScheme={"blue"}>
            Submit
          </Button>

          <Link as={NextLink} href="/auth/signIn" color="teal">
            Already have an account? Sign in
          </Link>
        </VStack>
      </Container>
    </>
  );
}
