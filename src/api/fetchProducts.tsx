import { db } from '@/firebase'
import { useQuery } from '@tanstack/react-query'
import { collection, query, getDocs, orderBy } from 'firebase/firestore'

export type fetchProductProps = {
  name: string
  description: string
  price: string
  imageURL: string
  category: string
  createdAt: {
    seconds: number
    nanoseconds: number
  }
}

const fetchProducts = async () => {
  const productsCol = collection(db, 'products')
  const q = query(productsCol, orderBy('createdAt', 'desc'))

  const querySnapshot = await getDocs(q)
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as fetchProductProps),
  }))

  return products
}

const useQueryProducts = () => {
  return useQuery({ queryKey: ['products'], queryFn: fetchProducts })
}

export default useQueryProducts
