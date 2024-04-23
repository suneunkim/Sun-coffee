import Button from '../elements/Button'
import CountButton from './CountButton'

interface Product {
  id: string
  name: string
  description: string
  price: string
  imageURL: string
  category: string
  createdAt: {
    seconds: number
    nanoseconds: number
  }
}

interface ProductCardProps {
  data: Product
}

const ProductCard = ({ data }: ProductCardProps) => {
  {
  }
  return (
    <div className="w-[400px] h-[260px] rounded-lg bg-white p-4  shadow-sm">
      <section className="flex">
        <div className="bg-gray-100 w-[130px] h-[170px] rounded-xl relative overflow-hidden">
          <img src={data.imageURL} className="w-[150px] h-full object-cover " />
        </div>
        <div className="p-4 space-y-2 w-[190px]">
          <div className="flex gap-4">
            <h3>{data.name}</h3>
            <p>{data.price}</p>
          </div>
          <p>{data.description}</p>
          <div className="flex gap-2 items-center">
            <p className="font-semibold pr-2 text-gray-800">Size</p>
            <Button label="Small" rounded small outline />
            <Button label="Large" rounded small outline />
          </div>
        </div>
      </section>
      <div className="flex items-center">
        <div className="flex w-60 pl-4 items-center gap-3 font-semibold text-gray-600">
          <CountButton label="-" />
          <span>3</span>
          <CountButton label="+" />
        </div>
        <div className="w-[90%]">
          <Button textWhite cart rounded label="Added to cart" />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
