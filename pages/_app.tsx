import * as React from "react"
import { ChakraProvider, Container, Image, VStack, Text, Heading, Box, Divider } from "@chakra-ui/react"
import { AppProps } from "next/app"

import theme from "../theme"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container 
          backgroundColor="white"
          boxShadow="md"
          maxWidth="container.xl"
          padding={4}
          borderRadius='sm'
        >
          <VStack marginBottom={6}>
            <Image borderRadius={9999} src="//via.placeholder.com/128"></Image>
            <Heading>Canelo Taller</Heading>
            <Text>Los cuadernos mas cutes del mundo mundial</Text>
          </VStack>
          <Divider marginY={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  )
}
export default App