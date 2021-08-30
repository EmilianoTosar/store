import * as React from 'react'
import { Button, Grid, Stack, Text, Flex } from '@chakra-ui/react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'

import { Product, CartItem } from "../types"
import ProductCard from '../components/ProductCard'
import CartDrawer from '../components/CartDrawer'
import { editCart } from '../selectors'
import { parseCurrency } from '../../utils/currency'

interface Props {
  products: Product[]
}

const StoreScreen: React.FC<Props> = ({products}) => {
  const [cart, setCart] = React.useState<CartItem[]>([])
  const [isCartOpen, toggleCart] = React.useState<boolean>(false)
  
  const total = React.useMemo(
    () => 
      parseCurrency(cart.reduce((total, product) => total + product.price * product.quantity, 0)),
      [cart]
    )
      
  const quantity = React.useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  function handleEditCart(product: Product, action: 'increment' | 'decrement') {
    setCart(editCart(product, action))
  }

  return (
    <>
      <AnimateSharedLayout type='crossfade'>
        <Stack spacing={6}>
          {Boolean(products.length) ? (
            <Grid gridGap={8} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
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
                  data-testid='show-cart'
                  boxShadow='xl'
                  size='lg'
                  colorScheme="primary"
                  width={{base: '100%', sm: 'fit-content'}}
                  onClick={() => toggleCart(true)}
                >
                  <Stack alignItems='center' direction='row' spacing={6}>
                    <Stack alignItems="center" direction="row" spacing={3}>
                      <Text fontSize="md" lineHeight={6}>
                        Ver Pedido
                      </Text>
                      <Text 
                        backgroundColor="rgba(0,0,0,0.25)" 
                        fontSize='xs' 
                        paddingY={1}
                        paddingX={2}
                        fontWeight='500'
                        borderRadius='sm'
                        color='gray.100'
                      >
                        {quantity} items
                      </Text>
                    </Stack>
                    <Text fontSize="md" lineHeight={6}>
                      {total}
                    </Text>
                  </Stack>
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