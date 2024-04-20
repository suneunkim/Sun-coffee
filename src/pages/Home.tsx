import useCurrentUser from '@/hooks/useCurrentUser'
import Nav from '@/components/common/Nav'

const Home = () => {
  const userProfile = useCurrentUser()

  return (
    <main className="bg-gray-100">
      <Nav />
    </main>
  )
}

export default Home
