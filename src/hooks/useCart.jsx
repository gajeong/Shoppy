import React from 'react'
import {
  addOrUpdateToCart,
  getCart,
  removeFromCart,
} from '../api/firebase'
import {
  QueryClient,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { useAuthContext } from '../components/context/AuthContext'

export default function useCart() {
  const { user } = useAuthContext()
  const uid = user.uid
  const queryClient = new QueryClient()
  const cartQuery = useQuery(
    ['carts', uid || ''],
    () => getCart(uid),
    {
      enabled: !!uid,
      staleTime: 10 * 1000 * 60,
    }
  )
  const addOrUpdateItem = useMutation(
    (product) => addOrUpdateToCart(uid, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['carts', uid])
      },
    }
  )

  const removeItem = useMutation(
    (id) => removeFromCart(uid, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['carts', uid])
      },
    }
  )

  return { cartQuery, addOrUpdateItem, removeItem }
}
