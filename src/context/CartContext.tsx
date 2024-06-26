import { createContext, useContext, useState, useEffect } from "react";
import { TypeProduct, TypeChildren, cartItem, TypeOrder } from "@/types/common";

interface CartContextProps {
  cart: cartItem[];
  clearCart: () => void;
  addToCart: (item: TypeProduct) => void;
  removeFromCart: (name: string) => void;
  changeQuantity: (name: string, quantity: number) => void;
  orderType: TypeOrder | null;
  handlerOrderType: (type: TypeOrder) => void;
  isCartVisible: boolean;
  toggleCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextProps | null>(null);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: TypeChildren) => {
  // 카트 모달 뷰 관련 함수
  const [isCartVisible, setIsCartVisible] = useState(false);
  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };
  const closeCart = () => {
    setIsCartVisible(false);
  };

  const [cart, setCart] = useState<cartItem[]>(() => {
    // 로컬 스토리지에서 장바구니 불러오기
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });
  const [orderType, setOrderType] = useState<TypeOrder | null>(null);

  const handlerOrderType = (type: TypeOrder) => {
    setOrderType(type);
  };

  useEffect(() => {
    // 장바구니 상태가 변경되면 로컬 스토리지 업데이트
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    setCart([]);
  };

  const addToCart = (item: TypeProduct) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.product.name === item.name,
    );
    if (existingItem) {
      const updateCart = cart.map((cartItem) => {
        if (cartItem.product.name === item.name) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      setCart(updateCart);
    } else {
      setCart((prev: any) => [...prev, { product: item, quantity: 1 }]);
    }
  };

  const removeFromCart = (name: string) => {
    setCart((prev: any) =>
      prev.filter((item: any) => item.product.name !== name),
    );
  };

  const changeQuantity = (name: string, quantity: number) => {
    const updatedQuantity = cart.map((cartItem) => {
      if (cartItem.product.name === name) {
        return {
          ...cartItem,
          quantity: Math.max(cartItem.quantity + quantity, 1),
        };
      }
      return cartItem;
    });
    setCart(updatedQuantity);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        clearCart,
        addToCart,
        removeFromCart,
        changeQuantity,
        orderType,
        handlerOrderType,
        isCartVisible,
        toggleCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
