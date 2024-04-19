import { fireauth } from '@/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import InputUi from '@/components/InputWithLabel'
import Button from '@/components/Button'
import { useState } from 'react'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()

  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    setIsLoading(true)
    const { nickname, email, password } = formData
    try {
      const userCredential = await createUserWithEmailAndPassword(
        fireauth,
        email,
        password
      )
      const user = userCredential.user
      console.log('유저 회원가입 완료', user)
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      console.log('errorCode', errorCode)
      console.log('errorMessage', errorMessage)

      if (errorCode === 'auth/email-already-in-use') {
        setErrorMessage('이미 가입된 이메일입니다.')
      } else if (errorCode === 'auth/invalid-email') {
        setErrorMessage('올바른 이메일 형식이 아닙니다.')
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
          register={register('password', { required: true })}
          errors={errors}
          disabled={isLoading}
        />
        {errorMessage ? (
          <p className="pt-3m text-sm text-rose-500">{errorMessage}</p>
        ) : null}
        <Button label="가입하기" />
      </form>
      <div className="flex space-x-4 text-sm font-semibold">
        <p>이미 회원이신가요?</p>
        <p className="border-black hover:border-b">로그인하러 가기</p>
      </div>
    </div>
  )
}

export default Register
