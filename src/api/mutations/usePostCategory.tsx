import { useMutation, useQueryClient } from 'react-query'
import { axiosInstance } from '../../api'
import { GET_CATEGORIES_QUERY } from '../../constants/queries'
import { PostCategoryMutation, PostCategoryMutationVariables } from './types'

async function getCategories(newCategory: PostCategoryMutationVariables): Promise<PostCategoryMutation> {
   const { data } = await axiosInstance.post('/category', newCategory)
   return data
}

export default function useGetCategories() {
   const queryClient = useQueryClient()

   /**
    *@description
    *need to add types
    */

   return useMutation((newCategory: PostCategoryMutationVariables) => getCategories(newCategory), {
      onSuccess: () => queryClient.invalidateQueries(GET_CATEGORIES_QUERY),
   })
}
