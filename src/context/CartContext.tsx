import { createContext, useContext, useState, useEffect } from 'react'
import { TypeProduct, TypeChildren, cartItem } from '@/types/common'

interface CartContextProps {
  cart: cartItem[]
  addToCart: (item: TypeProduct) => void
  removeFromCart: (name: string) => void
  changeQuantity: (name: string, quantity: number) => void
}

const CartContext = createContext<CartContextProps | null>(null)

export const CartProvider = ({ children }: TypeChildren) => {
  const [cart, setCart] = useState<cartItem[]>(() => {
    // 로컬 스토리지에서 장바구니 불러오기
    return JSON.parse(localStorage.getItem('cart') || '[]')
  })

  useEffect(() => {
    // 장바구니 상태가 변경되면 로컬 스토리지 업데이트
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: TypeProduct) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.product.name === item.name
    )
    if (existingItem) {
      const updateCart = cart.map((cartItem) => {
        if (cartItem.product.name === item.name) {
          return { ...cartItem, quantity: cartItem.quantity + 1 }
        }
        return cartItem
      })
      setCart(updateCart)
    } else {
      setCart((prev: any) => [...prev, { product: item, quantity: 1 }])
    }
  }

  const removeFromCart = (name: string) => {
    setCart((prev: any) =>
      prev.filter((item: any) => item.product.name !== name)
    )
  }

  const changeQuantity = (name: string, quantity: number) => {
    const updatedQuantity = cart.map((cartItem) => {
      if (cartItem.product.name === name) {
        return {
          ...cartItem,
          quantity: Math.max(cartItem.quantity + quantity, 1),
        }
      }
      return cartItem
    })
    setCart(updatedQuantity)
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, changeQuantity }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
