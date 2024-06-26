import Nav from "@/components/common/Nav";
import SearchBar from "@/components/common/SearchBar";
import { sellerMenu } from "@/components/common/MenuItem";
import { useQueryOrderList } from "@/api/productQueries";
import SellerOrderHistory from "@/components/SellerOrderHistory/SellerOrderList";

const OrderHistory = () => {
  const { data } = useQueryOrderList();
  return (
    <main className="bg-gray-50 flex">
      <Nav customerMenu={sellerMenu} sellerHome />
      <section className="flex flex-col px-5">
        <SearchBar />
        <section className="max-h-[770px] overflow-y-auto min-w-[700px] space-y-5 gap-5 flex flex-col">
          {data?.map((order) => (
            <SellerOrderHistory key={order.order_id} data={order} />
          ))}
        </section>
      </section>
    </main>
  );
};

export default OrderHistory;
