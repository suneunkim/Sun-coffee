import fetchProducts from '@/api/fetchProducts'
import ProductCard from './ProductCard'
import { useEffect, useState } from 'react'

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

const ProductList = () => {
  const [products, setProducts] = useState<ProductProps[]>([])

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedproducts = await fetchProducts()
      setProducts(fetchedproducts)
    }
    loadProducts()
  }, [])

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-5 mt-10 min-w-[830px] min-h-[600px] max-h-[620px] overflow-y-auto">
        {products.map((product) => (
          <ProductCard data={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}

export default ProductList
