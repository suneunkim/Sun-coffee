import { TypeOrderData } from "@/types/common";
import formattedDate from "@/utils/formattedDate";
import useOrderStatus from "@/api/updateOrderStatus";

interface Props {
  data: TypeOrderData;
}

const SellerOrderHistory = ({ data }: Props) => {
  const { updateOrderStatus } = useOrderStatus();

  return (
    <div className="border bg-white rounded-lg p-3 shadow-sm text-sm">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <span
              className={`p-1 rounded-md ${
                data.order_status === "주문 완료"
                  ? "bg-orange-200"
                  : data.order_status === "주문 취소"
                    ? "bg-red-200"
                    : data.order_status === "제조 대기"
                      ? "bg-yellow-200"
                      : data.order_status === "제조 완료"
                        ? "bg-green-200"
                        : "bg-gray-200"
              }`}
            >
              {data.order_status}
            </span>
          </div>
          <h3 className="font-semibold">{`주문번호 : ${data.order_id
            ?.toUpperCase()
            .slice(0, 6)}`}</h3>

          {data.order_status !== "주문 취소" ? (
            <p className="text-xs text-gray-600">결제가 완료되었습니다</p>
          ) : (
            <p className="text-xs text-gray-600">결제가 취소되었습니다</p>
          )}
        </div>
        <div className="flex flex-col">
          <span>{formattedDate(data?.timestamp)}</span>
          <p className="ml-auto font-semibold text-gray-800">
            {data.total_amount.toLocaleString("ko-kr")}원
          </p>
        </div>
      </div>
      <section>
        {data?.products.map((product, i) => (
          <div key={data.order_id! + i}>
            <div className="flex items-start">
              <div className="w-12 h-12 bg-orange-100 rounded-lg my-2 mr-2">
                {product.imageURL ? (
                  <img src={product.imageURL} alt={product.name} className="" />
                ) : (
                  <div />
                )}
              </div>
              <div className="flex flex-col my-2">
                <h4>{product.name}</h4>
                <div className="space-x-5">
                  <span>{product.subtotal.toLocaleString("ko-kr")}원</span>
                  <span className="text-gray-600">{`x ${product.quantity}`}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {data?.order_status !== "주문 취소" && (
          <div className="flex gap-5 mt-3">
            <button
              onClick={() => updateOrderStatus(data.order_id!, "주문 취소")}
              className="p-2 rounded-md bg-red-100"
            >
              주문 취소하기
            </button>
            <button
              onClick={() => updateOrderStatus(data.order_id!, "제조 대기")}
              className="p-2 rounded-md bg-yellow-100"
            >
              제조 대기로 변경하기
            </button>
            <button
              onClick={() => updateOrderStatus(data.order_id!, "제조 완료")}
              className="p-2 rounded-md bg-green-100"
            >
              제조 완료로 변경하기
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default SellerOrderHistory;
