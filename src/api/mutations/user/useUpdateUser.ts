import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../../index'
import { GET_USERS_QUERY } from '../../queries/queries'
import { URL } from './url'
import { UserMutation, UpdateUserMutationVariables } from './types'

async function updateUser(newUser: UpdateUserMutationVariables): Promise<UserMutation> {
   const { data } = await apiClient.put(URL, newUser)
   return data
}

export default function useUpdateUser() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: (newUser: UpdateUserMutationVariables) => updateUser(newUser),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_USERS_QUERY }),
   })
}
