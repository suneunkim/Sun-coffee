import { useQueryRecommendProduct } from "@/api/productQueries";
import { TypeProduct } from "@/types/common";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
interface Props {
  product: TypeProduct | null;
  onClose: () => void;
  onModal: (data: TypeProduct) => void;
}

const DetailModal = ({ product, onClose, onModal }: Props) => {
  const { data } = useQueryRecommendProduct(product?.category!, product?.name!);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="fixed inset-0 z-10 bg-black opacity-40 w-screen h-screen"></div>

      <div className="absolute z-10 left-0 top-[5%] bg-white w-[99%] h-[800px]">
        <div className=" bg-white w-[99%] h-[400px] flex">
          <img
            src={product?.imageURL}
            className=" object-contain bg-gray-100"
            alt={product?.name}
            width={400}
            height={400}
          />
          <article className="flex flex-col pt-5 px-7">
            <div className="flex justify-between">
              <h2 className="font-semibold text-2xl">{product?.name}</h2>
              <Badge>{product?.category}</Badge>
            </div>
            <div className="border-b border-black border-[1.1px] my-3" />
            <div className="mb-5">{product?.description}</div>

            <p className="py-3 text-lg border-t border-b">제품 영양 정보</p>
            <div className="grid grid-cols-2 gap-5 mt-5">
              <ul className="space-y-3">
                <li>
                  <dl className="flex justify-between">
                    <dt>1회 제공량 {`(kcal)`}</dt>
                    <dd>20</dd>
                  </dl>
                </li>
                <li>
                  <dl className="flex justify-between">
                    <dt>포화지방 {`(g)`}</dt>
                    <dd>5</dd>
                  </dl>
                </li>
                <li>
                  <dl className="flex justify-between">
                    <dt>단백질 {`(g)`}</dt>
                    <dd>0</dd>
                  </dl>
                </li>
              </ul>

              <ul className="space-y-3">
                <li>
                  <dl className="flex justify-between">
                    <dt>나트륨 {`(mg)`}</dt>
                    <dd>5</dd>
                  </dl>
                </li>
                <li>
                  <dl className="flex justify-between">
                    <dt>당류 {`(g)`}</dt>
                    <dd>10</dd>
                  </dl>
                </li>
                <li>
                  <dl className="flex justify-between">
                    <dt>카페인 {`(mg)`}</dt>
                    <dd>135</dd>
                  </dl>
                </li>
              </ul>
            </div>
            <div className="flex gap-5 mt-auto">
              <button className="w-52 border p-3">장바구니에 담기</button>
              <button className="w-24 border p-3" onClick={onClose}>
                닫기
              </button>
            </div>
          </article>
        </div>
        <section className="p-5">
          <p className="text-lg p-2 text-gray-700">이런 상품은 어떠신가요?</p>
          <div className="flex justify-between">
            {data?.map((product) => (
              <div key={product.name} onClick={() => onModal(product)}>
                <img
                  src={product?.imageURL}
                  className="w-[270px] object-contain bg-gray-100"
                />
                <h4 className="text-center p-2">{product?.name}</h4>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default DetailModal;
