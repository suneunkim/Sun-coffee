import fetchProducts from '@/api/fetchProducts'
import { useEffect, useState } from 'react'
import SellerProductCard from './SellerProductCard'
import EditProduct from './EditProduct'

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

  const handleEditClick = (data: any) => {
    setSelectedProduct(data)
    setShowEditModal(true)
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-5 mt-10 min-w-[830px] min-h-[600px] max-h-[620px] overflow-y-auto">
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
