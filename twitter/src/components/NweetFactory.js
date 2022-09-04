import React, { useRef, useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { dbService } from 'fbase'
import { storageService } from 'fbase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'



const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [attachment, setAttachement] = useState('')
  //�ݵ�� �� ���ڿ��� ����� ��

  const onSubmit = async (e) => {
    e.preventDefault()

    //attachmentUrl�� �������ٰ� ������ ����
    let attachmentUrl = ''

    //������ �츮�� ÷���ؼ� attachment ���°��� �����Ѵٸ�
    if (attachment !== '') {
      //fileRef���� attachmentRef�� ������ ������
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`)
      const response = await uploadString(attachmentRef, attachment, 'data_url')

      console.log(response)
      attachmentUrl = await getDownloadURL(attachmentRef)
      //���� public url���� �޾ƿ�
    }

    //���� url�� Ʈ������ ���ÿ� ����
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
      //���� ������ ÷������ �ʾƼ� ���� if���� �ɸ��� �ʾҴٸ�
      //attachmentUrl�� �ʱⰪ��� �� ���ڿ��� ��
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

    //���õ� ������ ���� ��쿡�� readAsDataURL�� �о��
    if (theFile) {
      reader.readAsDataURL(theFile)
    }
    //readAsDataURL�� �о����� �Ʒ� onloadend �� ������ �Ǵ� ����
    //readAsDataURL�� ������� ������ onloadend �� ������ �ȵ�
    //������ �ٷ� ������ �ʱ� ������ �̺�Ʈ �����ʸ� �߰�
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
        {/*  e.preventDefault()������ �׳� form�±׻��¿���
            ��ư�� Ŭ���ص� ���ΰ�ħ�� �߻��� */}
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
          //������ �����Ѵٸ� img�±׷� ������ ������ + ��ҹ�ư
          <>
            <img src={attachment} width="50px" height="50px" alt="img" />
            <button onClick={onClearAttachment}>Clear</button>
          </>
        )}
      </form>
    </div>
  )
}

export default NweetFactory