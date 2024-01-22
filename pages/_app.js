// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from 'prismicio'
import theme from 'lib/theme'
import Layout from '@components/general/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} >
      <Layout>
      <Component {...pageProps} />
      </Layout>
      <PrismicPreview repositoryName={repositoryName} />
    </ChakraProvider>
  )
}

export default MyApp

