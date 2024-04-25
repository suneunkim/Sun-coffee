import { db } from '@/firebase'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import {
  collection,
  query,
  getDocs,
  orderBy,
  startAfter,
  limit,
} from 'firebase/firestore'

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

export const fetchProducts = async ({ pageParam = null }) => {
  const productsCol = collection(db, 'products')
  let q

  if (pageParam) {
    q = query(
      productsCol,
      orderBy('createdAt', 'desc'),
      startAfter(pageParam || 0),
      limit(4)
    )
  } else {
    q = query(productsCol, orderBy('createdAt', 'desc'), limit(4))
  }

  const querySnapshot = await getDocs(q)
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as fetchProductProps),
  }))
  console.log('Last Visible Document:', lastVisible)
  return { products, nextPage: lastVisible }
}

export const useQueryProducts = () => {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ? lastPage.nextPage : undefined
    },
    refetchOnWindowFocus: false,
  })
}

// 판매자 페이지는 무한 스크롤 적용 X

export const fetchSellerProducts = async () => {
  const productsCol = collection(db, 'products')
  const q = query(productsCol, orderBy('createdAt', 'desc'))

  const querySnapshot = await getDocs(q)
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as fetchProductProps),
  }))

  return products
}

export const useQuerySellerProducts = () => {
  return useQuery({ queryKey: ['products'], queryFn: fetchSellerProducts })
}
