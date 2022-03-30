import { Wrapper, StyledAvatar, LoginButton, Form } from './Elements'
import { Container, TextField, FormControlLabel, Typography, Checkbox } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import React from 'react'

interface Props {
   username: string
   password: string
   usernameError: boolean
   passwordError: boolean
   onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void
   onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void
   onBlurUsername: () => void
   onBlurPassword: () => void
   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
   formIsValid: boolean
}

export default function Login({
   username,
   onChangeUsername,
   onBlurUsername,
   usernameError,
   password,
   onChangePassword,
   onBlurPassword,
   passwordError,
   handleSubmit,
   formIsValid,
}: Props) {
   return (
      <Container component="main" maxWidth="xs">
         <Wrapper>
            <StyledAvatar>
               <LockOutlinedIcon />
            </StyledAvatar>
            <Typography component="h1" variant="h5">
               Log In
            </Typography>
            <Form onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={onChangeUsername}
                  onBlur={onBlurUsername}
                  error={usernameError}
                  helperText={usernameError && 'Please enter valid username'}
               />
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={onChangePassword}
                  onBlur={onBlurPassword}
                  error={passwordError}
                  helperText={passwordError && 'Please enter valid password'}
               />
               <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
               />
               <LoginButton type="submit" disabled={!formIsValid} fullWidth variant="contained">
                  Sign In
               </LoginButton>
            </Form>
         </Wrapper>
      </Container>
   )
}
