import { useQueryRecommendProduct } from '@/api/productQueries'
import { TypeProduct } from '@/types/common'
interface Props {
  product: TypeProduct | null
  onClose: () => void
  onModal: (data: TypeProduct) => void
}

// TODO: section은 추천 상품들 보여주기. 같은 카테고리 군에서 3개 뽑아서 보여주기

const DetailModal = ({ product, onClose, onModal }: Props) => {
  const { data } = useQueryRecommendProduct(product?.category!, product?.name!)
  return (
    <>
      <div className="fixed inset-0 z-10 bg-black opacity-40 w-screen h-screen"></div>
      <div className="absolute z-10 left-0 top-[5%] bg-white w-[99%] h-[800px]">
        <div className=" bg-white w-[99%] h-[400px] flex">
          <img
            src={product?.imageURL}
            className=" object-contain bg-gray-100"
          />
          <article className="flex flex-col py-5 px-7">
            <h2 className="font-semibold text-2xl">{product?.name}</h2>
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
            <div className="flex justify-between mt-auto">
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
    </>
  )
}

export default DetailModal
