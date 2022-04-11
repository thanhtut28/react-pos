import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_TRANSFER_NUM, TRANSFER_NUM_URL } from './queries'
import { GetTransferNumQuery } from './types'

async function getTransferNum(): Promise<GetTransferNumQuery> {
   const { data } = await apiClient.get(TRANSFER_NUM_URL)
   return data
}

export default function useGetTransferNum() {
   return useQuery<GetTransferNumQuery, Error>({
      queryKey: GET_TRANSFER_NUM,
      queryFn: getTransferNum,
   })
}
