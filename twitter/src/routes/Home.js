import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { dbService } from 'fbase'

const Home = () => {
  const [nweet, setNweet] = useState('')
  


  const onSubmit = async (e) => {
    e.preventDefault()
    const doc = await addDoc(collection(dbService, 'tweets'), {
      nweet: nweet, //nweet�� ��� ��. nweet �� �� document�� key
      createdAt: Date.now(),
    })
    setNweet('')
  }

  const onChange = (e) => {
    setNweet(e.target.value)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        {/*  e.preventDefault()������ �׳� form�±׻��¿���
            ��ư�� Ŭ���ص� ���ΰ�ħ�� �߻��� */}
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on yout mind"
          maxLength={120}
        ></input>
        <input type="submit" value="Tweet" />
      </form>
    </div>
  )
}

export default Home
