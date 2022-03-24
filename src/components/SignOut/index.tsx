import { Button } from '@mui/material'
import React from 'react'
import { auth } from '../../firebase'
import styles from './styles.module.css'

const SignOut = () => {
  return (
    <div className={styles.container}>
      <Button onClick={() => auth.signOut()}>Sign Out</Button>
    </div>
  )
}

export default SignOut
