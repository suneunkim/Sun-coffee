import useCurrentUser from '@/hooks/useCurrentUser'
import Nav from '@/components/common/Nav'

const Home = () => {
  const userProfile = useCurrentUser()

  return (
    <main>
      <Nav />
    </main>
  )
}

export default Home
