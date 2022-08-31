import React, { useEffect, useRef, useState } from 'react'
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { dbService } from 'fbase'
import Nweet from 'components/Nweet'

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])
  const [attachment, setAttachement] = useState()

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

  const onFileChange = (e) => {
    // console.log(e.target)
    // console.log(e.target.files)

    const theFile = e.target.files[0]
    //console.log(theFile)

    const reader = new FileReader()

    //파일이 바로 읽히진 않기 때문에 이벤트 리스너를 추가
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent)

      const { currentTarget: result } = finishedEvent

      setAttachement(result.result)
    }
    reader.readAsDataURL(theFile)
  }

  const onClearAttachment = (e) => {
    setAttachement(null)
    fileInput.current.value=''
  }


  const fileInput=useRef()


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
        <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput}/>
        <input type="submit" value="Tweet" />
        {attachment && (
          //사진이 존재한다면 img태그로 사진을 보여줌 + 취소버튼
          <>
            <img src={attachment} width="50px" height="50px" alt="img" />
            <button onClick={onClearAttachment}>Clear</button>
          </>
        )}
      </form>
      <div>
        {/* 트위팅 내용들을 가져옴 */}
        {nweets.map((i) => (
          <Nweet
            key={i.id}
            nweetObj={i}
            isOwner={i.creatorId === userObj.uid}
          />
          // 여기에서 isOwner값을 넘겨줍니다
        ))}
      </div>
    </div>
  )
}

export default Home
