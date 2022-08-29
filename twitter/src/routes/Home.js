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
      orderBy('createdAt', 'desc'), //asc�� desc�� ��������,�������� ��������
    )
    onSnapshot(q, (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      //.docs�� ��ü��� �̷��� �迭�� �����մϴ�

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
