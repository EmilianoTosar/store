import * as React from 'react'
import { Button, Grid, Stack, Text, Flex } from '@chakra-ui/react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'

import { Product, CartItem } from "../types"
import ProductCard from '../components/ProductCard'
import CartDrawer from '../components/CartDrawer'
import { editCart } from '../selectors'

interface Props {
  products: Product[]
}

const StoreScreen: React.FC<Props> = ({products}) => {
  const [cart, setCart] = React.useState<CartItem[]>([])
  const [isCartOpen, toggleCart] = React.useState<boolean>(false)
  
  function handleEditCart(product: Product, action: 'increment' | 'decrement') {
    setCart(editCart(product, action))
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
                  width={{base: '100%', sm: 'fit-content'}}
                  onClick={() => toggleCart(true)}
                >
                  Ver Pedido ({cart.reduce((acc, item) => {
                    return acc + item.quantity
                  }, 0)} productos)
                </Button>
              </Flex>
            )}    
          </AnimatePresence>
        </Stack>
      </AnimateSharedLayout>
      <CartDrawer 
        items={cart}
        onIncrement={(product) => handleEditCart(product, 'increment')}
        onDecrement={(product) => handleEditCart(product, 'decrement')}
        isOpen={isCartOpen}  
        onClose={() => toggleCart(false)} />
    </>
  )
} 

export default StoreScreen