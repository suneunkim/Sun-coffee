import { usePayment } from '@/context/PaymentContext'
import { motion } from 'framer-motion'
import TextInput from '../elements/TextInput'
import { useForm } from 'react-hook-form'
import SearchAddress from './SearchAddress'
import { Button } from '@/components/ui/button'

const PaymentModal = () => {
  const paymentContext = usePayment()
  if (!paymentContext) {
    return
  }
  const { closeModal } = paymentContext

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute h-screen w-screen inset-0 bg-black opacity-50"></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-y-1/2  -translate-x-1/2 w-[600px] h-[530px] bg-white p-5 text-gray-700">
          <div className="flex justify-between mb-5">
            <h2 className="font-semibold">결제 정보 입력하기</h2>
            <button type="button" onClick={closeModal}>
              창 닫기
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className=" space-y-2">
            <div className="flex">
              <TextInput
                id="name"
                type="text"
                label="이름"
                register={register}
                errors={errors}
                errorMsg={errors.name?.message}
              />
              <TextInput
                id="phone"
                type="number"
                label="전화번호"
                register={register}
                errors={errors}
                errorMsg={errors.name?.message}
              />
            </div>
            <TextInput
              id="email"
              type="email"
              label="이메일"
              register={register}
              errors={errors}
              errorMsg={errors.email?.message}
            />
            <SearchAddress
              register={register}
              setValue={setValue}
              errors={errors}
            />
            <div>
              <Button className="w-[70%] mx-auto flex mt-4">제출하기</Button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  )
}

export default PaymentModal
