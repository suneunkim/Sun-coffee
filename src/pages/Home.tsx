import Nav from '@/components/common/Nav'
import SearchBar from '@/components/common/SearchBar'
import Cart from '@/components/Product/Cart'
import ProductList from '@/components/Product/ProductList'
import Category from '@/components/common/Category'
import { customerMenu } from '@/components/common/MenuItem'

const Home = () => {
  return (
    <main className="bg-gray-50 flex">
      <Nav customerMenu={customerMenu} />
      <section className="flex flex-col px-5">
        <SearchBar />
        <Category />
        <ProductList />
      </section>
      <Cart />
    </main>
  )
}

export default Home
