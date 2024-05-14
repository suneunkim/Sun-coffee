import { Button } from '../ui/button'
import CartItem from './CartItem'
import ElButton from '../elements/Button'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'
import { usePayment } from '@/context/PaymentContext'
import useCurrentUser from '@/hooks/useCurrentUser'

interface Props {
  isCartVisible?: boolean
}

const Cart = ({ isCartVisible }: Props) => {
  const userProfile = useCurrentUser()
  const cartContext = useCart()
  if (!cartContext) {
    return
  }
  const { removeFromCart, cart, changeQuantity, orderType, handlerOrderType } =
    cartContext

  const paymentContext = usePayment()
  if (!paymentContext) {
    return
  }
  const { openModal, updateOrderData } = paymentContext

  const totalAmount = cart.reduce((total, item) => {
    return total + Number(item.product.price) * item.quantity
  }, 0)

  // 주문 타입에 따른 버튼 스타일
  const getButtonStyle = (type: string) => {
    return orderType === type
      ? 'bg-[#1f2937] text-white'
      : 'bg-white text-gray-800'
  }
  // 장바구니 정보를 DB에 담을 데이터로 가공하고 PaymentProvider의 updateOrderData함수로 전달
  const handlePlaceOrder = () => {
    if (orderType === null) {
      alert('주문 방식을 선택해주세요.')
      return
    }
    const newOrderData = {
      products: cart.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        subtotal: Number(item.product.price) * item.quantity,
        imageURL: item.product.imageURL,
      })),
      total_amount: totalAmount,
      order_status: '주문 완료',
      order_type: orderType,
      timestamp: new Date(),
      customer_name: userProfile?.nickname,
      customer_email: userProfile?.email,
    }
    updateOrderData(newOrderData)
    openModal()
  }

  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{ x: isCartVisible ? 0 : 100 }}
      exit={{ x: isCartVisible ? 100 : 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="min-h-[600px] max-h-[800px] bg-[#FFFFFF] py-10 rounded-lg shadow-lg w-[350px] px-6 overflow-y-auto">
        <div className="flex items-end justify-between mb-5">
          <h3 className="text-2xl">Cart</h3>
          <p className="text-gray-500 text-sm pr-2">
            Order <span>{`#100`}</span>
          </p>
        </div>
        <div>
          {cart?.length == 0 ? (
            <div>비었습니다</div>
          ) : (
            <>
              <div className="flex gap-2">
                <Button
                  onClick={() => handlerOrderType('Dine in')}
                  className={`rounded-3xl b border hover:text-white ${getButtonStyle(
                    'Dine in'
                  )}`}
                >
                  Dine in
                </Button>
                <Button
                  onClick={() => handlerOrderType('Take out')}
                  className={`rounded-3xl b border hover:text-white ${getButtonStyle(
                    'Take out'
                  )}`}
                >
                  Take away
                </Button>
                <Button
                  className={`rounded-3xl b border hover:text-white ${getButtonStyle(
                    'Delivery'
                  )}`}
                  disabled
                >
                  Delivery
                </Button>
              </div>
              <CartItem
                data={cart}
                onRemove={removeFromCart}
                onChangeQuantity={changeQuantity}
              />
              <div className="text-sm">
                <div className="flex justify-between py-5 px-2 mb-3 border-b border-gray-200/50">
                  <p>Total</p>
                  <span>{totalAmount.toLocaleString('ko-KR')}원</span>
                </div>
                <ElButton
                  onClick={handlePlaceOrder}
                  label="Place on order"
                  rounded
                  textWhite
                />
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Cart
