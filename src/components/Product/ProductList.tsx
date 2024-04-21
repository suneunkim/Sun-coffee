import ProductCard from './ProductCard'

const ProductList = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-5 mt-10 min-w-[830px] min-h-[600px] max-h-[620px] overflow-y-auto">
        <ProductCard />
      </div>
    </div>
  )
}

export default ProductList
