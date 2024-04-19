import { fireauth } from '@/firebase'
import currentUser, { UserProfileType } from '@/hooks/currentUser'
import { signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'

const Home = () => {
  const userProfile = currentUser()

  console.log(userProfile)

  // 로그아웃 함수
  const logOut = async (e: any) => {
    e.preventDefault()
    await signOut(fireauth)
  }

  return (
    <div>
      <h2>Home</h2>
      <div>
        <button onClick={logOut}>로그아웃</button>
      </div>
      <div>{userProfile?.nickname}</div>
      <div>{userProfile?.email}</div>
      {userProfile?.isSeller ? (
        <nav>
          <ul>
            <li>Home page</li>
            <li>Order List</li>
            <li>Add Product</li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>Home page</li>
            <li>My orders</li>
            <li>Setting</li>
          </ul>
        </nav>
      )}
    </div>
  )
}

export default Home
