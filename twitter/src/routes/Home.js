import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { dbService } from 'fbase'
import Nweet from 'components/Nweet'
import NweetFactory from 'components/NweetFactory'

const Home = ({ userObj }) => {
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

  return (
    <div>
      <NweetFactory userObj={userObj}/>

      {/* 트위팅 내용들을 가져옴 */}
      {nweets.map((i) => (
        <Nweet key={i.id} nweetObj={i} isOwner={i.creatorId === userObj.uid} />
        // 여기에서 isOwner값을 넘겨줍니다
      ))}
    </div>
  )
}

export default Home
