import ProductCard from './ProductCard'

const ProductList = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-10 mt-10 min-w-[800px]">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  )
}

export default ProductList
