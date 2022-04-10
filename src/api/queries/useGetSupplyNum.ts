import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_SUPPLY_NUM, SUPPLY_NUM_URL } from './queries'
import { GetSupplyNumQuery } from './types'

async function getSupplyNum(): Promise<GetSupplyNumQuery> {
   const { data } = await apiClient.get(SUPPLY_NUM_URL)
   return data
}

export default function useGetSupplyNum() {
   return useQuery<GetSupplyNumQuery, Error>({
      queryKey: GET_SUPPLY_NUM,
      queryFn: getSupplyNum,
   })
}
