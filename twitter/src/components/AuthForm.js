import { authService } from 'fbase'
import React, { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

const AuthForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')

  //e.target�������� �Ҵ��� �̿��ؼ� onChange �ϳ��� �������� input�� ����
  //�̷��� �Ϸ��� ��� �� input�� �ݵ�� name�Ӽ��� ������ ��� ��
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
        //new Account�� true�� ���ο� ������ �����ϴ� ����
        //������ �����ϰ� �Ǹ� �ڵ����� �α����� ��
        const data = await createUserWithEmailAndPassword(
          authService,
          email,
          password,
        )
        console.log(data)
      } else {
        //new Account�� false�� �α��� ����

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

  const toggleAccount = () => {
    setNewAccount((prev) => !prev)
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
        <b>{newAccount ? 'Sign In' : 'Create Account'}</b>
      </span>
    </div>
  )
}

export default AuthForm
