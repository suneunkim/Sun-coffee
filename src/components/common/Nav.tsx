import { fireauth } from '@/firebase'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'firebase/auth'

import { PiCoffeeLight } from 'react-icons/pi'
import { IoSettingsOutline } from 'react-icons/io5'
import { CiBookmarkMinus } from 'react-icons/ci'
import { VscAccount } from 'react-icons/vsc'
import { BiHomeSmile } from 'react-icons/bi'
import { SlLogin } from 'react-icons/sl'
import { SlLogout } from 'react-icons/sl'
import { Link } from 'react-router-dom'
import MenuItem from './MenuItem'
const Nav = () => {
  const userProfile = useCurrentUser()

  // 로그아웃 함수
  const logOut = async (e: any) => {
    e.preventDefault()
    await signOut(fireauth)
    alert('로그아웃 하셨습니다.')
  }
  return (
    <main className="w-1/4 min-w-[200px] lg:w-[16rem] py-8 text-[#3c3c3c] font-bold h-screen flex flex-col bg-[#FFFFFF]">
      <h2 className="text-4xl font-semibold mb-20 flex justify-center">
        <span className="text-[#FFA16C]">Sun' </span> Coffee
      </h2>
      <nav>
        <ul className="space-y-4 ml-5">
          <MenuItem to="/" icon={<BiHomeSmile className="w-5 h-5" />}>
            Home page
          </MenuItem>
          <MenuItem to="myordes" icon={<CiBookmarkMinus className="w-5 h-5" />}>
            My orders
          </MenuItem>
          <MenuItem
            to="setting"
            icon={<IoSettingsOutline className="w-5 h-5" />}
          >
            Setting
          </MenuItem>
        </ul>
      </nav>

      <div className=" mt-auto mb-5 space-y-5 ml-5">
        {userProfile ? (
          <div className="flex space-x-3 items-center">
            <VscAccount className="w-8 h-8" />
            <div className="text-xs">
              <div>{userProfile?.nickname}</div>
              <div className="text-[#8a8989] font-normal">
                {userProfile?.email}
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="flex items-center space-x-3 text-sm">
          {userProfile ? (
            <>
              <SlLogout className="w-6 h-6" />
              <button onClick={logOut}>로그아웃</button>
            </>
          ) : (
            <>
              <SlLogin className="w-6 h-6" />
              <Link to="/auth/login">
                <button>로그인</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default Nav
