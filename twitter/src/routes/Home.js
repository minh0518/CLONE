import React, { useEffect, useState } from 'react'
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { dbService } from 'fbase'

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])

  //console.log(userObj)

  useEffect(() => {

    const q = query(
      collection(dbService, 'tweets'),
      orderBy('createdAt', 'desc'), //asc나 desc로 오름차순,내림차순 설정가능
    )
    onSnapshot(q, (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      //.docs는 객체들로 이뤄진 배열을 리턴합니다

      //console.log(nweetArray)
      setNweets(nweetArray)
    })
  }, [])

  //console.log(nweets)

  const onSubmit = async (e) => {
    e.preventDefault()
    const doc = await addDoc(collection(dbService, 'tweets'), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
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
      <div>
        {/* 트위팅 내용들을 가져옴 */}
        {nweets.map((i) => (
          <div key={i.id}>
            <h4>{i.text}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
