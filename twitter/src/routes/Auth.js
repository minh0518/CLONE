import { authService } from 'fbase'
import React, { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider ,
  signInWithPopup
} from 'firebase/auth'
 
const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const [error,setError]=useState("")

  //e.target구조분해 할당을 이용해서 onChange 하나로 여러개의 input을 관리
  //이렇게 하려면 대신 각 input에 반드시 name속성을 지정해 줘야 함
  const onChange = (e) => {
    const { name, value } = e.target
    // const {target:{name,value}}=e
    if (name === 'email') {
      setEmail(value)
    }
    if (name === 'password') {
      setPassword(value)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      if (newAccount) {
        //new Account가 true면 새로운 계정을 생성하는 로직
        //계정을 생성하게 되면 자동으로 로그인이 됨
        const data = await createUserWithEmailAndPassword(
          authService,
          email,
          password,
        )
        console.log(data)
      } else {
        //new Account가 false면 로그인 로직

        const data = await signInWithEmailAndPassword(
          authService,
          email,
          password,
        )
        console.log(data)
      }
    } catch (e) {
      console.log(e.message)
      setError(e.message)
    }
  }

  const toggleAccount=()=>{
    setNewAccount(prev=>!prev)
  }

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
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
        {error}
      </form>

			<span onClick={toggleAccount}>
					<b>{newAccount ? "Sign In":"Create Account"}</b>
			</span>

      <div>
        <button onClick={onSocialClick} name='google'>Continue with Google</button>
        <button onClick={onSocialClick} name='github'>Continue with GitHub</button>
      </div>
    
    </div>
  )
}

export default Auth