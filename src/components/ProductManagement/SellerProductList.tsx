import fetchProducts from '@/api/fetchProducts'
import { useEffect, useState } from 'react'
import SellerProductCard from './SellerProductCard'
import EditProduct from './EditProduct'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '@/firebase'
import { deleteObject, ref } from 'firebase/storage'

interface ProductProps {
  id: string
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

const SellerProductList = () => {
  const [products, setProducts] = useState<ProductProps[]>([])
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null
  )
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedproducts = await fetchProducts()
      setProducts(fetchedproducts)
    }
    loadProducts()
  }, [])

  const handleEditClick = (data: ProductProps) => {
    setSelectedProduct(data)
    setShowEditModal(true)
  }

  const handleDeleteClick = async (data: ProductProps) => {
    const productDocRef = doc(db, 'products', data.id)

    try {
      if (data.imageURL.startsWith('https://firebasestorage.googleapis.com')) {
        const imageRef = ref(storage, data.imageURL)
        await deleteDoc(productDocRef)
        await deleteObject(imageRef)
      }
      await deleteDoc(productDocRef)
      alert('상품이 삭제되었습니다.')
    } catch (error) {
      console.error('삭제 실패', error)
      alert('상품 삭제에 실패했습니다.')
    }
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-5 mt-10 min-w-[870px] min-h-[600px] max-h-[620px] overflow-y-auto">
        {products.length === 0 && (
          <div className="flex justify-center">
            아직 등록된 상품이 없습니다.
          </div>
        )}
        {products.map((product) => (
          <SellerProductCard
            data={product}
            key={product.id}
            onEdit={(data) => handleEditClick(data)}
            onDelete={(data) => handleDeleteClick(data)}
          />
        ))}
      </div>
      {showEditModal && (
        <div>
          <EditProduct
            selectedProduct={selectedProduct}
            onClose={() => setShowEditModal(false)}
          />
        </div>
      )}
    </div>
  )
}

export default SellerProductList
