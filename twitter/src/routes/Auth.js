import { authService } from 'fbase'
import React from 'react'
import {
  GoogleAuthProvider,
  GithubAuthProvider ,
  signInWithPopup
} from 'firebase/auth'
import AuthForm from 'components/AuthForm'
 
const Auth = () => {
  
  const onSocialClick=async (e)=>{
    const {name,value}=e.target

    let provider

    //구글과 깃허브 provider생성
    if(name==='google'){
      provider=new GoogleAuthProvider()
    }
    else if(name==='github'){
      provider=new GithubAuthProvider()
    }

    //signInWithPopup사용
    const data=await signInWithPopup(authService,provider)
    console.log(data)

  }
  return (
    <div>
        <AuthForm/>
        <button onClick={onSocialClick} name='google'>Continue with Google</button>
        <button onClick={onSocialClick} name='github'>Continue with GitHub</button>
    </div>
  )
}

export default Auth