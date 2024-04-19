import { db, fireauth } from '@/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { DocumentData, doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

type UserProfile = {
  email: string
  isSeller: boolean
  nickname: string
  uid: string
}

const Home = () => {
  const [isLogined, setIsLogined] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const user = fireauth.currentUser

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
        }
      }
    }
    fetchUserProfile()
  }, [])

  useEffect(() => {
    onAuthStateChanged(fireauth, (user) => {
      user ? setIsLogined(true) : setIsLogined(false)
    })
  }, [isLogined])
  // 로그아웃 함수
  const logOut = async (e: any) => {
    e.preventDefault()
    await signOut(fireauth)
  }

  useEffect(() => {
    console.log(userProfile)
  }, [])

  return (
    <div>
      Home
      <div>로그인 유무 확인하기</div>
      <div>
        <button onClick={logOut}>로그아웃</button>
      </div>
      <div>{userProfile?.nickname}</div>
    </div>
  )
}

export default Home
