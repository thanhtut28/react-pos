import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../..'
import { GET_ITEMS_QUERY } from '../../queries/queries'
import { URL } from './mutations'
import { ItemMutation, DeleteItemMutationVariables } from './types'

async function deleteItem({ itemId }: DeleteItemMutationVariables): Promise<ItemMutation> {
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

   return useMutation({
      mutationFn: ({ itemId }: DeleteItemMutationVariables) => deleteItem({ itemId }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_ITEMS_QUERY }),
   })
}
