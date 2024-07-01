import { useQuerySearched } from '@/api/productQueries'
import ProductCard from '@/components/Product/ProductCard'
import PageLayout from '@/components/common/PageLayout'
import { useParams } from 'react-router-dom'
import { TypeProduct } from '@/types/common'
import useProductModal from '@/hooks/useProductModal'
import DetailModal from '@/components/Product/DetailModal'

const SearchProduct = () => {
  const { keyword } = useParams()
  const { data } = useQuerySearched(keyword!)

  const { selectedProduct, showDetailModal, handleProductSelect, closeModal } =
    useProductModal()

  return (
    <PageLayout>
      <div className="min-w-[880px] h-[770px] overflow-y-auto mt-10">
        {data?.length === 0 && <div>상품이 없습니다.</div>}
        <div className="grid grid-cols-2 gap-1">
          {data?.map((product) => (
            <ProductCard
              key={product.id}
              data={product as TypeProduct}
              onModal={(data) => handleProductSelect(data)}
            />
          ))}
        </div>
        {showDetailModal ? (
          <DetailModal
            product={selectedProduct}
            onClose={() => closeModal()}
            onModal={(data) => handleProductSelect(data)}
          />
        ) : null}
      </div>
    </PageLayout>
  )
}

export default SearchProduct
