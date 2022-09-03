import { authService, dbService } from 'fbase'
import { signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'

const Profile = ({ userObj }) => {
  const navigate = useNavigate()

  const onLogOutClick = () => {
    signOut(authService)
    navigate('/')
  }

  useEffect(() => {
    const getMyNweets = async () => {
      const q = query(
        collection(dbService, 'tweets'),
        where('creatorId', '==', userObj.uid),
        orderBy('createdAt', 'desc'),
      )
      const nweets = await getDocs(q)
      console.log(nweets)
      nweets.forEach((doc) => {
        console.log(`${doc.id}:${JSON.stringify(doc.data())}`)
        // doc.data()가 object Object로 나오면 JSON.stringify 로 감싸서
      })
    }

    getMyNweets()
  })

  return (
    <div>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  )
}

export default Profile
