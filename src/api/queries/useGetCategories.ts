import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_CATEGORIES_QUERY, CATEGORIES_URL } from './queries'
import { GetCategoriesQuery } from './types'

async function getCategories(): Promise<GetCategoriesQuery> {
   const { data } = await apiClient.get(CATEGORIES_URL)
   return data
}

export default function useGetCategories() {
   return useQuery<GetCategoriesQuery, Error>({
      queryKey: GET_CATEGORIES_QUERY,
      queryFn: getCategories,
   })
}
