import { useRouter } from 'next/router'
import React from 'react'
import fetch from 'isomorphic-unfetch'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
} from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import styles from '../styles/SignUp'
import { useInput } from '../hooks/useInput'

export default function SignUp() {
  const classes = styles()
  const router = useRouter()
  const { value: nameValue, bind: nameBind } = useInput('')
  const { value: emailValue, bind: emailBind } = useInput('')
  const { value: passwordValue, bind: passwordBind } = useInput('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = JSON.stringify({
      name: nameValue,
      password: passwordValue,
      email: emailValue,
    })

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })

      const response = await res.json()
      const { token } = response
      window.sessionStorage.setItem('jwtToken', token)

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={nameValue}
                {...nameBind}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={emailValue}
                {...emailBind}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={passwordValue}
                {...passwordBind}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
