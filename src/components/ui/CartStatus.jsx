import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import useCart from '../../hooks/useCart'
export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart()
  return (
    <div className='relative'>
      <AiOutlineShoppingCart className='text-4xl' />
      {products && (
        <p className='absolute w-6 h-6 text-center bg-brand text-white font-bold rounded-full -top-3 -right-4'>
          {products.length}
        </p>
      )}
    </div>
  )
}
