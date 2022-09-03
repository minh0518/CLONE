import React, { useState } from 'react'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { storageService, dbService } from 'fbase'
import { deleteObject, ref } from 'firebase/storage'


const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  //수정상태인지 아닌지
  const [newNweet, setNewNweet] = useState(nweetObj.text)
  //수정을 해도 기존의 값에서 수정해야 하므로 디폴트를 nweetObj.text로

  //현재 firestore에 있는 사진의 public url을 ref의 2번째 인자로 넣어주면
  //파일의 reference를 받아옵니다
  const desertRef = ref(storageService, nweetObj.attachmentUrl)

  const onDetleClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this tweet?')
    //ok값은 true or false
    if (ok) {
      //console.log(nweetObj.id)

      //해당하는 트윗을 Firestore 삭제 (이건 이전에 트위팅 삭제할 때 사용했던 것임)
      await deleteDoc(doc(dbService, 'tweets', `${nweetObj.id}`))

       //삭제하려는 트윗에 이미지 파일이 있는 경우 storage에서 이미지 삭제
       if (nweetObj.attachmentUrl !== '') {
				//deleteObject사용. 인자로 삭제하고자 하는 reference를 넣어줌
        await deleteObject(desertRef)
      }
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

    const updateResult = doc(dbService, 'tweets', `${nweetObj.id}`)
    await updateDoc(updateResult, {
      text: newNweet,
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
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </div>
      ) : (
        //editing상태가 아니라면 기존의 트위팅 내용들을 보여줌
        <div>
          <h4>{nweetObj.text}</h4>
          {/* attachmentUrl가 존재하면 사진과 같이 보여줌 */}
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
              width="50px"
              height="50px"
              alt=""
            />
          )}
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
