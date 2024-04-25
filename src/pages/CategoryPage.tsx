import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { useCategoryQueryProducts } from '@/api/fetchProducts'
import { useParams } from 'react-router-dom'
import ProductCard from '@/components/Product/ProductCard'

type Category = 'Coffee' | 'Non Coffee' | 'Food'

const CategoryPage = () => {
  const { ref, inView } = useInView()
  const { category } = useParams()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCategoryQueryProducts('Food')
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
      </div>
      <div ref={hasNextPage ? ref : undefined} />
      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  )
}

export default CategoryPage
