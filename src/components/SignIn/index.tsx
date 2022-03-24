import { Button } from '@mui/material'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { FC, ReactElement } from 'react'
import { auth } from '../../firebase'
import styles from './styles.module.css'

const SignIn: FC<any> = (): ReactElement => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }
  return (
    <div className={styles.container}>
      <Button onClick={signInWithGoogle}> Sign In With Google</Button>
    </div>
  )
}

export default SignIn
