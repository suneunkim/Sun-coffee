import { fireauth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {
  useForm,
  SubmitHandler,
  FieldValues,
  FieldErrors,
} from 'react-hook-form'
import InputUi from '@/components/elements/InputWithLabel'
import Button from '@/components/elements/Button'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useCurrentUser from '@/hooks/useCurrentUser'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues, FieldErrors>()

  const userProfile = useCurrentUser()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('') // 로그인 실패 메세지
  const [isLoading, setIsLoading] = useState(false) // form 중복 제출 방지
  const [isLogged, setIsLogged] = useState(false) // 회원가입 -> 바로 홈 이동 방지

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    setIsLoading(true)
    const { email, password } = formData

    try {
      await signInWithEmailAndPassword(fireauth, email, password)
      setIsLogged(true)
    } catch (error: any) {
      const errorCode = error.code
      console.log('errorCode', errorCode)
      console.log('errorMessage', error.message)

      if (errorCode === 'auth/wrong-password') {
        setErrorMessage('비밀번호가 틀렸습니다.')
      } else if (errorCode === 'auth/user-not-fonud') {
        setErrorMessage('가입된 계정이 아닙니다.')
      } else {
        setErrorMessage('로그인에 실패하였습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isLogged && userProfile) {
      navigate(userProfile?.isSeller ? '/seller-home' : '/')
    }
  }, [userProfile, navigate, isLogged])

  return (
    <div className="flex flex-col justify-center items-center mt-32 text-[#3c3c3c]">
      <form className="w-[24rem]" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-lg font-bold mb-5">로그인</h2>
        <InputUi
          id="email"
          type="email"
          label="이메일"
          register={register('email', { required: true })}
          errors={errors}
          disabled={isLoading}
        />
        <InputUi
          id="password"
          type="password"
          label="비밀번호"
          register={register('password', {
            required: true,
            minLength: {
              value: 8,
              message: '8자리 이상 비밀번호를 입력하세요',
            },
          })}
          errors={errors}
          disabled={isLoading}
        />
        {errorMessage ? (
          <p className="pt-3m text-sm text-rose-500">{errorMessage}</p>
        ) : null}
        {errors?.password?.message as string}
        <Button textWhite disabled={isLoading} label="로그인 하기" />
      </form>
      <div className="flex space-x-4 text-sm font-semibold">
        <p>아직 회원이 아니신가요?</p>
        <Link to="/auth/register">
          <p className="border-black hover:border-b">회원가입 하러가기</p>
        </Link>
      </div>
      <Link to="/">
        <button className="p-5">홈으로</button>
      </Link>
    </div>
  )
}

export default Login
