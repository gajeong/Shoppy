import React from 'react'
import { useAuthContext } from '../components/context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { getCart } from '../api/firebase'
import CartItem from '../components/CartItem'
import PriceCard from '../components/PriceCard'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { FaEquals } from 'react-icons/fa'
export default function MyCarts() {
  const { user } = useAuthContext()
  const { isLoading, data: products } = useQuery(
    ['carts'],
    () => getCart(user.uid)
  )
  if (isLoading) return <p>loading,,,</p>
  const hasProducts = products && products.length > 0
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) =>
        prev + parseInt(current.price) * current.quantity
    )

  const SHIPPING = 3000
  return (
    <section>
      <p>장바구니</p>
      {!hasProducts && (
        <p> 장바구니에 상품이 없습니다 ! </p>
      )}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  uid={user.uid}
                />
              ))}
          </ul>
          <div>
            <PriceCard
              text='상품 총액'
              price={totalPrice}
            />
            <BsFillPlusCircleFill />
            <PriceCard text='배송액' price={SHIPPING} />
            <FaEquals />
            <PriceCard
              text='총 가격'
              price={totalPrice + SHIPPING}
            />
          </div>
        </>
      )}
    </section>
  )
}
