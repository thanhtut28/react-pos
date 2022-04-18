import { useQuery } from 'react-query'
import { GET_SUPPLY_BY_ID_QUERY, SUPPLY_BY_ID_URL } from './queries'
import { GetSupplyByIdQuery, SupplyId } from './types'
import { useAuth } from '../../contexts/AuthContext'
import { AxiosInstance } from 'axios'

async function getSupply(supplyId: SupplyId, apiClient: AxiosInstance): Promise<GetSupplyByIdQuery> {
   const { data } = await apiClient.get(`${SUPPLY_BY_ID_URL}/${supplyId}`)
   return data
}

export default function useGetSupplyById(supplyId: SupplyId) {
   const { apiClient } = useAuth()
   return useQuery<GetSupplyByIdQuery, Error>([GET_SUPPLY_BY_ID_QUERY, supplyId], () =>
      getSupply(supplyId, apiClient)
   )
}
