import * as React from 'react'
import { Stack, Text, Divider, Flex, Image, Button } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { parseCurrency } from '../../utils/currency'
import { Product } from '../types'

interface Props {
  product: Product
  onAdd: (product: Product) => void
}

const ProductCard: React.FC<Props> = ({product, onAdd}) => {
  const [selectedImage, setSelectedImage] = React.useState<string>(null)

  return (
    <>
      <Stack data-testid='product' spacing={3} borderRadius='md' padding={4} key={product.id} backgroundColor="gray.100">
        <Stack spacing={1}>
          <Image 
            src={product.image}
            alt={product.title}
            as={motion.img}
            cursor='pointer'
            loading='lazy'
            layoutId={product.image}
            maxHeight={220}
            objectFit='cover' 
            borderTopRadius='md'
            onClick={() => setSelectedImage(product.image)}
          />
          <Text fontWeight='500'>{product.title}</Text>
          <Text fontSize='sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Text>
          <Divider color='blackAlpha'/>
          <Text fontSize='sm' fontWeight='500' color='green.500'>{parseCurrency(product.price)}</Text>
        </Stack>
        <Button 
          colorScheme="primary"
          size='sm'
          variant='outline'
          onClick={() => onAdd(product) }
        >
          Agregar
        </Button>
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
    </>
  )
}

export default ProductCard

