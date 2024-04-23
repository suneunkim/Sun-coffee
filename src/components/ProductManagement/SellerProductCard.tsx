import Button from '../elements/Button'

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
  onEdit: (data: Product) => void
  onDelete: (data: Product) => void
}

const SellerProductCard = ({ data, onEdit, onDelete }: ProductCardProps) => {
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
        </div>
      </section>
      <div className="flex items-center">
        <div className="flex w-60 pl-4 items-center gap-3 font-semibold text-gray-600"></div>
        <div className="flex w-full">
          <Button
            onClick={() => onEdit(data)}
            textWhite
            cart
            rounded
            label="Edit"
            type="button"
          />
          <Button
            onClick={() => onDelete(data)}
            textWhite
            cart
            rounded
            label="Delete"
            type="button"
          />
        </div>
      </div>
    </div>
  )
}

export default SellerProductCard
