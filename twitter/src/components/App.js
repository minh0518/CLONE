import React, { useEffect, useState } from 'react'
import { Router } from 'react-router-dom'
import AppRouter from './AppRouter'
import { authService } from 'fbase'
import { onAuthStateChanged } from 'firebase/auth'

const App = () => {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj,setUserObj]=useState(null)

  useEffect(() => {
    onAuthStateChanged(authService,(user)=>{
      if(user){ //로그인 되어있는 상태
        setIsLoggedIn(true)
        setUserObj(user)
      }
      else{  //로그아웃 되어있는 상태
        setIsLoggedIn(false)
      }
      setInit(true) //Firbase가 로드,초기화가 다 됐다는 것을 의미
    })
  })

  return (
    <div>
                        {/* AppRouter에 보내줌 */}
      {init ?<AppRouter userObj={userObj} isLoggedIn={isLoggedIn} /> :'Initializing...'}
      {/* Firbase가 로드 완료 됐다면 보여줌 */}

      <footer>&copy; {new Date().getFullYear()} Twiiter</footer>
    </div>
  )
}

export default App