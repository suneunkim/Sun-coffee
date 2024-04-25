import { useInView } from 'react-intersection-observer'
import ProductCard from './ProductCard'
import { useQueryProducts } from '@/api/fetchProducts'
import { useEffect } from 'react'

const ProductList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useQueryProducts()
  const { ref, inView } = useInView()
  console.log(data)

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage])

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-5 mt-10 min-w-[870px] min-h-[600px] max-h-[620px] overflow-y-auto">
        {data?.pages &&
          data?.pages.flatMap((page) =>
            page.products.map((product) => (
              <ProductCard data={product} key={product.id} />
            ))
          )}

        <div ref={hasNextPage ? ref : undefined} />
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  )
}

export default ProductList
