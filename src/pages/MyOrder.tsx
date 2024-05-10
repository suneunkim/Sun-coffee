import { useQueryOrderList } from '@/api/productQueries'
import PageLayout from '@/components/common/PageLayout'
import OrderList from '@/components/order/OrderList'

const MyOrder = () => {
  const { data } = useQueryOrderList()

  return (
    <PageLayout>
      <section className="max-h-[770px] overflow-y-auto min-w-[700px] space-y-5 gap-5 flex flex-col">
        {data?.map((order) => (
          <OrderList key={order.order_id} data={order} />
        ))}
      </section>
    </PageLayout>
  )
}

export default MyOrder
