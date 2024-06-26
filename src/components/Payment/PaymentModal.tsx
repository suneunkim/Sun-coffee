import { usePayment } from '@/context/PaymentContext'
import { motion } from 'framer-motion'
import TextInput from '../elements/TextInput'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { TypeOrderUserData } from '@/types/common'
import { useEffect } from 'react'

const PaymentModal = () => {
  const paymentContext = usePayment()
  if (!paymentContext) {
    return
  }
  const { closeModal, updateOrderUserData, handlePayment, orderUserData } =
    paymentContext

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeOrderUserData>()

  // 입력값을 PG사에 보낼 data로 사용하기 위해 PaymentProvider의 updateOrderUserData로 전달
  const onSubmit = (data: TypeOrderUserData) => {
    updateOrderUserData(data)
    reset()
  }

  useEffect(() => {
    if (orderUserData) {
      handlePayment()
    }
  }, [orderUserData])

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
                id="buyer_name"
                type="text"
                label="이름"
                register={register}
                errors={errors}
                errorMsg={errors.buyer_name?.message}
              />
              <TextInput
                id="buyer_tel"
                type="number"
                label="전화번호"
                register={register}
                errors={errors}
                errorMsg={errors.buyer_tel?.message}
              />
            </div>
            {/* <TextInput
              id="buyer_email"
              type="email"
              label="이메일"
              register={register}
              errors={errors}
              errorMsg={errors.buyer_email?.message}
            /> */}
            {/* <SearchAddress
              register={register}
              setValue={setValue}
              errors={errors}
            /> */}
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
