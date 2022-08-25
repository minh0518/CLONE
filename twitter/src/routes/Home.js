import React, { useEffect, useState } from 'react'
import { collection, addDoc , getDocs } from 'firebase/firestore'
import { dbService } from 'fbase'

const Home = () => {
  const [nweet, setNweet] = useState('')
  const [nweets,setNweets]=useState([])

  useEffect(()=>{
    const getNweets=async()=>{
      const dbnweets= await getDocs(collection(dbService,'tweets'))
      dbnweets.forEach(i=>{

        const nweetObj={
          ...i.data(),
          id:i.id //기본적으로 Firestore에서 사용하면 id가 자동저장된다고 했었습니다
        }  
        
        setNweets(prev=>[nweetObj,...prev])
        //최초에는 nweets가 비었으므로 prev는 아무 것도 없지만
        //그 다음부터 추가되는 것이 있으면 그 직전의 값을 가지게 됨

      })
      
    }
    getNweets()
  },[])

  console.log(nweets)

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
      <div>
        {/* 트위팅 내용들을 가져옴 */}
        {nweets.map(i=>(
          <div key={i.id}>
            <h4>{i.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
