import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { getCart } from '../../api/firebase'
import { useAuthContext } from '../context/AuthContext'
export default function CartStatus() {
  const { user } = useAuthContext()
  const { data: products } = useQuery(['carts'], () =>
    getCart(user.uid)
  )
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
