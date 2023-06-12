import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getProducts } from '../api/firebase'
import ProductCard from './ProductCard'

export default function Products() {
  const {
    loading,
    error,
    data: products,
  } = useQuery(['products'], getProducts)

  console.log(products)
  return (
    <div>
      {loading && <p>loading</p>}

      {error && <p> error </p>}
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
        {products &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
      </ul>
    </div>
  )
}
