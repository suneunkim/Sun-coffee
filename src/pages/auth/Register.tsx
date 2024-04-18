import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import InputUi from '@/components/InputWithLabel'
import Button from '@/components/Button'

type Inputs = {
  name: string
  email: string
  paswword: string
}

//import { auth } from '../firebase'
//import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
const Register = () => {
  // const auth = getAuth()
  //   createUserWithEmailAndPassword(auth, 'test@gmail.com', 'testpassword')
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user
  //       console.log(user)
  //       // ...
  //     })
  //     .catch((error: any) => {
  //       console.log(error)
  //       // ..
  //     })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>()
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data)

  return (
    <div className="flex justify-center items-center mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>회원가입</h2>
        <InputUi
          id="name"
          type="text"
          label="이름"
          register={register}
          errors={errors}
        />

        <Button label="장바구니" rounded />
        <Button outline label="제출" />
      </form>
    </div>
  )
}

export default Register
