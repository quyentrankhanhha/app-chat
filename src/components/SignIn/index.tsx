import { Button, Typography } from '@mui/material'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { FC } from 'react'
import { auth } from '../../firebase'
import styles from './styles.module.css'

const SignIn: FC = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }
  return (
    <div className={styles.container}>
      <div>
        <Typography variant='h3'>Minimal Chat Room</Typography>
      </div>
      <div>
        <Button className={styles.btn} onClick={signInWithGoogle}>
          Sign In With Google
        </Button>
      </div>
    </div>
  )
}

export default SignIn
