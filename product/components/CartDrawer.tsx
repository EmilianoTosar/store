import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, Stack, Text, Image, DrawerOverlay, DrawerCloseButton, DrawerHeader, Divider, Link, DrawerProps } from '@chakra-ui/react'
import * as React from 'react'
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
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tu pedido</DrawerHeader>
          <DrawerBody>
            {Boolean(items.length) ? ( 
            <Stack spacing={4} divider={<Divider />}>
              {items.map((product) => {
                return (
                  <Stack data-testid='cart-item' direction='row' key={product.id}> 
                    <Stack width='100%'>
                      <Stack direction='row' justifyContent='space-between'>
                        <Text fontWeight='500'>
                          {product.title}
                        </Text>
                        <Text color='green.400'>
                          {parseCurrency(product.price * product.quantity)}
                        </Text>
                      </Stack>
                      <Stack direction='row'>
                        <Button 
                          size='xs' 
                          onClick={() => onDecrement(product)}
                          data-testid='decrement'
                        >
                          {' '}-{' '}
                        </Button>
                        <Text>{product.quantity}</Text>
                        <Button 
                          size='xs' 
                          onClick={() => onIncrement(product)}
                          data-testid='increment'
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
                Completar pedido ({total})
              </Button>
            </DrawerFooter>
          )}
        </DrawerContent>
    </Drawer>
  )
}

export default CartDrawer


