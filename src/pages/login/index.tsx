import * as React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Login from '../../components/login'
import useInput from '../../hooks/useInput'

export default function LoginPage() {
   const {
      value: username,
      inputChangeHandler: onChangeUsername,
      inputBlurHandler: onBlurUsername,
      valueIsValid: usernameIsValid,
      inputError: usernameError,
   } = useInput()

   const {
      value: password,
      inputChangeHandler: onChangePassword,
      inputBlurHandler: onBlurPassword,
      valueIsValid: passwordIsValid,
      inputError: passwordError,
   } = useInput()

   const auth = useAuth()
   const navigate = useNavigate()

   const formIsValid = usernameIsValid && passwordIsValid

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!formIsValid) return
      auth.signIn(() => {
         navigate('/', { replace: true })
         localStorage.setItem('user', 'isAuthenticated')
      })
   }

   return (
      <Login
         username={username}
         password={password}
         onChangeUsername={onChangeUsername}
         onChangePassword={onChangePassword}
         onBlurUsername={onBlurUsername}
         onBlurPassword={onBlurPassword}
         handleSubmit={handleSubmit}
         usernameError={usernameError}
         passwordError={passwordError}
         formIsValid={formIsValid}
      />
   )
}
