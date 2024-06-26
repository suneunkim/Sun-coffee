import { useInView } from "react-intersection-observer";
import { Suspense, lazy, useEffect, useState } from "react";
import { useCategoryQueryProducts } from "@/api/productQueries";
import { Navigate, useParams } from "react-router-dom";
import ProductCard from "@/components/Product/ProductCard";
import PageLayout from "@/components/common/PageLayout";
import { TypeCategory } from "@/types/common";
import useProductModal from "@/hooks/useProductModal";
import Loading from "@/components/common/Loading";
const DetailModal = lazy(() => import("@/components/Product/DetailModal"));

const CategoryPage = () => {
  const { selectedProduct, showDetailModal, handleProductSelect, closeModal } =
    useProductModal();
  const { ref, inView } = useInView();
  const { category } = useParams();
  const [orderByPrice, setOrderByPrice] = useState(false);

  const validCategories: TypeCategory[] = ["coffee", "food", "non-coffee"];
  if (!category || !validCategories.includes(category as TypeCategory)) {
    return <Navigate to="/" replace />;
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCategoryQueryProducts(category as TypeCategory, orderByPrice);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <PageLayout>
      <button onClick={() => setOrderByPrice(false)}>최신순</button>
      <button onClick={() => setOrderByPrice(true)}>가격순</button>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-5 mt-10 min-w-[870px] min-h-[600px] max-h-[620px] overflow-y-auto">
          {data?.pages &&
            data?.pages.flatMap((page) =>
              page.products.map((product) => (
                <ProductCard
                  onModal={(product) => handleProductSelect(product)}
                  data={product}
                  key={product.name}
                />
              )),
            )}
          <div ref={hasNextPage ? ref : undefined} />
          {isFetchingNextPage && <p>Loading more...</p>}
        </div>
        {showDetailModal && (
          <Suspense fallback={<Loading />}>
            <DetailModal
              product={selectedProduct}
              onClose={() => closeModal()}
              onModal={(data) => handleProductSelect(data)}
            />
          </Suspense>
        )}
      </div>
    </PageLayout>
  );
};

export default CategoryPage;
