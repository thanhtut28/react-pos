import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../..'
import { GET_ITEMS_QUERY } from '../../queries/queries'
import { URL } from './mutations'
import { ItemMutation, AddItemMutationVariables } from './types'

async function addItem(newItem: AddItemMutationVariables): Promise<ItemMutation> {
   const { data } = await apiClient.post(URL, newItem)
   return data
}

export default function useAddItem() {
   const queryClient = useQueryClient()

   return useMutation((newItem: AddItemMutationVariables) => addItem(newItem), {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_ITEMS_QUERY }),
   })
}
