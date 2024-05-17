import Button from '../elements/Button'
import { Badge } from '../ui/badge'
import { TypeProduct } from '@/types/common'
import { useCart } from '@/context/CartContext'
import { useToast } from '../ui/use-toast'

interface ProductCardProps {
  data: TypeProduct
  onModal: (data: TypeProduct) => void
}

const ProductCard = ({ data, onModal }: ProductCardProps) => {
  const cartContext = useCart()
  if (!cartContext) {
    return
  }
  const { addToCart } = cartContext
  const { toast } = useToast()

  const handlerAddToCart = () => {
    addToCart(data)
    toast({
      title: `${data.name}를 장바구니에 추가 했습니다.`,
      description: 'Cart 탭을 선택하면 장바구니가 표시됩니다.',
    })
  }

  return (
    <div className="w-[420px] h-[280px] rounded-lg bg-white p-4 shadow-md mb-4">
      <section className="flex justify-center">
        <div
          onClick={() => onModal(data)}
          className="bg-gray-100/60 w-[130px] h-[170px] rounded-xl relative overflow-hidden flex items-center"
        >
          <img
            className="hover:scale-125 transition hover:cursor-pointer"
            src={data.imageURL}
            alt={data.name}
            width={119}
            height={119}
          />
          <Badge className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-400 whitespace-nowrap">
            {data.category}
          </Badge>
        </div>
        <article className="flex flex-col justify-center pl-4 space-y-2 w-[75%] h-[170px]">
          <div className="flex gap-4 items-center">
            <h3 className="font-semibold w-[170px]">{data.name}</h3>
            <p className="text-[#FFA16C] font-bold text-sm">
              {Number(data.price).toLocaleString('ko-KR')}원
            </p>
          </div>
          <p className="text-sm text-gray-600 h-[70px]">{data.description}</p>
          <div className="flex gap-2 items-center">
            <p className="font-semibold pr-2 text-gray-800 mr-3">Size</p>
            <Button label="Small" rounded small outline />
            <Button label="Large" rounded small outline />
          </div>
        </article>
      </section>
      <section className="flex items-center justify-end pt-3">
        <div className="w-[65%]">
          <Button
            onClick={handlerAddToCart}
            textWhite
            cart
            rounded
            label="Added to cart"
          />
        </div>
      </section>
    </div>
  )
}

export default ProductCard
