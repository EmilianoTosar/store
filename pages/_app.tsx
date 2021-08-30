import * as React from "react"
import Head from 'next/head'
import { ChakraProvider, Container, Image, VStack, Text, Heading, Box, Divider, Link, Stack, Flex } from "@chakra-ui/react"
import { AppProps } from "next/app"

import theme from "../theme"
import { INFORMATION } from "../app/constants"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Mi tienda online - Canelo Taller</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        {/* Inicio de meta tags de licencia - Cambiar el contenido de los mismos viola el contenido de los terminos de licencia */}
        <meta content="goncy" name="author" />
        <meta content="Gonzalo Pozzo" name="copyright" />
        {/* Fin de meta tags de licencia */}
      </Head>
      <ChakraProvider theme={theme}>
        <Container backgroundColor="white" maxWidth="container.xl" padding={4} borderRadius='sm'>
          <Stack spacing={8}>
            <Stack marginBottom={4} spacing={4}>
              <Image 
                borderRadius='lg' 
                height='100%' 
                maxHeight={64} 
                src={INFORMATION.banner} 
                objectFit='cover' 
              />
              <Stack 
                direction={{base: 'column', sm:'row'}}
                alignItems='center' 
                spacing={{base: 3, sm: 6}}
              >
                <Box 
                  minWidth={{base: 24, sm: 32}} 
                  marginLeft={{base: 0, sm: 4}}
                  backgroundColor='white' 
                  borderRadius={9999} 
                  marginTop={{base: -12, sm: -16}} 
                  padding={1}
                >
                  <Image 
                    borderRadius={9999} 
                    height={{base: 24, sm: 32}} 
                    width={{base: 24, sm: 32}} 
                    src={INFORMATION.avatar} 
                  />
                </Box>
                <Stack 
                  spacing={3} 
                  alignItems={{base: "center", sm: "flex-start"}}
                  textAlign={{base: "center", sm: "left"}} 
                  direction={{base:'column', sm: 'row'}}
                >
                  <Stack spacing={0}>
                    <Heading>{INFORMATION.title}</Heading>
                    <Text color='gray.500' fontWeight='500'>
                      {INFORMATION.description}
                    </Text>
                  </Stack>
                </Stack>
                <Stack direction="row" justifyContent='flex-end'>
                    {INFORMATION.social.map((social) => (
                      <Link key={social.name} isExternal href={social.url}>
                        <Flex
                          alignItems="center"
                          backgroundColor="primary.500"
                          borderRadius={9999}
                          color="white"
                          height={8}
                          justifyContent="center"
                          width={8}
                        >
                          <Image
                            src={`https://icongr.am/fontawesome/${social.name}.svg?size=24&color=ffffff`}
                          />
                        </Flex>
                      </Link>
                    ))}
                  </Stack>
              </Stack>
            </Stack>
            <Component {...pageProps} />
          </Stack>
          <Divider marginY={4} />
          {/* Inicio de copyright - Cambiar el contenido de los mismos viola el contenido de los terminos de licencia */}
            <Text textAlign="center" fontSize='sm' color='gray.400'>
              © Copyright {new Date().getFullYear()}.
            </Text>
          {/* Fin de copyright */}
        </Container>
      </ChakraProvider>
    </>
  )
}
export default App