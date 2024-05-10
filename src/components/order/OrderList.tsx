import { TypeOrderData } from '@/types/common'
import DetailList from './DetailList'
import formattedDate from '@/utils/formattedDate'

interface Props {
  data: TypeOrderData
}

const OrderList = ({ data }: Props) => {
  return (
    <div className="border bg-white rounded-lg p-3 shadow-sm text-sm">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">{`주문번호 : ${data.order_id
            ?.toUpperCase()
            .slice(0, 6)}`}</h3>
          <p className="py-2 text-xs text-gray-600">결제가 완료되었습니다</p>
        </div>
        <div className="flex flex-col">
          <span>{formattedDate(data?.timestamp)}</span>
          <p className="ml-auto font-semibold text-gray-800">
            {data.total_amount.toLocaleString('ko-kr')}원
          </p>
        </div>
      </div>
      <section>
        <DetailList products={data?.products} id={data?.order_id!} />
      </section>
    </div>
  )
}

export default OrderList
