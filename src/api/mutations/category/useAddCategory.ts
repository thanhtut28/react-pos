import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../..'
import { GET_CATEGORIES_QUERY } from '../../queries/queries'
import { ADD_CATEGORY_MUTATION, URL } from './mutations'
import { AddCategoryMutation, AddCategoryMutationVariables } from './types'

async function addCategory(newCategory: AddCategoryMutationVariables): Promise<AddCategoryMutation> {
   const { data } = await apiClient.post(URL, newCategory)
   return data
}

export default function useAddCategory(newCategory: AddCategoryMutationVariables) {
   const queryClient = useQueryClient()

   return useMutation<AddCategoryMutation, Error>({
      mutationKey: [ADD_CATEGORY_MUTATION, newCategory.categoryName],
      mutationFn: () => addCategory(newCategory),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_CATEGORIES_QUERY }),
   })
}
