import { useMutation, useQueryClient } from 'react-query'
import { GET_USERS_QUERY } from '../../queries/queries'
import { URL } from './url'
import { useAuth } from '../../../contexts/AuthContext'
import { UserMutation, UpdateUserMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function updateUser(
   newUser: UpdateUserMutationVariables,
   apiClient: AxiosInstance
): Promise<UserMutation> {
   const { data } = await apiClient.put(URL, newUser)
   return data
}

export default function useUpdateUser() {
   const queryClient = useQueryClient()
   const { apiClient } = useAuth()

   return useMutation({
      mutationFn: (newUser: UpdateUserMutationVariables) => updateUser(newUser, apiClient),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_USERS_QUERY }),
   })
}
