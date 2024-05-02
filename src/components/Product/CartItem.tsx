import CountButton from './CountButton'
import { cartItem } from '@/types/common'
import { RiCloseCircleLine } from 'react-icons/ri'

interface Props {
  data: cartItem[] | null
  onRemove: (id: string) => void
  onChangeQuantity: (name: string, quantity: number) => void
}

const CartItem = ({ data, onRemove, onChangeQuantity }: Props) => {
  return (
    <>
      {data?.map((data) => (
        <div
          key={data.product.name}
          className="flex flex-col gap-3 mt-5 pb-5 border-b last:border-b-0 border-gray-200/50"
        >
          <div className="flex">
            <div className="bg-gray-100 rounded-xl w-24 h-32 flex items-center">
              <img src={data.product.imageURL} className="" />
            </div>
            <div className="p-3">
              <div className="flex">
                <h3 className="">{data.product?.name}</h3>
                <button
                  className="ml-auto"
                  onClick={() => onRemove(data.product.name)}
                >
                  <RiCloseCircleLine />
                </button>
              </div>
              <p>Small</p>
              <div className="flex items-center space-x-3 mt-5">
                <p className="mr-5">
                  {(Number(data.product?.price) * data.quantity).toLocaleString(
                    'ko-KR'
                  )}
                  원
                </p>
                <CountButton
                  plus
                  onClick={() => onChangeQuantity(data.product.name, -1)}
                />
                <p className="text-md">{data.quantity}</p>
                <CountButton
                  plus={false}
                  onClick={() => onChangeQuantity(data.product.name, 1)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default CartItem
