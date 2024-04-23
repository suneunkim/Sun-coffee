import { db } from '@/firebase'
import { collection, query, getDocs, orderBy } from 'firebase/firestore'

interface fetchProductsProduct {
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
    ...(doc.data() as fetchProductsProduct),
  }))

  return products
}

export default fetchProducts
