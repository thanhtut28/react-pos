import { useMutation, useQueryClient } from 'react-query'
import { GET_ITEMS_QUERY } from '../../queries/queries'
import { URL } from './mutations'
import { useAuth } from '../../../contexts/AuthContext'
import { ItemMutation, UpdateItemMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function updateItem(
   newItem: UpdateItemMutationVariables,
   apiClient: AxiosInstance
): Promise<ItemMutation> {
   const { data } = await apiClient.put(URL, newItem)
   return data
}

export default function useUpdateItem() {
   const queryClient = useQueryClient()
   const { apiClient } = useAuth()

   return useMutation({
      mutationFn: (newItem: UpdateItemMutationVariables) => updateItem(newItem, apiClient),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_ITEMS_QUERY }),
   })
}
