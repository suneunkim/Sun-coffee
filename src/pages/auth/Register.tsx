import { db, fireauth } from '@/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {
  useForm,
  SubmitHandler,
  FieldValues,
  FieldErrors,
} from 'react-hook-form'
import InputUi from '@/components/InputWithLabel'
import Button from '@/components/Button'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues, FieldErrors>()

  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('') // 회원가입 실패 메세지
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    setIsLoading(true)
    const { nickname, email, password, isSeller } = formData

    try {
      const userCredential = await createUserWithEmailAndPassword(
        fireauth,
        email,
        password
      )
      const user = userCredential.user
      const userDoc = doc(db, 'users', user.uid)
      await setDoc(userDoc, {
        uid: user.uid,
        nickname,
        email,
        isSeller,
      })
      alert('회원가입이 완료되었습니다.')
      navigate('/auth/login')
    } catch (error: any) {
      const errorCode = error.code
      console.log('errorCode', errorCode)
      console.log('errorMessage', error.message)

      // firebase의 회원가입 시 오류 코드들
      if (errorCode === 'auth/email-already-in-use') {
        setErrorMessage('이미 가입된 이메일입니다.')
      } else if (errorCode === 'auth/invalid-email') {
        setErrorMessage('올바른 이메일 형식이 아닙니다.')
      } else if (errorCode === 'auth/weak-password') {
        setErrorMessage(
          '비밀번호 8자리 이상은 //대문자, 소문자, 숫자, 특수문자 중 3종류 이상을 포함해야 합니다.'
        )
      } else {
        setErrorMessage('회원가입에 실패하였습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center mt-32 text-[#3c3c3c]">
      <form className="w-[24rem]" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-lg font-bold mb-5">회원가입</h2>
        <InputUi
          id="nickname"
          type="text"
          label="닉네임"
          register={register('nickname', { required: true })}
          errors={errors}
          disabled={isLoading}
        />
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
            validate: {
              condition1: (value: string) => {
                if (!/[!@#$%^&*()]/.test(value)) {
                  return '특수문자를 포함해주세요'
                }
                if (!/[A-Z]/.test(value)) {
                  return '대문자를 포함해주세요'
                }
                return true
              },
            },
          })}
          errors={errors}
          disabled={isLoading}
        />
        {errorMessage ? (
          <p className="pt-3m text-sm text-rose-500">{errorMessage}</p>
        ) : null}
        {errors?.password?.message as string}
        <InputUi
          label="판매자 계정 여부"
          id="isSeller"
          type="checkbox"
          register={register('isSeller')}
          errors={errors}
          disabled={isLoading}
          checkbox
        />
        <Button disabled={isLoading} label="가입하기" />
      </form>
      <div className="flex space-x-4 text-sm font-semibold">
        <p>이미 회원이신가요?</p>
        <Link to="/auth/login">
          <p className="border-black hover:border-b">로그인하러 하러가기</p>
        </Link>
      </div>
    </div>
  )
}

export default Register
