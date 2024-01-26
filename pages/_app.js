// pages/_app.js
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "prismicio";
import theme from "lib/theme";
import Layout from "@components/general/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <PrismicPreview repositoryName={repositoryName} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
