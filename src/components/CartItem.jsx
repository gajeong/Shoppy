import React from 'react'
import {
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
} from 'react-icons/ai'
import { RiDeleteBin3Fill } from 'react-icons/ri'
import {
  addOrUpdateToCart,
  removeFromCart,
} from '../api/firebase'
export default function CartItem({
  product,
  product: { id, img, productNm, price, quantity, option },
  uid,
}) {
  const handleMinus = () => {
    if (quantity < 2) return
    addOrUpdateToCart(uid, {
      ...product,
      quantity: quantity - 1,
    })
  }
  const handlePlus = () =>
    addOrUpdateToCart(uid, {
      ...product,
      quantity: quantity + 1,
    })

  const handleDelete = () => removeFromCart(uid, id)

  return (
    <li className='flex'>
      <img
        className='w-12 h-12'
        src={img}
        alt={productNm}
      />
      <div className='flex justify-around'>
        <p>{productNm}</p>
        <p>{option}ml</p>
        <div className='flex'>
          <AiOutlineMinusSquare onClick={handleMinus} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare onClick={handlePlus} />
          <RiDeleteBin3Fill onClick={handleDelete} />
        </div>
      </div>
    </li>
  )
}
