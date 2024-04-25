import { db } from '@/firebase'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import {
  collection,
  query,
  getDocs,
  orderBy,
  startAfter,
  limit,
  where,
} from 'firebase/firestore'

type Category = 'Coffee' | 'Non Coffee' | 'Food'

export type fetchProductProps = {
  name: string
  description: string
  price: string
  imageURL: string
  category: Category
  createdAt: {
    seconds: number
    nanoseconds: number
  }
}

export const fetchCategoryProducts = async (
  category: Category,
  pageParam: string | null
) => {
  const productsCol = collection(db, 'products')

  let q
  if (pageParam) {
    q = query(
      productsCol,
      where('category', '==', category),
      orderBy('createdAt', 'desc'),
      startAfter(pageParam || 0),
      limit(4)
    )
  } else {
    q = query(
      productsCol,
      where('category', '==', category),
      orderBy('createdAt', 'desc'),
      limit(4)
    )
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

// 첫 홈 화면의 useQuery
export const useQueryInitialProducts = (category: Category) => {
  return useQuery({
    queryKey: ['initial-products', category],
    queryFn: () => fetchCategoryProducts(category, null),
    refetchOnWindowFocus: false,
  })
}

// 카테고리 별 무한 스크롤 useInfiniteQuery
export const useCategoryQueryProducts = (category: Category) => {
  return useInfiniteQuery({
    queryKey: ['products', category],
    queryFn: ({ pageParam }) => fetchCategoryProducts(category, pageParam),
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
