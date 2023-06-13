import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  getProducts as fetchProducts,
  addNewProduct,
} from '../api/firebase'

export default function useProducts() {
  const queryClient = useQueryClient()

  const productsQuery = useQuery(
    ['products'],
    fetchProducts,
    {
      staleTime: 1 * 60 * 1000,
    }
  )

  const addProduct = useMutation(
    ({ product, url }) => {
      addNewProduct({ ...product, img: url })
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['products']),
    }
  )

  return { productsQuery, addProduct }
}
