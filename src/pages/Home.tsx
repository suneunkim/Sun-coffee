import useCurrentUser from '@/hooks/useCurrentUser'
import Nav from '@/components/common/Nav'
import SearchBar from '@/components/common/SearchBar'
import Cart from '@/components/Product/Cart'
import ProductList from '@/components/Product/ProductList'

const Home = () => {
  const userProfile = useCurrentUser()

  return (
    <main className="bg-gray-100 flex w-full">
      <Nav />
      <section className="flex flex-col w-full min-w-[600px] px-5">
        <SearchBar />
        <ProductList />
      </section>
      <Cart />
    </main>
  )
}

export default Home
