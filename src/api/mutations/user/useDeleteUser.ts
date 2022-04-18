import { useMutation, useQueryClient } from 'react-query'
import { GET_USERS_QUERY } from '../../queries/queries'
import { URL } from './url'
import { useAuth } from '../../../contexts/AuthContext'
import { UserMutation, DeleteUserMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function deleteUser(
   { userId }: DeleteUserMutationVariables,
   apiClient: AxiosInstance
): Promise<UserMutation> {
   const { data } = await apiClient({
      method: 'delete',
      data: {
         userId,
      },
      url: URL,
   })
   return data
}

export default function useDeleteUser() {
   const queryClient = useQueryClient()
   const { apiClient } = useAuth()

   return useMutation({
      mutationFn: ({ userId }: DeleteUserMutationVariables) => deleteUser({ userId }, apiClient),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_USERS_QUERY }),
   })
}
