import { useMutation, useQueryClient } from 'react-query'
import { GET_ITEMS_QUERY } from '../../queries/queries'
import { URL } from './mutations'
import { useAuth } from '../../../contexts/AuthContext'
import { ItemMutation, DeleteItemMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function deleteItem(
   { itemId }: DeleteItemMutationVariables,
   apiClient: AxiosInstance
): Promise<ItemMutation> {
   const { data } = await apiClient({
      method: 'delete',
      data: {
         itemId,
      },
      url: URL,
   })
   return data
}

export default function useDeleteItem() {
   const queryClient = useQueryClient()
   const { apiClient } = useAuth()

   return useMutation({
      mutationFn: ({ itemId }: DeleteItemMutationVariables) => deleteItem({ itemId }, apiClient),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_ITEMS_QUERY }),
   })
}
