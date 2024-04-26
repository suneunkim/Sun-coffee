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
import { TypeCategory } from '@/types/common'

export type fetchProductProps = {
  id: string
  name: string
  description: string
  price: string
  imageURL: string
  category: TypeCategory
  createdAt: {
    seconds: number
    nanoseconds: number
  }
}

export const fetchCategoryProducts = async (
  category: TypeCategory,
  pageParam: string | null,
  orderByPrice: boolean = false
) => {
  const productsCol = collection(db, 'products')

  let q
  if (pageParam) {
    q = query(
      productsCol,
      where('category', '==', category),
      orderBy(
        orderByPrice ? 'price' : 'createdAt',
        orderByPrice ? 'asc' : 'desc'
      ), // 가격순은 오름차순으로 설정
      startAfter(pageParam || 0),
      limit(4)
    )
  } else {
    q = query(
      productsCol,
      where('category', '==', category),
      orderBy(
        orderByPrice ? 'price' : 'createdAt',
        orderByPrice ? 'asc' : 'desc'
      ),
      limit(4)
    )
  }

  const querySnapshot = await getDocs(q)
  console.log(querySnapshot)
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
  const products = querySnapshot.docs.map((doc) => ({
    ...(doc.data() as fetchProductProps),
  }))
  //console.log('Last Visible Document:', lastVisible)
  //console.log('querySnapshot', querySnapshot)
  return { products, nextPage: lastVisible }
}

// 첫 홈 화면의 useQuery
export const useQueryInitialProducts = (category: TypeCategory) => {
  return useQuery({
    queryKey: ['initial-products', category],
    queryFn: () => fetchCategoryProducts(category, null),
    refetchOnWindowFocus: false,
  })
}

// 카테고리 별 무한 스크롤 useInfiniteQuery
export const useCategoryQueryProducts = (
  category: TypeCategory,
  orderByPrice: boolean
) => {
  return useInfiniteQuery({
    queryKey: ['products', category, { orderByPrice }],
    queryFn: ({ pageParam }) =>
      fetchCategoryProducts(category, pageParam, orderByPrice),
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ? lastPage.nextPage : undefined
    },
    refetchOnWindowFocus: false,
  })
}

// 판매자 페이지. 무한 스크롤 적용 X

export const fetchSellerProducts = async () => {
  const productsCol = collection(db, 'products')
  const q = query(productsCol, orderBy('createdAt', 'desc'))

  const querySnapshot = await getDocs(q)
  const products = querySnapshot.docs.map((doc) => ({
    ...(doc.data() as fetchProductProps),
  }))

  return products
}

export const useQuerySellerProducts = () => {
  return useQuery({ queryKey: ['products'], queryFn: fetchSellerProducts })
}
