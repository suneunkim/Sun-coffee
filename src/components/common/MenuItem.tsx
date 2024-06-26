import { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { BiHomeSmile } from 'react-icons/bi'
import { CiBookmarkMinus } from 'react-icons/ci'
import { IoSettingsOutline } from 'react-icons/io5'
import { CiCoffeeCup } from 'react-icons/ci'
import React from 'react'
interface MenuItemProps {
  icon: ReactElement
  children: React.ReactNode
  to: string
}

export const customerMenu = [
  {
    path: '/',
    icon: <BiHomeSmile className="w-5 h-5" />,
    label: 'Home Page',
  },
  {
    path: '/my-orders',
    icon: <CiBookmarkMinus className="w-5 h-5" />,
    label: 'My orders',
  },
]

export const sellerMenu = [
  {
    path: '/seller-home',
    icon: <BiHomeSmile className="w-5 h-5" />,
    label: 'Home Page',
  },
  {
    path: '/orders-history',
    icon: <CiBookmarkMinus className="w-5 h-5" />,
    label: 'Order History',
  },
  {
    path: '/upload',
    icon: <CiCoffeeCup className="w-5 h-5" />,
    label: 'Add Product',
  },
]

const MenuItem = ({ icon, children, to }: MenuItemProps) => {
  return (
    <li className=" py-2">
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'flex items-center text-[#FFA16C] border-r-[3px] border-[#FFA16C]'
            : 'flex'
        }
      >
        {icon}
        <span className="ml-2">{children}</span>
      </NavLink>
    </li>
  )
}

export default React.memo(MenuItem)
