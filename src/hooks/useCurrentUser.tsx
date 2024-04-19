import { useEffect, useState } from 'react'
import { db, fireauth } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

export type UserProfileType = {
  email: string
  isSeller: boolean
  nickname: string
  uid: string
}

const useCurrentUser = () => {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireauth, async (user) => {
      // firestore에서 사용자 데이터 가져오기
      if (user) {
        const userRef = doc(db, 'users', user.uid) // firestore에서 해당 사용자의 문서 참조 생성
        const userSnapshot = await getDoc(userRef)

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data()
          setUserProfile({
            email: userData.email,
            isSeller: userData.isSeller,
            nickname: userData.nickname,
            uid: userData.uid,
          })
        } else {
          setUserProfile(null)
        }
      } else {
        setUserProfile(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return userProfile
}

export default useCurrentUser
