import { useQueryInitialProducts } from '@/api/fetchProducts'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'

const ProductList = () => {
  const categories = ['Coffee', 'Food', 'Non-Coffee']

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-5 mt-10 min-w-[870px] min-h-[600px] max-h-[620px] overflow-y-auto">
        {categories.map((category) => (
          <div key={category}>
            <div>
              <h2>{category}</h2>
              <Link to={`/${category}`}>더 보기</Link>
            </div>

            <div className="">
              <ProductPreview category={category} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList

type Category = 'Coffee' | 'Food' | 'Non Coffee'
type ProductPreviwProps = {
  category: any
}

const ProductPreview: React.FC<ProductPreviwProps> = ({ category }) => {
  const { data } = useQueryInitialProducts(category)
  return (
    <div className="">
      {data?.products.map((product) => (
        <ProductCard data={product} key={product.id} />
      ))}
    </div>
  )
}
