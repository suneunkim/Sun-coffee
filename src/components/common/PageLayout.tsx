import Category from './Category'
import { customerMenu } from './MenuItem'
import Nav from './Nav'
import SearchBar from './SearchBar'
import { TypeChildren } from './../../types/common'
import { Toaster } from '@/components/ui/toaster'
import { AnimatePresence } from 'framer-motion'
import { usePayment } from '@/context/PaymentContext'
import { useCart } from '@/context/CartContext'
import { Suspense, lazy } from 'react'
import Loading from './Loading'
import React from 'react'
const Cart = lazy(() => import('../Product/Cart'))
const PaymentModal = lazy(() => import('../Payment/PaymentModal'))

const PageLayout = ({ children }: TypeChildren) => {
  const cartContext = useCart()
  if (!cartContext) {
    return
  }
  const { isCartVisible } = cartContext

  // 결제 모달창
  const paymentContext = usePayment()
  if (!paymentContext) {
    return
  }
  const { isOpen } = paymentContext

  return (
    <main className="bg-gray-50 flex">
      <Nav customerMenu={customerMenu} />
      <section className="flex flex-col px-5 relative">
        <SearchBar />
        <Category />
        {children}
      </section>
      <div className="flex items-center fixed top-1/2 transform -translate-y-1/2 right-0 xl:relative xl:right-auto xl:-translate-y-0">
        <AnimatePresence>
          {isCartVisible && (
            <Suspense fallback={<Loading />}>
              <Cart isCartVisible />
            </Suspense>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && (
          <Suspense fallback={<Loading />}>
            <PaymentModal />
          </Suspense>
        )}
      </AnimatePresence>
      <Toaster />
    </main>
  )
}

export default React.memo(PageLayout)
