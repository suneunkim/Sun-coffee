import Nav from '@/components/common/Nav'
import SearchBar from '@/components/common/SearchBar'
import Category from '@/components/common/Category'
import { sellerMenu } from '@/components/common/MenuItem'
import SellerProductList from '@/components/ProductManagement/SellerProductList'

const SellerHome = () => {
  return (
    <main className="bg-gray-50 flex">
      <Nav customerMenu={sellerMenu} sellerHome />
      <section className="flex flex-col px-5">
        <SearchBar />
        {/* <Category /> 구매자 홈에서 쓰는 Link 사용중이라 판매자에게 부적절함*/}
        <SellerProductList />
      </section>
    </main>
  )
}

export default SellerHome
