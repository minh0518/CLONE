import React, { useEffect, useState } from 'react'
import { Router } from 'react-router-dom'
import AppRouter from './AppRouter'
import { authService } from 'fbase'
import { onAuthStateChanged } from 'firebase/auth'

const App = () => {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    onAuthStateChanged(authService,(user)=>{
      if(user){ //�α��� �Ǿ��ִ� ���¶��
        setIsLoggedIn(true)
      }
      else{  //�α׾ƿ� �Ǿ��ִ� ���¶��
        setIsLoggedIn(false)
      }
      setInit(true) //Firbase�� �ε�,�ʱ�ȭ�� �� �ƴٴ� ���� �ǹ�
    })
  })

  return (
    <div>
      {init ?<AppRouter isLoggedIn={isLoggedIn} /> :'Initializing...'}
      {/* Firbase�� �ε� �Ϸ� �ƴٸ� ������ */}

      <footer>&copy; {new Date().getFullYear()} Twiiter</footer>
    </div>
  )
}

export default App