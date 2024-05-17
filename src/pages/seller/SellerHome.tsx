import Nav from '@/components/common/Nav'
import SearchBar from '@/components/common/SearchBar'
import { sellerMenu } from '@/components/common/MenuItem'
import SellerProductList from '@/components/ProductManagement/SellerProductList'

const SellerHome = () => {
  return (
    <main className="bg-gray-50 flex">
      <Nav customerMenu={sellerMenu} sellerHome />
      <section className="flex flex-col px-5">
        <SearchBar />
        <SellerProductList />
      </section>
    </main>
  )
}

export default SellerHome
