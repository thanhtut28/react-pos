import { useQuery } from 'react-query'
import { GET_ITEMS_QUERY, ITEMS_URL } from './queries'
import { GetItemsQuery } from './types'
import { useAuth } from '../../contexts/AuthContext'
import { AxiosInstance } from 'axios'

async function getItems(apiClient: AxiosInstance): Promise<GetItemsQuery> {
   const { data } = await apiClient.get(ITEMS_URL)
   return data
}

export default function useGetItems() {
   const { apiClient } = useAuth()
   return useQuery<GetItemsQuery, Error>({
      queryKey: GET_ITEMS_QUERY,
      queryFn: () => getItems(apiClient),
   })
}
