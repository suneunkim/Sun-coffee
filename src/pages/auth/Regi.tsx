import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useEffect } from 'react'
// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

const Regi = () => {
  const auth = getAuth()
  useEffect(() => {
    createUserWithEmailAndPassword(auth, 'James22@naver.com', '123123')
  }, [])
  return (
    <div>
      <form>
        <div>
          <label>이메일</label>
          <input type="email" />
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" />
        </div>
        <button>제출</button>
      </form>
    </div>
  )
}

export default Regi
