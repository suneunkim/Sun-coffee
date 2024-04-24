import { useInView } from 'react-intersection-observer'
import ProductCard from './ProductCard'
import useQueryProducts from '@/api/fetchProducts'

const ProductList = () => {
  const { data: products } = useQueryProducts()

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-5 mt-10 min-w-[870px] min-h-[600px] max-h-[620px] overflow-y-auto">
        {products?.map((product) => (
          <ProductCard data={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}

export default ProductList
