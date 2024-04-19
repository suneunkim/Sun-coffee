import { db, fireauth } from '@/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

const Home = () => {
  useEffect(() => {
    onAuthStateChanged(fireauth, (user) => {
      console.log('user', user)
    })
  }, [])

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'todos'))
      const querySnapshot = await getDocs(q)

      const initailTodos: any[] = []

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        }
        initailTodos.push(data)
      })
      console.log(initailTodos)
    }
    fetchData()
  }, [])

  // 데이터 추가하기
  const addData = async () => {
    const newTodo = { text: '이거다', isDone: false }
    const collectionRef = collection(db, 'todos')
    await addDoc(collectionRef, newTodo)
  }
  // 데이터 수정하기
  const updateData = () => {
    const currentTodo = { id: 'asd212312', text: '이거다', isDone: false }
    const todoRef = doc(db, 'todos', currentTodo?.id)
    updateDoc(todoRef, { ...currentTodo, isDone: !currentTodo.isDone })
  }

  return (
    <div>
      Home
      <div>로그인 유무 확인하기</div>
      <div></div>
    </div>
  )
}

export default Home
