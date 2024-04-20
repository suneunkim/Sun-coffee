import { ReactElement } from 'react'

interface MenuItemProps {
  icon: ReactElement
  children: React.ReactNode
}

const MenuItem = ({ icon, children }: MenuItemProps) => {
  return (
    <div className="flex items-center space-x-3">
      {icon}
      <li>{children}</li>
    </div>
  )
}

export default MenuItem
