import useCurrentUser from '@/hooks/useCurrentUser'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { TypeChildren } from './../../types/common'
import Loading from '../common/Loading'

const ProtectedRoute = ({ children }: TypeChildren) => {
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
    return <Loading />
  }
  if (redirect) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
