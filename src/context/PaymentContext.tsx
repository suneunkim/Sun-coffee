import { createContext, useContext, useState } from 'react'
import { TypeChildren } from '@/types/common'

interface PaymentFormProps {
  buyer_name: string
  buyer_tel: string
  buyer_email: string
  buyer_addr: string
  buyer_postcode: string
}

interface PaymentContextProps {
  paymentFormData: PaymentFormProps | null
  isOpen: boolean
  paymentCompleted: boolean
  openModal: () => void
  closeModal: () => void
  updatePaymentForm: (newForm: PaymentFormProps) => void
  clearPaymentForm: () => void
}

const PaymentContext = createContext<PaymentContextProps | null>(null)

export const usePayment = () => useContext(PaymentContext)

export const PaymentProvider = ({ children }: TypeChildren) => {
  const [paymentFormData, setpaymentFormData] =
    useState<PaymentFormProps | null>({
      buyer_name: '',
      buyer_tel: '',
      buyer_email: '',
      buyer_addr: '',
      buyer_postcode: '',
    })
  const [isOpen, setIsOpen] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const updatePaymentForm = (newForm: PaymentFormProps) => {
    setpaymentFormData((prevForm) => ({
      ...prevForm,
      ...newForm,
    }))
  }

  const clearPaymentForm = () => {
    setpaymentFormData({
      buyer_name: '',
      buyer_tel: '',
      buyer_email: '',
      buyer_addr: '',
      buyer_postcode: '',
    })
  }

  return (
    <PaymentContext.Provider
      value={{
        isOpen,
        paymentCompleted,
        openModal,
        closeModal,
        paymentFormData,
        updatePaymentForm,
        clearPaymentForm,
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}
