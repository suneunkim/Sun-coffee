import { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

interface MenuItemProps {
  icon: ReactElement
  children: React.ReactNode
  to: string
}

const MenuItem = ({ icon, children, to }: MenuItemProps) => {
  return (
    <li className=" py-2 ">
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

export default MenuItem
