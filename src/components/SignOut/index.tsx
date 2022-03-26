import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { auth } from '../../firebase'
import styles from './styles.module.css'

type UserProps = {
  [user: string]: any
}

const SignOut = ({ user }: UserProps) => {
  console.log(user)
  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      className={styles.container}
    >
      <Grid item>
        <Typography variant='h4'>MiniChat</Typography>
      </Grid>
      <Grid item>
        <Typography variant='h6'>{user?.displayName}</Typography>
      </Grid>
      <Grid item>
        <Button className={styles.btn} onClick={() => auth.signOut()}>
          Sign Out
        </Button>
      </Grid>
    </Grid>
  )
}

export default SignOut
