import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { paymentDataProps, TypeOrderData } from '@/types/common'

let initialized = false
const IMP = (window as any).IMP
const initialzeIMP = () => {
  if (!initialized) {
    IMP.init('imp30282078')
    initialized = true
  }
}

// PG사 KG 이니시스에 결제 요청
const startPayment = (
  paymentData: paymentDataProps,
  orderData: TypeOrderData,
  onSuccess: () => void
) => {
  initialzeIMP()

  IMP.request_pay(paymentData, function (response: any) {
    if (response.success) {
      alert('결제가 완료되었습니다.')
      onSuccess()

      const orderDataDB = async () => {
        try {
          const orderCollection = collection(db, 'orders')
          const docRef = doc(orderCollection) // 새 문서 참조 생성
          await setDoc(docRef, {
            ...orderData,
            order_id: docRef.id,
          })
        } catch (error) {
          alert('결제가 실패하였습니다.')
          console.error('주문 실패', error)
        }
      }
      orderDataDB()
    } else {
      console.error('결제 실패', response.error)
    }
  })
}

export default startPayment
