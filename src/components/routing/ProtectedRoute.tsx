import useCurrentUser from '@/hooks/useCurrentUser'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: any) => {
  const userProfile = useCurrentUser()
  const [redirect, setRedirect] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (userProfile !== null) {
      setIsLoading(false)
      if (!userProfile?.isSeller) {
        setRedirect(true)
        alert('잘못된 접근입니다.')
      }
    }
  }, [userProfile])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (redirect) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
