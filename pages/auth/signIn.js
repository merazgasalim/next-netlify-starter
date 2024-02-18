import { Container, Progress } from "@chakra-ui/react";
import { minH } from "lib/constants";
import { NextSeo } from "next-seo";

import SigninForm from "@components/general/SigninForm";

import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();

  const goRegisterPage = () => router.push("/auth/register");
  return (
    <>
      <NextSeo title="Sign In" description="Sign In" nofollow noindex />
      <Container as={"main"} maxW="6xl" pt={20} minH={minH}>
        <SigninForm registerFn={goRegisterPage}  returnCallbackUrl={true} />
      </Container>
    </>
  );
}


