import Button from '../elements/Button'
import CountButton from './CountButton'

//TODO: 버튼 컴포넌트에서 스몰 사이즈를 상품리스트용으로 크기 수정하기
// cart props는 Added to cart에 맞게끔 설정하기. 아웃라인을 기본으로, 호버시 아웃라인 해제하기

const ProductCard = () => {
  return (
    <div className="w-[400px] h-[260px] rounded-lg bg-white p-4  shadow-sm">
      <div className="flex">
        <div className="bg-gray-100 rounded-xl w-60 h-40">
          <img
            src="https://www.ediya.com/files/menu/IMG_1647320848557.png"
            className="mt-3"
          />
        </div>
        <div className="p-3 space-y-2">
          <div className="flex gap-4">
            <h3>카푸치노</h3>
            <p>5,500원</p>
          </div>
          <p>부드러운 거품이 있는것이 바로 카푸치노의 매력.</p>
          <div className="flex gap-2 items-center pt-3">
            <p className="font-semibold pr-2 text-gray-800">Size</p>
            <Button label="Small" rounded small outline />
            <Button label="Large" rounded small outline />
          </div>
        </div>
      </div>
      <div className="flex items-center mt-3">
        <div className="flex w-60 pl-4 items-center gap-3 font-semibold text-gray-600">
          <CountButton label="-" />
          <span>3</span>
          <CountButton label="+" />
        </div>
        <div className="w-[90%]">
          <Button cart rounded label="Added to cart" />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
