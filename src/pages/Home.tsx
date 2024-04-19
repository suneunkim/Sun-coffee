import { fireauth } from '@/firebase'
import currentUser from '@/hooks/currentUser'
import { signOut } from 'firebase/auth'

const Home = () => {
  const userProfile = currentUser()
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
      <div>{userProfile?.nickname}</div>
      <div>{userProfile?.email}</div>
    </div>
  )
}

export default Home
