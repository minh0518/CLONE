import React, { useState } from 'react'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { storageService, dbService } from 'fbase'
import { deleteObject, ref } from 'firebase/storage'

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  //������������ �ƴ���
  const [newNweet, setNewNweet] = useState(nweetObj.text)
  //������ �ص� ������ ������ �����ؾ� �ϹǷ� ����Ʈ�� nweetObj.text��

  //���� firestore�� �ִ� ������ public url�� ref�� 2��° ���ڷ� �־��ָ�
  //������ reference�� �޾ƿɴϴ�
  const desertRef = ref(storageService, nweetObj.attachmentUrl)

  const onDetleClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this tweet?')
    //ok���� true or false
    if (ok) {
      //console.log(nweetObj.id)

      //�ش��ϴ� Ʈ���� Firestore ���� (�̰� ������ Ʈ���� ������ �� ����ߴ� ����)
      await deleteDoc(doc(dbService, 'tweets', `${nweetObj.id}`))

       //�����Ϸ��� Ʈ���� �̹��� ������ �ִ� ��� storage���� �̹��� ����
       if (nweetObj.attachmentUrl !== '') {
				//deleteObject���. ���ڷ� �����ϰ��� �ϴ� reference�� �־���
        await deleteObject(desertRef)
      }
    }
  }

  // Ŭ���ϸ� �������� ���� �ƴ��� ����
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
    //editing�����̸� �Է�â�� �߰��� �ǰ� Cancel��ư���� ��� ����
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
        //editing���°� �ƴ϶�� ������ Ʈ���� ������� ������
        <div>
          <h4>{nweetObj.text}</h4>
          {/* attachmentUrl�� �����ϸ� ������ ���� ������ */}
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
