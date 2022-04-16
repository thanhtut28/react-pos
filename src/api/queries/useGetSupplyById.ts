import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_SUPPLY_BY_ID_QUERY, SUPPLY_BY_ID_URL } from './queries'
import { GetSupplyByIdQuery, SupplyId } from './types'

async function getSupply(supplyId: SupplyId): Promise<GetSupplyByIdQuery> {
   const { data } = await apiClient.get(`${SUPPLY_BY_ID_URL}/${supplyId}`)
   return data
}

export default function useGetSupplyById(supplyId: SupplyId) {
   return useQuery<GetSupplyByIdQuery, Error>([GET_SUPPLY_BY_ID_QUERY, supplyId], () => getSupply(supplyId))
}
