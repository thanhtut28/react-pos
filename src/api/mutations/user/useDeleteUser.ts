import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../..'
import { GET_USERS_QUERY } from '../../queries/queries'
import { URL } from './url'
import { UserMutation, DeleteUserMutationVariables } from './types'

async function deleteUser({ userId }: DeleteUserMutationVariables): Promise<UserMutation> {
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

   return useMutation({
      mutationFn: ({ userId }: DeleteUserMutationVariables) => deleteUser({ userId }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_USERS_QUERY }),
   })
}
