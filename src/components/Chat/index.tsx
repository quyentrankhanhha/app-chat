import {
  collection,
  deleteField,
  doc,
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from '@firebase/firestore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, Tooltip } from '@mui/material'
import Linkify from 'linkify-react'
import * as linkify from 'linkifyjs'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { auth, db } from '../../firebase'
import SendMessage from '../SendMessage'
import SignOut from '../SignOut'
import styles from './styles.module.css'

const Chat = () => {
  const scroll = useRef<any>(null)
  const [messages, setMessages] = useState<DocumentData[]>([])
  const messagesRef = collection(db, 'messages')
  const q = query(messagesRef, orderBy('createdAt'), limit(50))

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          msgId: doc.id,
          link: linkify
            .find(doc.data().text || '')
            .find((link) => link.isLink === true && link.type === 'url')?.href,
          ...doc.data(),
        }))
      )
    })
  }, [])
  console.log(messages)

  async function deleteMessage(e: FormEvent<HTMLElement>) {
    e.preventDefault()
    if (messages) {
      const idBtn = messages.find(
        (ele) => ele.msgId === e.currentTarget.dataset.id
      )
      await updateDoc(doc(db, 'messages', idBtn?.msgId), {
        text: deleteField(),
      })
    }
  }

  return (
    <div>
      <SignOut />
      <div className={styles.messages}>
        {messages.map(({ text, photoURL, uid, msgId, links }) => (
          <div key={msgId}>
            <div
              className={uid === auth.currentUser?.uid ? styles.dotSend : ''}
            >
              {uid === auth.currentUser?.uid && text ? (
                <Tooltip title='Delete'>
                  <IconButton onClick={deleteMessage} data-id={msgId}>
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <></>
              )}

              <div
                className={`${styles.message} ${
                  uid === auth.currentUser?.uid ? styles.sent : styles.received
                }`}
              >
                <img src={photoURL} alt='ava' />
                <Linkify tagName='p'>{text || 'Message deleted'}</Linkify>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SendMessage scroll={scroll} />
      <div ref={scroll}></div>
    </div>
  )
}

export default Chat
