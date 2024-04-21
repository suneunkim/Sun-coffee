import { sellerMenu } from '@/components/common/MenuItem'
import Nav from '@/components/common/Nav'
import ButtonUi from '@/components/elements/Button'
import InputFile from '@/components/elements/InputFile'
import InputUi from '@/components/elements/InputWithLabel'
import TextareaUi from '@/components/elements/TextareaUi'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'

const UploadProduct = () => {
  const [isLoading, setIsLoading] = useState(false) // form 중복 제출 방지
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const styles = `rounded-3xl bg-white border-2 text-gray-800 hover:text-white hover:bg-gray-700`
  const onSubmit = () => {}
  return (
    <main className="bg-gray-50 flex">
      <Nav customerMenu={sellerMenu} />
      <section className="flex flex-col px-5 my-20 w-[30rem] bg-white p-9 ml-10 rounded-xl shadow-lg">
        <h3 className="font-semibold mb-5">상품 등록하기</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputUi
            label="상품 이름"
            id="name"
            type="text"
            register={register('name', { required: true })}
            errors={errors}
          />
          <TextareaUi
            label="상품 설명"
            id="description"
            register={register('descriptions')}
            errors={errors}
          />
          <InputFile />
          <InputUi
            label="가격"
            id="price"
            type="price"
            register={register('price', { required: true })}
            errors={errors}
            formatPrice
          />
          <div className="flex space-x-3">
            <Button className={styles}>Coffee</Button>
            <Button className={styles}>Non Coffee</Button>
            <Button className={styles}>Food</Button>
          </div>
          <ButtonUi label="등록하기" textWhite disabled={isLoading} />
        </form>
      </section>
    </main>
  )
}

export default UploadProduct
