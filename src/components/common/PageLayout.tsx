import Cart from '../Product/Cart'
import Category from './Category'
import { customerMenu } from './MenuItem'
import Nav from './Nav'
import SearchBar from './SearchBar'
import { TypeChildren } from './../../types/common'

const PageLayout = ({ children }: TypeChildren) => {
  return (
    <main className="bg-gray-50 flex">
      <Nav customerMenu={customerMenu} />
      <section className="flex flex-col px-5 relative">
        <SearchBar />
        <Category />
        {children}
      </section>
      <div className="flex items-center ">
        <Cart />
      </div>
    </main>
  )
}

export default PageLayout
