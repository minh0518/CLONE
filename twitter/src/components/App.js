import React, { useEffect, useState } from 'react'
import { Router } from 'react-router-dom'
import AppRouter from './AppRouter'
import { authService } from 'fbase'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'

const App = () => {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        //로그인 되어있는 상태

        //local login으로 하면 displayName이 null이므로 따로 수정이 필요
        if (user.displayName === null) {
          const name = user.email.split('@')[0]
          //updateProfile 사용
          updateProfile(authService.currentUser, {
            displayName: name,
          })
        }

        setIsLoggedIn(true)

        //setUserObj(user)
        setUserObj({
          displayName: user.displayName,
          uid: user.uid
        })
      } else {
        //로그아웃 되어있는 상태
        setIsLoggedIn(false)
      }
      setInit(true) //Firbase가 로드,초기화가 다 됐다는 것을 의미
    })
  })

  //user를 새로고침하는 기능
  const refreshUser = () => {
    //console.log(authService.currentUser)

    //setUserObj(authService.currentUser)
    const user=authService.currentUser
    setUserObj({
      displayName: user.displayName,
      uid: user.uid
    })
  }

  return (
    <div>
      {/* AppRouter에 보내줌 */}
      {init ? ( // Firbase가 로드 완료 됐다면 보여줌
        <AppRouter
          userObj={userObj}
          isLoggedIn={isLoggedIn}
          refreshUser={refreshUser}
        />
      ) : (
        'Initializing...'
      )}

      <footer>&copy; {new Date().getFullYear()} Twiiter</footer>
    </div>
  )
}

export default App
