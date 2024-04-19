import { db, fireauth } from '@/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

const Home = () => {
  const [isLogined, setIsLogined] = useState(false)
  const user = fireauth.currentUser

  if (user) {
    const userDocRef = doc(db, 'users', user.uid)
    console.log(userDocRef)
  }

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
  return (
    <div>
      Home
      <div>로그인 유무 확인하기</div>
      <div>
        <button onClick={logOut}>로그아웃</button>
      </div>
    </div>
  )
}

export default Home
