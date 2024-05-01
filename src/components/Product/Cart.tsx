import { Button } from '../ui/button'
import CartItem from './CartItem'
import ElButton from '../elements/Button'
import { useCart } from '@/context/CartContext'
import './cart.css'
import { motion } from 'framer-motion'

const styles = `rounded-3xl bg-white border text-gray-800 hover:text-white`

interface Props {
  isCartVisible?: boolean
}

const Cart = ({ isCartVisible }: Props) => {
  const cartContext = useCart()
  if (!cartContext) {
    return
  }
  const { removeFromCart, cart, changeQuantity } = cartContext

  const totalAmount = cart.reduce((total, item) => {
    return total + Number(item.product.price) * item.quantity
  }, 0)

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
                <Button className={styles}>Dine in</Button>
                <Button className={styles}>Take away</Button>
                <Button className={styles} disabled>
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
                <ElButton label="Place on order" rounded textWhite />
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Cart
