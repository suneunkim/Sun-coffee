import { Button } from '../ui/button'

import ElButton from '../elements/Button'
import SellerEditItem from './SellerEditItem'

const styles = `rounded-3xl bg-white border text-gray-800 hover:text-white`

const SellerProductEdit = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-[80%] bg-[#FFFFFF] py-10 rounded-lg shadow-lg w-[350px] px-6 overflow-y-auto">
        <div className="flex items-end justify-between mb-5">
          <h3 className="text-2xl">ProductEdit</h3>
          <p className="text-gray-500 text-sm pr-2">
            Order <span>{`#100`}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button className={styles}>Dine in</Button>
          <Button className={styles}>Take away</Button>
          <Button className={styles} disabled>
            Delivery
          </Button>
        </div>
        <SellerEditItem />
        <div className="text-sm">
          <div className="flex justify-between py-5 px-2 border-b border-gray-200/50">
            <p>Items</p>
            <span>5,500원</span>
          </div>
          <div className="flex justify-between py-5 px-2">
            <p>Total</p>
            <span>5,500원</span>
          </div>
          <ElButton label="Place on order" rounded textWhite />
        </div>
      </div>
    </div>
  )
}

export default SellerProductEdit
