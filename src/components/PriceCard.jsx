import React from 'react'

export default function PriceCard({ text, price }) {
  return (
    <div className='bg-gray-5- p-8 mx-2 rounded-sm text-center text-lg '>
      <p>{text}</p>
      <p className='font-bold text-brand text-xl md:text-2xl'>
        {price}원
      </p>
    </div>
  )
}
