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
export interface TypeChildren {
  children: React.ReactNode
}
export interface cartItem {
  product: TypeProduct
  quantity: number
}

export type TypeOrder = 'Dine in' | 'Take out'
