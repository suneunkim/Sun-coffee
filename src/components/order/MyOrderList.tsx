import { TypeOrderData } from '@/types/common'
import formattedDate from '@/utils/formattedDate'
import useOrderStatus from '@/api/updateOrderStatus'
import { Suspense, lazy } from 'react'
import Loading from '../common/Loading'

const DetailList = lazy(() => import('./DetailList'))

interface Props {
  data: TypeOrderData
}

const MyOrderList = ({ data }: Props) => {
  const { updateOrderStatus } = useOrderStatus()

  return (
    <div className="border bg-white rounded-lg p-3 shadow-sm text-sm">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <span
              className={`p-1 rounded-md ${
                data.order_status === '주문 완료'
                  ? 'bg-orange-200'
                  : data.order_status === '주문 취소'
                  ? 'bg-red-200'
                  : data.order_status === '제조 대기'
                  ? 'bg-yellow-200'
                  : data.order_status === '제조 완료'
                  ? 'bg-green-200'
                  : 'bg-gray-200'
              }`}
            >
              {data.order_status}
            </span>
            {data.order_status === '주문 완료' ? (
              <div className="flex space-x-2 items-center">
                <p className="text-xs">주문을 취소할 수 있습니다.</p>
                <button
                  onClick={() => updateOrderStatus(data.order_id!, '주문 취소')}
                  className="bg-gray-300 p-1 rounded-md"
                >
                  주문 취소하기
                </button>
              </div>
            ) : (
              <p className="text-xs">지금은 주문을 취소할 수 없습니다.</p>
            )}
          </div>
          <h3 className="font-semibold">{`주문번호 : ${data.order_id
            ?.toUpperCase()
            .slice(0, 6)}`}</h3>

          {data.order_status !== '주문 취소' ? (
            <p className="text-xs text-gray-600">결제가 완료되었습니다</p>
          ) : (
            <p className="text-xs text-gray-600">결제가 취소되었습니다</p>
          )}
        </div>
        <div className="flex flex-col">
          <span>{formattedDate(data?.timestamp)}</span>
          <p className="ml-auto font-semibold text-gray-800">
            {data.total_amount.toLocaleString('ko-kr')}원
          </p>
        </div>
      </div>
      <section>
        <Suspense fallback={<Loading />}>
          <DetailList products={data?.products} id={data?.order_id!} />
        </Suspense>
      </section>
    </div>
  )
}

export default MyOrderList
