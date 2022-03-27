import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../..'
import { GET_CATEGORIES_QUERY } from '../../queries/queries'
import { UPDATE_CATEGORY_MUTATION, URL } from './mutations'
import { UpdateCategoryMutation, UpdateCategoryMutationVariables } from './types'

async function updateCategory(newCategory: UpdateCategoryMutationVariables): Promise<UpdateCategoryMutation> {
   const { data } = await apiClient.post(URL, newCategory)
   return data
}

export default function useUpdateCategory(newCategory: UpdateCategoryMutationVariables) {
   const queryClient = useQueryClient()

   return useMutation<UpdateCategoryMutation, Error>({
      mutationKey: [UPDATE_CATEGORY_MUTATION, newCategory.categoryId],
      mutationFn: () => updateCategory(newCategory),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_CATEGORIES_QUERY }),
   })
}
