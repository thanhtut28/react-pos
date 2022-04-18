import { useQuery } from 'react-query'
import { GET_USERS_QUERY, USERS_URL } from './queries'
import { useAuth } from '../../contexts/AuthContext'
import { GetUsersQuery } from './types'
import { AxiosInstance } from 'axios'

async function getUsers(apiClient: AxiosInstance): Promise<GetUsersQuery> {
   const { data } = await apiClient.get(USERS_URL)
   return data
}

export default function useGetUsers(enabled = true) {
   const { apiClient } = useAuth()
   return useQuery<GetUsersQuery, Error>({
      queryKey: GET_USERS_QUERY,
      queryFn: () => getUsers(apiClient),
      enabled,
   })
}
