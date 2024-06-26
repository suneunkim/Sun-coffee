import { db } from '@/firebase'
import {
  collection,
  query,
  getDocs,
  orderBy,
  startAfter,
  limit,
  where,
  documentId,
} from 'firebase/firestore'
import { TypeCategory, TypeOrderData, TypeProduct } from '@/types/common'

// 일반 홈 상품 조회
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
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
  const products = querySnapshot.docs.map((doc) => ({
    ...(doc.data() as TypeProduct),
  }))
  //console.log('Last Visible Document:', lastVisible)
  //console.log('querySnapshot', querySnapshot)
  return { products, nextPage: lastVisible }
}

// 상품 디테일 모달의 추천 상품 3가지
export const fetchRecommendProduct = async (
  category: TypeCategory,
  excludeProductId: string
) => {
  if (!category || !excludeProductId) {
    console.error('카테고리나 상품 ID가 undefined')
    return []
  }
  const productsCol = collection(db, 'products')
  const q = query(
    productsCol,
    where('category', '==', category),
    where(documentId(), '!=', excludeProductId),
    orderBy('createdAt', 'desc'),
    limit(3)
  )
  const querySnapshot = await getDocs(q)
  const recommendProduct = querySnapshot.docs.map((doc) => ({
    ...(doc.data() as TypeProduct),
  }))
  return recommendProduct
}

// 판매자 페이지. 무한 스크롤 적용 X
export const fetchSellerProducts = async () => {
  const productsCol = collection(db, 'products')
  const q = query(productsCol, orderBy('createdAt', 'desc'))

  const querySnapshot = await getDocs(q)
  const products = querySnapshot.docs.map((doc) => ({
    ...(doc.data() as TypeProduct),
  }))

  return products
}

// ORDER
export const fetchOrderList = async (email: string) => {
  const orderCol = collection(db, 'orders')
  const q = query(
    orderCol,
    where('customer_email', '==', email),
    orderBy('timestamp', 'desc')
  )

  const querySnapshot = await getDocs(q)
  const orderlist = querySnapshot.docs.map((doc) => ({
    ...(doc.data() as TypeOrderData),
  }))

  return orderlist
}
