import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({
  product,
  product: { id, img, productNm, options, price },
}) {
  const navigate = useNavigate()
  return (
    <li
      onClick={() =>
        navigate(`products/${id}`, { state: { product } })
      }
      className='rounded-md shadow-md overflow-hidden cursor-pointer p-2 hover:scale-105'
    >
      <img className='w-full' src={img} alt={productNm} />
      <div className='mt-2 px-2 text-lg flex justify-between items-center'>
        <h3 className='text-2xl truncate font-semibold'>
          {productNm}
        </h3>
        <p>{price.toLocaleString()}원</p>
      </div>
      <p className='mt-2 px-2'>{options}</p>
    </li>
  )
}
