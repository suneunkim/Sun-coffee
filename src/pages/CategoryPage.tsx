import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { useCategoryQueryProducts } from '@/api/fetchProducts'
import { Navigate, useParams } from 'react-router-dom'
import ProductCard from '@/components/Product/ProductCard'
import PageLayout from '@/components/common/PageLayout'
import { TypeCategory } from '@/types/common'
// TODO: 페이지 옮겨질때(캐싱 된 이후 말고) 떨리는 현상 수정

const CategoryPage = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  })
  const { category } = useParams()

  const validCategories: TypeCategory[] = ['coffee', 'food', 'non-coffee']
  if (!category || !validCategories.includes(category as TypeCategory)) {
    return <Navigate to="/" replace />
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCategoryQueryProducts(category as TypeCategory)

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage])

  return (
    <PageLayout>
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
    </PageLayout>
  )
}

export default CategoryPage
