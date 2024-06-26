import { Button } from "../ui/button";
import { TypeProduct } from "@/types/common";

interface ProductCardProps {
  data: TypeProduct;
  onEdit: (data: TypeProduct) => void;
  onDelete: (data: TypeProduct) => void;
}

const SellerProductCard = ({ data, onEdit, onDelete }: ProductCardProps) => {
  return (
    <div className="w-[420px] h-[220px] rounded-lg bg-white p-4 shadow-sm">
      <section className="flex justify-center">
        <div className="bg-gray-100/60 w-[130px] h-[170px] rounded-xl relative overflow-hidden flex items-center">
          <img src={data.imageURL} />
        </div>
        <article className="flex flex-col justify-center pl-4 space-y-2 w-[75%]">
          <div className="flex gap-4 items-center">
            <h3 className="font-semibold w-[170px]">{data.name}</h3>
            <p className="text-[#FFA16C] font-bold text-sm">
              {Number(data.price).toLocaleString("ko-KR")}원
            </p>
          </div>
          <p className="text-sm text-gray-600 h-[70px]">{data.description}</p>
          <div className="flex gap-3 items-center justify-center">
            <Button
              className="w-32 bg-[#FFA16C] hover:opacity-70 hover:bg-[#FFA16C]"
              type="button"
              onClick={() => onEdit(data)}
            >
              수정하기
            </Button>
            <Button type="button" onClick={() => onDelete(data)}>
              삭제
            </Button>
          </div>
        </article>
      </section>
    </div>
  );
};

export default SellerProductCard;
