import { useMutation } from 'react-query'
import { apiClient } from '../..'
import { URL } from './url'
import { LoginMutation, LoginMutationVariables } from './types'

async function LoginAccount(credentials: LoginMutationVariables): Promise<LoginMutation> {
   const { data } = await apiClient.post(URL, credentials)
   return data
}

export default function useLogin() {
   return useMutation((credentials: LoginMutationVariables) => LoginAccount(credentials))
}
