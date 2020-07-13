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
import styles from '../styles/SignIn'
import { useInput } from '../hooks/useInput'
import { useRouter } from 'next/router'

export default function SignIn() {
  const classes = styles()
  const router = useRouter()
  const { value: emailValue, bind: emailBind } = useInput('')
  const { value: passwordValue, bind: passwordBind } = useInput('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = JSON.stringify({
      password: passwordValue,
      email: emailValue,
    })

    try {
      const res = await fetch('/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })

      const { token } = await res.json()
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={emailValue}
            {...emailBind}
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
