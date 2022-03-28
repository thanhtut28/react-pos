import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../..'
import { GET_ITEMS_QUERY } from '../../queries/queries'
import { URL } from './mutations'
import { ItemMutation, UpdateItemMutationVariables } from './types'

async function updateItem(newItem: UpdateItemMutationVariables): Promise<ItemMutation> {
   const { data } = await apiClient.put(URL, newItem)
   return data
}

export default function useUpdateItem() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: (newItem: UpdateItemMutationVariables) => updateItem(newItem),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_ITEMS_QUERY }),
   })
}
