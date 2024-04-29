import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { TypeCategory } from '@/types/common'
import {
  fetchCategoryProducts,
  fetchRecommendProduct,
  fetchSellerProducts,
} from './fetchProducts'

// 첫 홈 화면의 useQuery
export const useQueryInitialProducts = (category: TypeCategory) => {
  return useQuery({
    queryKey: ['initial-products', category],
    queryFn: () => fetchCategoryProducts(category, null),
    refetchOnWindowFocus: false,
  })
}

// 카테고리 별 무한 스크롤 useInfiniteQuery
export const useCategoryQueryProducts = (
  category: TypeCategory,
  orderByPrice: boolean
) => {
  return useInfiniteQuery({
    queryKey: ['products', category, { orderByPrice }],
    queryFn: ({ pageParam }) =>
      fetchCategoryProducts(category, pageParam, orderByPrice),
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ? lastPage.nextPage : undefined
    },
    refetchOnWindowFocus: false,
  })
}

export const useQueryRecommendProduct = (
  category: TypeCategory,
  excludeProductId: string
) => {
  return useQuery({
    queryKey: ['Recommend', category, excludeProductId],
    queryFn: () => fetchRecommendProduct(category, excludeProductId),
    refetchOnWindowFocus: false,
    enabled: !!category && !!excludeProductId,
  })
}

// 판매자 홈에서 사용하는 useQuery
export const useQuerySellerProducts = () => {
  return useQuery({ queryKey: ['products'], queryFn: fetchSellerProducts })
}
