export interface TypeChildren {
  children: React.ReactNode
}

export type TypeCategory = 'coffee' | 'non-coffee' | 'food'

export type TypeProduct = {
  id: string
  name: string
  description: string
  price: string
  imageURL: string
  category: TypeCategory
  createdAt: {
    seconds: number
    nanoseconds: number
  }
}

// 장바구니
export interface cartItem {
  product: TypeProduct
  quantity: number
}

export type TypeOrder = 'Dine in' | 'Take out'

export type TypeOrderData = {
  products: {
    name: string
    quantity: number
    subtotal: number
  }[]
  total_amount: number
  order_status: string
  order_type: TypeOrder
  timestamp: Date
  customer_name: string | undefined
  customer_email: string | undefined
}

// 결제

export type TypeOrderUserData = {
  buyer_name: string
  buyer_tel: string
  buyer_email: string
  buyer_addr: string
  buyer_postcode: string
}

export interface paymentDataProps extends TypeOrderUserData {
  pg: string
  pay_method: string
  merchant_uid: string
  name: string
  amount: number
}
