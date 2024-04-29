import Category from './Category'
import { customerMenu } from './MenuItem'
import Nav from './Nav'
import SearchBar from './SearchBar'

export interface ChildrenProps {
  children: React.ReactNode
}

const PageLayout = ({ children }: ChildrenProps) => {
  return (
    <main className="bg-gray-50 flex">
      <Nav customerMenu={customerMenu} />
      <section className="flex flex-col px-5">
        <SearchBar />
        <Category />
        {children}
      </section>
    </main>
  )
}

export default PageLayout
