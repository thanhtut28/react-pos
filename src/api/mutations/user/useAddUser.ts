import { useMutation, useQueryClient } from 'react-query'
import { GET_USERS_QUERY } from '../../queries/queries'
import { URL } from './url'
import { useAuth } from '../../../contexts/AuthContext'
import { UserMutation, AddUserMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function addUser(newUser: AddUserMutationVariables, apiClient: AxiosInstance): Promise<UserMutation> {
   const { data } = await apiClient.post(URL, newUser)
   return data
}

export default function useAddUser() {
   const queryClient = useQueryClient()
   const { apiClient } = useAuth()

   return useMutation((newUser: AddUserMutationVariables) => addUser(newUser, apiClient), {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_USERS_QUERY }),
   })
}
