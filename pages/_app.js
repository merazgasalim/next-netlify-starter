// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'lib/theme'
import Layout from '@components/general/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} >
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp

