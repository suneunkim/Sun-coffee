import { useQueryInitialProducts } from '@/api/fetchProducts'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'
import { TypeCategory, TypeProduct } from '@/types/common'

import ProductCardSkelton from './ProductCardSkelton'
import { useState } from 'react'
import DetailModal from './DetailModal'

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState<TypeProduct | null>(
    null
  )
  const [showDetailModal, setShowDetailModal] = useState(false)
  const handleProductSelect = (data: TypeProduct) => {
    setSelectedProduct(data)
    setShowDetailModal(true)
  }
  const categories: TypeCategory[] = ['coffee', 'non-coffee', 'food']
  const categoryHeader = {
    coffee: '에스프레소',
    food: '베이커리',
    'non-coffee': '기타 제조 음료',
  }

  return (
    <div className="flex justify-center">
      <div className="min-w-[880px] h-[770px] overflow-y-auto">
        {categories.map((category) => (
          <div key={category}>
            <div className="w-[860px] flex justify-between p-4 bg-[#f0eaeac9] my-5 rounded-md">
              <h2>{categoryHeader[category]}</h2>
              <Link to={`/${category}`}>더보기</Link>
            </div>
            <ProductPreview
              handleProductSelect={handleProductSelect}
              category={category}
            />
          </div>
        ))}
      </div>
      {showDetailModal && (
        <DetailModal
          product={selectedProduct}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  )
}

export default ProductList

type ProductPreviwProps = {
  category: TypeCategory
  handleProductSelect: (data: TypeProduct) => void
}

const ProductPreview: React.FC<ProductPreviwProps> = ({
  category,
  handleProductSelect,
}) => {
  const { data, isLoading } = useQueryInitialProducts(category)
  return (
    <div className="grid grid-cols-2 gap-1">
      {isLoading && <ProductCardSkelton productsPerRow={4} />}
      {data?.products.map((product) => (
        <ProductCard
          data={product}
          key={product.id}
          onModal={(data) => handleProductSelect(data)}
        />
      ))}
    </div>
  )
}
