import Button from '../elements/Button'
import CountButton from './CountButton'
import { fetchProductProps } from '@/api/fetchProducts'
interface ProductWithId extends fetchProductProps {
  id: string
}

interface ProductCardProps {
  data: ProductWithId
}

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <div className="w-[420px] h-[280px] rounded-lg bg-white p-4 shadow-sm">
      <section className="flex justify-center">
        <div className="bg-gray-100/60 w-[130px] h-[170px] rounded-xl relative overflow-hidden flex items-center">
          <img src={data.imageURL} />
        </div>
        <article className="flex flex-col justify-center pl-4 space-y-2 w-[75%]">
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
      <section className="flex items-center">
        <div className="flex w-60 pl-4 items-center gap-3 font-semibold text-gray-600">
          <CountButton label="-" />
          <span>3</span>
          <CountButton label="+" />
        </div>
        <div className="w-[90%]">
          <Button textWhite cart rounded label="Added to cart" />
        </div>
      </section>
    </div>
  )
}

export default ProductCard
