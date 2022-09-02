import React, { useEffect, useRef, useState } from 'react'
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { dbService } from 'fbase'
import { storageService } from 'fbase'
import Nweet from 'components/Nweet'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])
  const [attachment, setAttachement] = useState('')
  //반드시 빈 문자열로 해줘야 함

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

    //attachmentUrl을 상위에다가 변수로 선언
    let attachmentUrl = ''

    //사진을 우리가 첨부해서 attachment 상태값이 존재한다면
    if (attachment !== '') {
      //fileRef에서 attachmentRef로 변수명 수정함
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`)
      const response = await uploadString(attachmentRef, attachment, 'data_url')

      console.log(response)
      attachmentUrl = await getDownloadURL(attachmentRef)
      //사진 public url까지 받아옴
    }

    //사진 url과 트위팅을 동시에 진행
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
      //만약 사진을 첨부하지 않아서 위의 if문에 걸리지 않았다면
      //attachmentUrl이 초기값대로 빈 문자열로 들어감
    }
    const doc = await addDoc(collection(dbService, 'tweets'), nweetObj)
    setNweet('')
    setAttachement('')
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

    //선택된 파일이 있을 경우에만 readAsDataURL로 읽어옴
    if (theFile) {
      reader.readAsDataURL(theFile)
    }
    //readAsDataURL로 읽어져야 아래 onloadend 가 실행이 되는 것임
    //readAsDataURL이 실행되지 않으면 onloadend 는 실행이 안됨
    //파일이 바로 읽히진 않기 때문에 이벤트 리스너를 추가
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent)

      const { currentTarget: result } = finishedEvent

      setAttachement(result.result)
    }
  }

  const onClearAttachment = (e) => {
    setAttachement(null)
    fileInput.current.value = ''
  }

  const fileInput = useRef()

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
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
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
