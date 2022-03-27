import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../..'
import { GET_CATEGORIES_QUERY } from '../../queries/queries'
import { DELETE_CATEGORY_MUTATION, URL } from './mutations'
import { DeleteCategoryMutation, DeleteCategoryMutationVariables } from './types'

async function deleteCategory({
   categoryId,
}: DeleteCategoryMutationVariables): Promise<DeleteCategoryMutation> {
   const { data } = await apiClient.post(URL, { categoryId })
   return data
}

export default function useDeleteCategory({ categoryId }: DeleteCategoryMutationVariables) {
   const queryClient = useQueryClient()

   return useMutation<DeleteCategoryMutation, Error>({
      mutationKey: [DELETE_CATEGORY_MUTATION, categoryId],
      mutationFn: () => deleteCategory({ categoryId }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_CATEGORIES_QUERY }),
   })
}
