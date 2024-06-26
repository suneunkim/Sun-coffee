import { useQueryOrderList } from '@/api/productQueries'
import Loading from '@/components/common/Loading'
import PageLayout from '@/components/common/PageLayout'
import useCurrentUser from '@/hooks/useCurrentUser'
import { Suspense, lazy } from 'react'
const MyOrderList = lazy(() => import('@/components/order/MyOrderList'))

const MyOrder = () => {
  const { email } = useCurrentUser() || {}
  const { data } = useQueryOrderList(email!)

  return (
    <PageLayout>
      <section className="max-h-[770px] overflow-y-auto min-w-[700px] space-y-5 gap-5 flex flex-col">
        {!email && <div>로그인이 필요합니다.</div>}
        {data?.length === 0 && <div>주문내역이 없습니다.</div>}
        {data?.map((order) => (
          <Suspense fallback={<Loading />} key={order.order_id}>
            <MyOrderList data={order} />
          </Suspense>
        ))}
      </section>
    </PageLayout>
  )
}

export default MyOrder
