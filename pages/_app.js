// pages/_app.js
import { SessionProvider, useSession } from "next-auth/react";
import { ChakraProvider, Progress, Container } from "@chakra-ui/react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "prismicio";
import theme from "lib/theme";
import Layout from "@components/general/Layout";
import { minH } from "lib/constants";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Layout>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
        <PrismicPreview repositoryName={repositoryName} />
      </ChakraProvider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return (
      <Container as={"main"} maxW="full" pt={14} minH={minH}>
        <Progress size="xs" isIndeterminate />
      </Container>
    );
  }

  return children;
}

export default MyApp;
