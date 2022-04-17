import * as React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Login from '../../components/login'
import useInput from '../../hooks/useInput'
import { isNotEmpty } from '../../helpers/isNotEmpty'
import useLoginMutation from '../../api/mutations/login'

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

   const { mutateAsync: login, error } = useLoginMutation()

   const auth = useAuth()

   const formIsValid = usernameIsValid && passwordIsValid

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!formIsValid) return

      const response = await login({ username, password })
      const token = response.data.token
      auth.signIn(token)
   }

   if (error) {
      return <h1>{(error as Error).message}</h1>
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
