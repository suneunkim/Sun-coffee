import useCurrentUser from '@/hooks/useCurrentUser'
import Nav from '@/components/common/Nav'
import SearchBar from '@/components/common/SearchBar'
import Cart from '@/components/Product/Cart'
import ProductList from '@/components/Product/ProductList'
import Category from '@/components/common/Category'
import { sellerMenu } from '@/components/common/MenuItem'

const SellerHome = () => {
  const userProfile = useCurrentUser()
  console.log('home', userProfile)
  return (
    <main className="bg-gray-50 flex">
      <Nav customerMenu={sellerMenu} />
      <section className="flex flex-col px-5">
        <SearchBar />
        <Category />
        <ProductList />
      </section>
      <Cart />
    </main>
  )
}

export default SellerHome
