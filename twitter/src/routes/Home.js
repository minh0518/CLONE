import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { dbService } from 'fbase'

const Home = () => {
  const [nweet, setNweet] = useState('')
  


  const onSubmit = async (e) => {
    e.preventDefault()
    const doc = await addDoc(collection(dbService, 'tweets'), {
      nweet: nweet, //nweet만 적어도 됨. nweet 는 이 document의 key
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
        {/*  e.preventDefault()없으면 그냥 form태그상태에서
            버튼만 클릭해도 새로고침이 발생함 */}
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
