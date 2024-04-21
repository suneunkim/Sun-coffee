import CountButton from './CountButton'

const CartItem = () => {
  return (
    <div className="flex flex-col gap-3 mt-5 pb-5 border-b last:border-b-0 border-gray-200/50">
      <div className="flex">
        <div className="bg-gray-100 rounded-xl w-24 h-32">
          <img
            src="https://www.ediya.com/files/menu/IMG_1647320848557.png"
            className=""
          />
        </div>
        <div className="p-3">
          <h3>카푸치노</h3>
          <p>Small</p>
          <div className="flex items-center space-x-3 mt-5">
            <p className="mr-5">5,500원</p>
            <CountButton label="-" />
            <p>3</p>
            <CountButton label="+" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
