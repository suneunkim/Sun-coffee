import { fireauth } from '@/firebase'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'firebase/auth'

const Home = () => {
  const userProfile = useCurrentUser()

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
      <nav>
        <ul>
          <li>Home page</li>
          <li>My orders</li>
          <li>Setting</li>
        </ul>
      </nav>
      {/* {userProfile?.isSeller ? (
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
      )} */}
    </div>
  )
}

export default Home
