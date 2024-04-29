import { useQueryInitialProducts } from '@/api/fetchProducts'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'
import { TypeCategory } from '@/types/common'

import ProductCardSkelton from './ProductCardSkelton'

const ProductList = () => {
  const categories: TypeCategory[] = ['coffee', 'food', 'non-coffee']

  return (
    <div className="flex justify-center">
      <div className="min-w-[880px] min-h-[600px] max-h-[620px] overflow-y-auto">
        {categories.map((category) => (
          <div key={category}>
            <div className="w-[860px] flex justify-between p-4 bg-[#f0eaeac9] my-5 rounded-md">
              <h2>{category}</h2>
              <Link to={`/${category}`}>더보기</Link>
            </div>
            <ProductPreview category={category} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList

type ProductPreviwProps = {
  category: TypeCategory
}

const ProductPreview: React.FC<ProductPreviwProps> = ({ category }) => {
  const { data, isLoading } = useQueryInitialProducts(category)
  return (
    <div className="grid grid-cols-2 gap-1">
      {isLoading && <ProductCardSkelton productsPerRow={4} />}
      {data?.products.map((product) => (
        <ProductCard data={product} key={product.id} />
      ))}
    </div>
  )
}
