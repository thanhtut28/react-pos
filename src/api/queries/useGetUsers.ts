import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_USERS_QUERY, USERS_URL } from './queries'
import { GetUsersQuery } from './types'

async function getUsers(): Promise<GetUsersQuery> {
   const { data } = await apiClient.get(USERS_URL)
   return data
}

export default function useGetUsers() {
   return useQuery<GetUsersQuery, Error>({
      queryKey: GET_USERS_QUERY,
      queryFn: getUsers,
   })
}
