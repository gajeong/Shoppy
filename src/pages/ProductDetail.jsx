import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../components/ui/Button'

import useCart from '../hooks/useCart'

export default function ProductDetail() {
  const {
    state: {
      product: {
        id,
        img,
        productNm,
        options,
        price,
        detail,
        size,
      },
    },
  } = useLocation()
  const [success, setSuccess] = useState()
  const { addOrUpdateItem } = useCart()

  const [selected, setSelected] = useState(size && size[0])
  const handleSelect = (e) => setSelected(e.target.value)
  const handleClick = (e) => {
    const product = {
      id,
      img,
      productNm,
      price,
      option: selected,
      quantity: 1,
    }
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess('장바구니 추가')
        setTimeout(() => setSuccess(null), 3000)
      },
    })
  }
  return (
    <section>
      <p className='px-1 my-4 text-gray-700'>{options}</p>
      <section className='flex  max:sm:flex-col'>
        <img
          src={img}
          alt={productNm}
          className='rounded-sm w-full px-4 basis-7/12'
        />
        <div className='w-full basis-5/12 flex flex-col p-4'>
          <h2 className='text-3xl font-bold pt-2 border-b border-gray-400'>
            {productNm}
            <p className='text-2xl font-bold py-2'>
              {price.toLocaleString()}원
            </p>
          </h2>
          <p>{detail}</p>
          <div className='flex items-center'>
            <label
              className='text-brand font-bold'
              htmlFor='select'
            >
              옵션
            </label>
            <select
              id='select'
              onChange={handleSelect}
              value={selected}
              className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none'
            >
              {size &&
                size.map((s, index) => (
                  <option key={index}>{s} ml</option>
                ))}
            </select>
          </div>
          <Button text='장바구니' onClick={handleClick} />
          {success && <p className='my-2'>{success} </p>}
        </div>
      </section>
    </section>
  )
}
