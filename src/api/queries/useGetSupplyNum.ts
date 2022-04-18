import { useQuery } from 'react-query'
import { GET_SUPPLY_NUM, SUPPLY_NUM_URL } from './queries'
import { GetSupplyNumQuery } from './types'
import { useAuth } from '../../contexts/AuthContext'
import { AxiosInstance } from 'axios'

async function getSupplyNum(apiClient: AxiosInstance): Promise<GetSupplyNumQuery> {
   const { data } = await apiClient.get(SUPPLY_NUM_URL)
   return data
}

export default function useGetSupplyNum() {
   const { apiClient } = useAuth()
   return useQuery<GetSupplyNumQuery, Error>({
      queryKey: GET_SUPPLY_NUM,
      queryFn: () => getSupplyNum(apiClient),
   })
}
