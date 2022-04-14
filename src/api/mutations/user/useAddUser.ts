import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../..'
import { GET_USERS_QUERY } from '../../queries/queries'
import { URL } from './url'
import { UserMutation, AddUserMutationVariables } from './types'

async function addUser(newUser: AddUserMutationVariables): Promise<UserMutation> {
   const { data } = await apiClient.post(URL, newUser)
   return data
}

export default function useAddUser() {
   const queryClient = useQueryClient()

   return useMutation((newUser: AddUserMutationVariables) => addUser(newUser), {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_USERS_QUERY }),
   })
}
