import { sellerMenu } from '@/components/common/MenuItem'
import Nav from '@/components/common/Nav'
import ButtonUi from '@/components/elements/Button'
import InputFile from '@/components/elements/InputFile'
import InputUi from '@/components/elements/InputWithLabel'
import TextareaUi from '@/components/elements/TextareaUi'
import { useState } from 'react'

import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import useCurrentUser from '@/hooks/useCurrentUser'
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import UploadCategoryBtn from '@/components/Product/UploadCategoryBtn'
import { useNavigate } from 'react-router-dom'

const UploadProduct = () => {
  const userProfile = useCurrentUser()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false) // form 중복 제출 방지
  const [category, setCategory] = useState('')
  const categories = ['Coffee', 'Non Coffee', 'Food']

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      imageURL: '',
      category: '',
    },
  })

  const imageURL = watch('imageURL')

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    if (!userProfile?.isSeller) {
      alert('판매자만 상품을 등록할 수 있습니다.')
      return
    }
    if (!category) {
      alert('카테고리를 선택하세요!')
      return
    }
    if (imageURL.length === 0) {
      alert('이미지를 등록해주세요!')
      return
    }

    setIsLoading(true)
    const { name, description, price } = formData
    try {
      const productDocRef = doc(db, 'products', name)
      await setDoc(productDocRef, {
        name,
        description,
        price,
        imageURL,
        category,
        createdAt: new Date(),
      })
      alert('상품이 정상적으로 등록되었습니다.')
      navigate('/seller-home')
    } catch (error) {
      console.log(error)
      alert('상품 등록을 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const imageSetValue = (id: string, value: string) => {
    setValue(id, value)
  }

  return (
    <main className="bg-gray-50 flex">
      <Nav customerMenu={sellerMenu} />
      <section className="flex flex-col px-5 w-[30rem] bg-white p-9 ml-10 rounded-xl shadow-lg">
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
            register={register('description', { required: true })}
            errors={errors}
          />
          <InputUi
            label="가격"
            id="price"
            type="number"
            register={register('price', { required: true })}
            errors={errors}
            formatPrice
          />
          <InputFile
            imageURL={imageURL}
            onChange={(value) => imageSetValue('imageURL', value)}
          />
          <div className="flex space-x-3 justify-center gap-5">
            {categories.map((item) => (
              <UploadCategoryBtn
                key={item}
                category={item}
                setCategory={setCategory}
                isActive={category === item}
              />
            ))}
          </div>
          <ButtonUi label="등록하기" textWhite disabled={isLoading} />
        </form>
      </section>
    </main>
  )
}

export default UploadProduct
