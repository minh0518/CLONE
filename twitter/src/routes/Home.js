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
          id:i.id //�⺻������ Firestore���� ����ϸ� id�� �ڵ�����ȴٰ� �߾����ϴ�
        }  
        
        setNweets(prev=>[nweetObj,...prev])
        //���ʿ��� nweets�� ������Ƿ� prev�� �ƹ� �͵� ������
        //�� �������� �߰��Ǵ� ���� ������ �� ������ ���� ������ ��

      })
      
    }
    getNweets()
  },[])

  console.log(nweets)

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
      <div>
        {/* Ʈ���� ������� ������ */}
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
