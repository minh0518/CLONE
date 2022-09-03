import { authService, dbService } from 'fbase'
import { signOut, updateProfile } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { async } from '@firebase/util'

const Profile = ({ userObj }) => {
  const navigate = useNavigate()
  const [newDisplayName,setNewDisplayName]=useState(userObj.displayName)


  const onLogOutClick = () => {
    signOut(authService)
    navigate('/')
  }

  const onChange=e=>{
    setNewDisplayName(e.target.value)
  }

  const onSubmit=async (e)=>{
    e.preventDefault()

    //바꾼 프로필이름이 기존과 다를 경우에만 실행. 변경사항이 없으면 실행x
    if(newDisplayName!==userObj.displayName){ 
        //프로필 업데이트
        await updateProfile(authService.currentUser,{
            displayName : newDisplayName
        })
    }
  }

  useEffect(() => {
    const getMyNweets = async () => {
      const q = query(
        collection(dbService, 'tweets'),
        where('creatorId', '==', userObj.uid),
        orderBy('createdAt', 'desc'),
      )
      const nweets = await getDocs(q)
     // console.log(nweets)
    //   nweets.forEach((doc) => {
    //     console.log(`${doc.id}:${JSON.stringify(doc.data())}`)
    //     // doc.data()가 object Object로 나오면 JSON.stringify 로 감싸서
    //   })
    }

    getMyNweets()
  })

  return (
    <div>
        {/* 새로운 폼 생성 */}
        <form onSubmit={onSubmit}>
            <input type="text" onChange={onChange} placeholder='Display name' value={newDisplayName}/>
            <input type="submit" value="Update Profile"/>
        </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  )
}

export default Profile
