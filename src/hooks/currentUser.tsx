import { useEffect, useState } from 'react'
import { db, fireauth } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

type UserProfile = {
  email: string
  isSeller: boolean
  nickname: string
  uid: string
}

const currentUser = () => {
  const user = fireauth.currentUser

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid)
        const userSnapshot = await getDoc(userRef)

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data()
          if (userData) {
            const userProfileData: UserProfile = {
              email: userData.email,
              isSeller: userData.isSeller,
              nickname: userData.nickname,
              uid: userData.uid,
            }
            setUserProfile(userProfileData)
          }
        } else {
          setUserProfile(null)
        }
      } else {
        setUserProfile(null)
      }
    }
    const unsubscribe = onAuthStateChanged(fireauth, fetchUserProfile)

    return () => unsubscribe()
  }, [])

  return userProfile
}

export default currentUser
