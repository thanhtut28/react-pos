import * as React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Login from '../../components/login'
import useInput from '../../hooks/useInput'
import { isNotEmpty } from '../../helpers/isNotEmpty'

export default function LoginPage() {
   const {
      value: username,
      inputChangeHandler: onChangeUsername,
      inputBlurHandler: onBlurUsername,
      valueIsValid: usernameIsValid,
      inputError: usernameError,
   } = useInput(isNotEmpty)

   const {
      value: password,
      inputChangeHandler: onChangePassword,
      inputBlurHandler: onBlurPassword,
      valueIsValid: passwordIsValid,
      inputError: passwordError,
   } = useInput(isNotEmpty)

   const auth = useAuth()

   const formIsValid = usernameIsValid && passwordIsValid

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!formIsValid) return
      auth.signIn(() => {
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
