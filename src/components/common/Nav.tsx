import { fireauth } from '@/firebase'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'firebase/auth'
import { VscAccount } from 'react-icons/vsc'
import { SlLogin } from 'react-icons/sl'
import { SlLogout } from 'react-icons/sl'
import { Link } from 'react-router-dom'
import MenuItem, { customerMenu } from './MenuItem'
import { PiShoppingCartLight } from 'react-icons/pi'
import { useCart } from '@/context/CartContext'
//TODO: 판매자 동작 다시 한번 해보고, dev로 머지하기. main으로 pr하기.
interface Props {
  customerMenu: typeof customerMenu
}
const Nav = ({ customerMenu }: Props) => {
  const userProfile = useCurrentUser()

  const cartContext = useCart()
  if (!cartContext) {
    return
  }
  const { cart, toggleCart } = cartContext

  const logOut = async (e: any) => {
    e.preventDefault()
    await signOut(fireauth)
    alert('로그아웃 하셨습니다.')
  }

  return (
    <main className="min-w-[200px] py-8 text-[#3c3c3c] font-bold h-screen flex flex-col bg-[#FFFFFF]">
      <h2 className="text-3xl font-semibold mb-20 flex justify-center">
        <span className="text-[#FFA16C]">Sun' </span> Coffee
      </h2>
      <nav>
        <ul className="space-y-4 ml-5">
          {customerMenu.map((item) => (
            <MenuItem key={item.label} to={item.path} icon={item.icon}>
              {item.label}
            </MenuItem>
          ))}
          {toggleCart && (
            <button
              className="flex items-center hover:text-[#FFA16C]"
              onClick={toggleCart}
            >
              <PiShoppingCartLight className="w-5 h-5" />
              <span className="ml-2">Cart</span>
              <span className="ml-2 bg-[#FFA16C] text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
                {cart.length}
              </span>
            </button>
          )}
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
