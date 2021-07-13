/**
 * @jest-environment jsdom
 */

import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import CartDrawer from '../CartDrawer'
import { CartItem } from '../../types'

const cart: CartItem[] = [{
  id: 'id',
  category: 'category',
  description: 'description',
  image: 'image', 
  price: 100,
  title: 'title',
  quantity: 2
}]

test('deberia llamar onDecrement cuando resto un producto', () => {
  const onDecrement = jest.fn()
  
  render(
    <CartDrawer 
      isOpen 
      onClose={jest.fn()} 
      items={cart} 
      onIncrement={jest.fn()} 
      onDecrement={onDecrement} 
    />
  )

  fireEvent.click(screen.getByTestId('decrement'))

  expect(onDecrement).toHaveBeenCalled()
})

test('deberia llamar onIncrement cuando agrego un producto', () => {
  const onIncrement = jest.fn()
  
  render(
    <CartDrawer 
      isOpen 
      onClose={jest.fn()} 
      items={cart} 
      onIncrement={onIncrement} 
      onDecrement={jest.fn()} 
    />
  )

  fireEvent.click(screen.getByTestId('increment'))

  expect(onIncrement).toHaveBeenCalled()
})

test('muestro un mensaje de que no hay items cuando el cart esta vacio', () => {
  render(
    <CartDrawer 
      isOpen 
      onClose={jest.fn()} 
      items={[]} 
      onIncrement={jest.fn()} 
      onDecrement={jest.fn()} 
    />
  )

  expect(screen.getByText('No hay elementos en tu carrito')).toBeInTheDocument()
})

