import { useQueryOrderList } from "@/api/productQueries";
import Loading from "@/components/common/Loading";
import PageLayout from "@/components/common/PageLayout";
import { Suspense, lazy } from "react";
const MyOrderList = lazy(() => import("@/components/order/MyOrderList"));

const MyOrder = () => {
  const { data } = useQueryOrderList();

  return (
    <PageLayout>
      <section className="max-h-[770px] overflow-y-auto min-w-[700px] space-y-5 gap-5 flex flex-col">
        {data?.map((order) => (
          <Suspense fallback={<Loading />} key={order.order_id}>
            <MyOrderList data={order} />
          </Suspense>
        ))}
      </section>
    </PageLayout>
  );
};

export default MyOrder;
