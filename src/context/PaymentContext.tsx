import { createContext, useContext, useState } from 'react'
import {
  TypeChildren,
  TypeOrderData,
  TypeOrderUserData,
  paymentDataProps,
} from '@/types/common'
import startPayment from '@/components/Payment/Payment'
import { useCart } from './CartContext'

interface PaymentContextProps {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  updateOrderData: (data: TypeOrderData) => void
  updateOrderUserData: (data: TypeOrderUserData) => void
  handlePayment: () => void
  orderUserData: TypeOrderUserData | null
}

const PaymentContext = createContext<PaymentContextProps | null>(null)

export const usePayment = () => useContext(PaymentContext)

export const PaymentProvider = ({ children }: TypeChildren) => {
  // 장바구니 비우기 위한 함수를 handlePayment의 콜백함수에 넣기 위함
  const cartContext = useCart()
  if (!cartContext) {
    return
  }
  const { clearCart, closeCart } = cartContext

  const [isOpen, setIsOpen] = useState(false)
  const [orderData, setOrderData] = useState<TypeOrderData | null>(null) // DB에 저장할 데이터
  const [orderUserData, setOrderUserData] = useState<TypeOrderUserData | null>(
    null
  ) // 결제모달창 유저 정보

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  // 카트 컴포넌트에서 DB에 저장할 데이터 받아오기
  const updateOrderData = (data: TypeOrderData) => {
    setOrderData(data)
  }

  // 결제 모달창에서 받은 유저 정보 받아오기
  const updateOrderUserData = (data: TypeOrderUserData) => {
    setOrderUserData(data)
  }

  // PG사에 보낼 데이터만들기
  const createPaymentData = () => {
    if (!orderData || !orderUserData) {
      console.error('주문 데이터 또는 사용자 데이터가 누락되었습니다.')
      return
    }

    const firstProductName = orderData.products[0]?.name
    const additionalProductCount = orderData.products.length - 1
    const paymentName =
      additionalProductCount > 0
        ? `${firstProductName} 외 ${additionalProductCount}개`
        : firstProductName

    const paymentData: paymentDataProps = {
      ...orderUserData,
      buyer_email: orderUserData.buyer_email || '',
      pg: 'html5_inicis', // KG 이니시스
      pay_method: 'card',
      merchant_uid: `merchant_${new Date().getTime()}`, // 고유 주문번호
      name: paymentName, // 구매 상품명
      amount: orderData.total_amount, // 총 결제 금액
    }
    return paymentData
  }
  // PG사에 결제 요청 보내기
  const handlePayment = () => {
    const paymentData = createPaymentData()
    if (paymentData && orderData) {
      startPayment(paymentData, orderData, () => {
        setOrderData(null)
        setOrderData(null)
        closeModal()
        clearCart()
        closeCart()
      })
    } else {
      console.error('결제 데이터 또는 주문 데이터가 누락되었습니다')
    }
  }

  return (
    <PaymentContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        updateOrderData,
        updateOrderUserData,
        handlePayment,
        orderUserData,
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}
