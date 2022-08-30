import React, { useState } from 'react'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { dbService } from 'fbase'


const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  //수정상태인지 아닌지
  const [newNweet, setNewNweet] = useState(nweetObj.text)
  //수정을 해도 기존의 값에서 수정해야 하므로 디폴트를 nweetObj.text로

  const onDetleClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this tweet?')
    //ok값은 true or false
    if (ok) {
      //console.log(nweetObj.id)
      await deleteDoc(doc(dbService, 'tweets', `${nweetObj.id}`))
    }
  }

  // 클릭하면 수정상태 인지 아닌지 변경
  const toggleEditing = () => {
    setEditing((prev) => !prev)
  }

  const onChange = (e) => {
    setNewNweet(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    //console.log(newNweet)

    const updateResult=doc(dbService, 'tweets', `${nweetObj.id}`)
    await updateDoc(updateResult,{
      text:newNweet
    })

    alert('Update complete!')
    setEditing(false)

  }

  return (
    //editing상태이면 입력창이 추가가 되고 Cancel버튼으로 취소 가능
    <div>
      {editing ? (
        <div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              onChange={onChange}
              placeholder="Edit your nweet"
              value={newNweet}
              required
            />
            <input type="submit" value="Update Nweet"/>
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </div>
      ) : (
        //editing상태가 아니라면 기존의 트위팅 내용들을 보여줌
        <div>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <div>
              <button onClick={onDetleClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Nweet
