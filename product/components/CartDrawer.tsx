import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, Stack, Text, Image, DrawerOverlay, DrawerCloseButton, DrawerHeader, Divider, Link, DrawerProps, CloseButton } from '@chakra-ui/react'
import * as React from 'react'
import { INFORMATION } from '../../app/constants'
import { parseCurrency } from '../../utils/currency'
import { CartItem, Product } from '../types'

interface Props extends Omit<DrawerProps, 'children'> {
  items: CartItem[]
  onIncrement: (produt: Product) => void
  onDecrement: (produt: Product) => void
}

const CartDrawer: React.FC<Props> = ({items, onDecrement, onIncrement, onClose, ...props}) => {
  const total = React.useMemo(
    () => 
      parseCurrency(items.reduce((total, product) => total + product.price * product.quantity, 0)), 
    [items]
  )
  
  const quantity = React.useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items]);

  const text = React.useMemo(
    () => 
      items
        .reduce(
          (message, product) => 
            message.concat(
              `* ${product.title}${
                product.quantity > 1 ? ` X${product.quantity}` : ``
              } - ${parseCurrency(product.price * product.quantity)}\n`
            ),
            ``
          )
          .concat(`\nTotal: ${total}`),
      [items, total]
    )

    React.useEffect(() => {
      if(!items.length) {
        onClose()
      }
    }, [items.length, onClose])
  
  return (
    <Drawer
      placement="right"
      size='sm'
      onClose={onClose}
      {...props}
    >
      <DrawerOverlay />
        <DrawerContent paddingTop={4}>
          <DrawerHeader paddingX={4}>
            <Stack  direction='row' alignItems='center' justifyContent='space-between'>
              <Stack direction='row' fontWeight='bold' fontSize={{base: '2xl', sm:'3xl'}}>
                <Text>Tu pedido</Text> <Text color='gray.400'>({quantity})</Text> 
              </Stack>
              <CloseButton onClick={onClose}/>
            </Stack>
          </DrawerHeader>
          <DrawerBody data-testid='cart' paddingX={4}>
            {Boolean(items.length) ? ( 
            <Stack spacing={4} divider={<Divider />}>
              {items.map((product) => {
                return (
                  <Stack data-testid='cart-item' direction='row' key={product.id}> 
                    <Stack width='100%'>
                      <Stack 
                        alignItems='center' 
                        fontWeight='500' 
                        direction='row' 
                        justifyContent='space-between'
                      >
                        <Text fontSize='lg'>
                          {product.title}
                        </Text>
                        <Text>
                          {parseCurrency(product.price * product.quantity)}
                        </Text>
                      </Stack>
                      <Stack direction='row'>
                        <Button
                          colorScheme='primary' 
                          size='xs' 
                          onClick={() => onDecrement(product)}
                          data-testid='decrement'
                          borderRadius={9999}
                        >
                          {' '}-{' '}
                        </Button>
                        <Text fontWeight='500'>{product.quantity}</Text>
                        <Button
                          colorScheme='primary' 
                          size='xs' 
                          onClick={() => onIncrement(product)}
                          data-testid='increment'
                          borderRadius={9999}
                        >
                          {' '}+{' '}
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                )
              })}
            </Stack>
            ) : (
            <Text color='gray.400'>No hay elementos en tu carrito</Text>
            )}
          </DrawerBody>
          
          {Boolean(items.length) && (
            <DrawerFooter paddingX={4}> 
              <Stack width='100%' spacing={4}>
                <Divider></Divider>
                <Stack 
                  direction='row' 
                  justifyContent='space-between' 
                  alignItems='center'
                  fontWeight='500'
                  fontSize='lg'
                >
                  <Text>Total</Text>
                  <Text>{total}</Text>
                </Stack>
                <Button
                  data-testid='complete-order'
                  as={Link}
                  padding={4}
                  isExternal
                  size='lg'
                  colorScheme="whatsapp"
                  leftIcon={<Image src='https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff' />}
                  width='100%'
                  href={`https://wa.me/${INFORMATION.phone}?text=${encodeURIComponent(text)}`}
                >
                  Completar pedido
                </Button>
              </Stack>
            </DrawerFooter>
          )}
        </DrawerContent>
    </Drawer>
  )
}

export default CartDrawer


