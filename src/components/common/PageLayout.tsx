import Cart from '../Product/Cart'
import Category from './Category'
import { customerMenu } from './MenuItem'
import Nav from './Nav'
import SearchBar from './SearchBar'
import { TypeChildren } from './../../types/common'
import { useEffect, useState } from 'react'

const PageLayout = ({ children }: TypeChildren) => {
  const [isCartVisible, setIsCartVisible] = useState(false)
  const toggleCart = () => {
    setIsCartVisible(!isCartVisible)
  }

  // isCartVisible 값이 변할 때마다 상태를 갱신
  useEffect(() => {
    setIsCartVisible(isCartVisible)
  }, [isCartVisible])

  // 애니메이션이 끝나면 상태를 갱신
  const handleAnimationEnd = () => {
    if (!isCartVisible) {
      setIsCartVisible(false)
    }
  }

  return (
    <main className="bg-gray-50 flex">
      <Nav customerMenu={customerMenu} toggleCart={toggleCart} />
      <section className="flex flex-col px-5 relative">
        <SearchBar />
        <Category />
        {children}
      </section>
      <div className="flex items-center ">
        {isCartVisible && (
          <Cart isCartVisible handleAnimationEnd={handleAnimationEnd} />
        )}
      </div>
    </main>
  )
}

export default PageLayout
