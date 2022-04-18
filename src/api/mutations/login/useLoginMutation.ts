import { useMutation } from 'react-query'
import { URL } from './url'
import { useAuth } from '../../../contexts/AuthContext'
import { LoginMutation, LoginMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function loginAccount(
   credentials: LoginMutationVariables,
   apiClient: AxiosInstance
): Promise<LoginMutation> {
   const { data } = await apiClient.post(URL, credentials)
   return data
}

export default function useLogin() {
   const { apiClient } = useAuth()
   return useMutation((credentials: LoginMutationVariables) => loginAccount(credentials, apiClient))
}
