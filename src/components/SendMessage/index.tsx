import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { auth, db } from '../../firebase'
import styles from './styles.module.css'

interface ISendMessage {
  scroll?: any
  message?: string
  sendMessage?: FormEvent<HTMLFormElement>
  handleChange?: FormEvent<HTMLInputElement>
}

const SendMessage: React.FC<ISendMessage> = ({ scroll }) => {
  const [message, setMessage] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (auth.currentUser) {
      const { uid, photoURL } = auth.currentUser
      await addDoc(collection(db, 'messages'), {
        text: message,
        photoURL,
        uid,
        createdAt: serverTimestamp(),
      })
      setMessage('')
      scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <div>
      <form onSubmit={sendMessage}>
        <div className={styles.sendMessage}>
          <input
            placeholder='Message...'
            type='text'
            value={message}
            onChange={handleChange}
          />
          <button type='submit' disabled={message === '' ? true : false}>
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default SendMessage
