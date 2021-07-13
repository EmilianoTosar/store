import { CartItem, Product } from "./types"

export function editCart(product: Product, action: 'decrement' | 'increment') {
  return (cart: CartItem[]): CartItem[] => {  
    const isInCart = cart.some(item => item.id === product.id)

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
  }
}  
 