import React from 'react'
import { GetStaticProps } from 'next'
import { Button, Grid, Stack, Text, Link, Flex, Image } from '@chakra-ui/react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'

import { Product } from "../product/types"
import api from "../product/api"

interface Props {
  products: Product[]
}

function parseCurrency(value: number): string {
  return value.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  })
}

const IndexRoute: React.FC<Props> = ({products}) => {
  const [cart, setCart] = React.useState<Product[]>([])
  const [selectedImage, setSelectedImage] = React.useState<string>(null)
  const text = React.useMemo(() => {
    return cart
      .reduce((message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`),``)
      .concat(`\nTotal: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`)
  }, [cart])
      
  return (
    <AnimateSharedLayout type='crossfade'>
      <Stack spacing={6}>
        <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
          {products.map((product) => (
            <Stack spacing={3} borderRadius='md' padding={4} key={product.id} backgroundColor="gray.100">
              <Stack spacing={1}>
                <Image 
                  src={product.image}
                  alt={product.title}
                  as={motion.img}
                  cursor='pointer'
                  layoutId={product.image}
                  maxHeight={128}
                  objectFit='cover' 
                  borderTopRadius='md'
                  onClick={() => setSelectedImage(product.image)}
                />
                <Text>{product.title}</Text>
                <Text fontSize='sm' fontWeight='500' color='green.500'>{parseCurrency(product.price)}</Text>
              </Stack>
              <Button 
                colorScheme="primary"
                size='sm'
                variant='outline'
                onClick={() => setCart(cart => cart.concat(product))}
              >
                Agregar
              </Button>
            </Stack>
            )  
          )}
        </Grid>
        <AnimatePresence>
          {Boolean(cart.length) && (
            <Flex 
              initial={{scale: 0}}
              animate={{scale: 1}}
              exit={{scale: 0}}
              as={motion.div}
              position='sticky' 
              alignItems='center' 
              justifyContent='center' 
              bottom={4}
            >
              <Button
                padding={4}
                isExternal
                as={Link}
                size='lg'
                colorScheme="whatsapp"
                href={`https://wa.me/541126448876?text=${encodeURIComponent(text)}`}
                leftIcon={<Image src='https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff' />}
              >
                Completar pedido ({cart.length} productos)
              </Button>
            </Flex>
          )}    
        </AnimatePresence>
      </Stack>
      <AnimatePresence>
        {selectedImage && (
          <Flex
            key='backdrop'
            alignItems='center'
            as={motion.div}
            backgroundColor='rgba(0,0,0,0.5)'
            justifyContent='center'
            layoutId={selectedImage}
            position='fixed'
            top={0}
            left={0}
            width='100%'
            onClick={() => setSelectedImage(null)}
          >
            <Image key='image' src={selectedImage} />
          </Flex>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    props: {
      products
    },
    revalidate: 10
  }
}

export default IndexRoute