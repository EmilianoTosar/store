import * as React from 'react'
import { 
  Button, 
  Grid, 
  Stack, 
  Text, 
  Link,
  List,
  ListItem, 
  Flex, 
  Image,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  HStack
 } from '@chakra-ui/react'

import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'

import { Product } from "../types"
import { parseCurrency } from '../../utils/currency'
import ProductCard from '../components/ProductCard'

interface Props {
  products: Product[]
}

interface CartItem extends Product {
  quantity: number
}

const StoreScreen: React.FC<Props> = ({products}) => {
  const [cart, setCart] = React.useState<CartItem[]>([])
  const [isCartOpen, toggleCart] = React.useState<boolean>(false)
  
  const total = React.useMemo(() => {
    parseCurrency(cart.reduce((total, product) => total + (product.price * product.quantity), 0))
  }, [cart])
  const text = React.useMemo(() => {
    return cart
      .reduce((message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price * product.quantity)}\n`),``)
      .concat(`\nTotal: ${total}`)
  }, [cart, total])

  function handleEditCart(product: Product, action: 'increment' | 'decrement') {
    setCart((cart) => {
      const isInCart = cart.some(item => item.id !== product.id)

      if(!isInCart) {
        return cart.concat({...product, quantity: 1})
      }

      return cart.reduce((acc, _product) => {
        if (product.id !== _product.id) {
          return acc.concat(_product)
        }
  
        if(action === 'decrement') {
          if (_product.quantity === 1) {
            return acc
          }
          
          return acc.concat({..._product, quantity: _product.quantity - 1})
        } else if (action === 'increment') {
          return acc.concat({..._product, quantity: _product.quantity + 1})
        }
      }, [])
    })
  }  
  
    
  return (
    <>
      <AnimateSharedLayout type='crossfade'>
        <Stack spacing={6}>
          {Boolean(products.length) ? (
            <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
              {products.map((product) => (
                  <ProductCard product={product} key={product.id} onAdd={(product) => handleEditCart(product, 'increment')} />
                )  
              )}
            </Grid>
            ) : <Text color='gray.500' fontSize='lg' margin='auto'>No hay productos</Text>}
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
                  size='lg'
                  colorScheme="whatsapp"
                  onClick={() => toggleCart(true)}
                >
                  Ver Pedido ({cart.length} productos)
                </Button>
              </Flex>
            )}    
          </AnimatePresence>
        </Stack>
      </AnimateSharedLayout>
      <Drawer
        isOpen={isCartOpen}
        placement="right"
        onClose={() => toggleCart(false)}
        size='md'
      >
        <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Tu pedido</DrawerHeader>

            <DrawerBody>
              <List spacing={4}>
                {cart.map((product) => {
                  return (
                    <ListItem key={product.id}> 
                      <Stack>
                        <HStack justifyContent='space-between'>
                          <Text fontWeight='500'>
                            {product.title}
                          </Text>
                          <Text color='green.400'>
                            {parseCurrency(product.price * product.quantity)}
                          </Text>
                        </HStack>
                        <HStack>
                          <Button 
                            size='xs' 
                            onClick={() => handleEditCart(product, 'decrement')}
                          >
                            {' '}-{' '}
                          </Button>
                          <Text>{product.quantity}</Text>
                          <Button 
                            size='xs' 
                            onClick={() => handleEditCart(product, 'increment')}
                          >
                            {' '}+{' '}
                          </Button>
                        </HStack>
                      </Stack>
                    </ListItem>
                  )
                })}
              </List>
            </DrawerBody>

            <DrawerFooter>
              <Button
                as={Link}
                padding={4}
                isExternal
                size='lg'
                colorScheme="whatsapp"
                leftIcon={<Image src='https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff' />}
                width='100%'
                href={`https://wa.me/541126448876?text=${encodeURIComponent(text)}`}
              >
                Completar pedido ({cart.length} productos)
              </Button>
            </DrawerFooter>
          </DrawerContent>
      </Drawer>
    </>
  )
} 

export default StoreScreen