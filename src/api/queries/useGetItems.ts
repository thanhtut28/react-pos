import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_ITEMS_QUERY, ITEMS_URL } from './queries'
import { GetItemsQuery } from './types'

async function getItems(): Promise<GetItemsQuery> {
   const { data } = await apiClient.get(ITEMS_URL)
   return data
}

export default function useGetItems() {
   return useQuery<GetItemsQuery, Error>({
      queryKey: GET_ITEMS_QUERY,
      queryFn: getItems,
   })
}
