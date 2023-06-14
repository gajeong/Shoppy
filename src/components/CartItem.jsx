import React from 'react'
import {
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
} from 'react-icons/ai'
import { RiDeleteBin3Fill } from 'react-icons/ri'

import useCart from '../hooks/useCart'

const ICON_CLASS =
  'transition-all cursor-pointer hover:text-brand hover:scale-105'
export default function CartItem({
  product,
  product: { id, img, productNm, price, quantity, option },
  uid,
}) {
  const { addOrUpdateItem, removeItem } = useCart()
  const handleMinus = () => {
    if (quantity < 2) return
    addOrUpdateItem.mutate({
      ...product,
      quantity: quantity - 1,
    })
  }
  const handlePlus = () =>
    addOrUpdateItem.mutate({
      ...product,
      quantity: quantity + 1,
    })

  const handleDelete = () => removeItem.mutate(id)

  return (
    <li className='flex justify-between mmy-2 items-center'>
      <img
        className='w-24  md:w-48 rounded-sm '
        src={img}
        alt={productNm}
      />
      <div className='flex justify-between flex-1 ml-4'>
        <div className='basis-3/5'>
          <p className='text-lg'>{productNm}</p>
          <p className='text-xl font-bold text-brand'>
            {option}ml
          </p>
        </div>
        <div className='flex text-2xl items-center'>
          <AiOutlineMinusSquare
            className={ICON_CLASS}
            onClick={handleMinus}
          />
          <span>{quantity}</span>
          <AiOutlinePlusSquare
            className={ICON_CLASS}
            onClick={handlePlus}
          />
          <RiDeleteBin3Fill
            className={ICON_CLASS}
            onClick={handleDelete}
          />
        </div>
      </div>
    </li>
  )
}
