import useCurrentUser from '@/hooks/useCurrentUser'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: any) => {
  const userProfile = useCurrentUser()
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (!userProfile?.isSeller) {
      setTimeout(() => {
        setRedirect(true)
      }, 500)
      alert('잘못된 접근입니다.')
    }
  }, [userProfile])

  if (redirect) {
    return <Navigate to="/" replace />
  }
  return children
}

export default ProtectedRoute
