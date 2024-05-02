import Cart from '../Product/Cart'
import Category from './Category'
import { customerMenu } from './MenuItem'
import Nav from './Nav'
import SearchBar from './SearchBar'
import { TypeChildren } from './../../types/common'
import { useEffect, useState } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { AnimatePresence } from 'framer-motion'

const PageLayout = ({ children }: TypeChildren) => {
  const [isCartVisible, setIsCartVisible] = useState(false)
  const toggleCart = () => {
    setIsCartVisible(!isCartVisible)
  }

  // isCartVisible 값이 변할 때마다 상태를 갱신
  useEffect(() => {
    setIsCartVisible(isCartVisible)
  }, [isCartVisible])

  return (
    <main className="bg-gray-50 flex">
      <Nav customerMenu={customerMenu} toggleCart={toggleCart} />
      <section className="flex flex-col px-5 relative">
        <SearchBar />
        <Category />
        {children}
      </section>
      <div className="flex items-center fixed top-1/2 transform -translate-y-1/2 right-0 xl:relative xl:right-auto xl:-translate-y-0">
        <AnimatePresence>
          {isCartVisible && <Cart isCartVisible />}
        </AnimatePresence>
      </div>
      <Toaster />
    </main>
  )
}

export default PageLayout
