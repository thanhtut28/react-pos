import { useQuery } from 'react-query'
import { GET_TRANSFER_BY_ID_QUERY, TRANSFER_BY_ID_URL } from './queries'
import { useAuth } from '../../contexts/AuthContext'
import { GetTransferByIdQuery, TransferId } from './types'
import { AxiosInstance } from 'axios'

async function getTransfer(transferId: TransferId, apiClient: AxiosInstance): Promise<GetTransferByIdQuery> {
   const { data } = await apiClient.get(`${TRANSFER_BY_ID_URL}/${transferId}`)
   return data
}

export default function useGetTransferById(transferId: TransferId) {
   const { apiClient } = useAuth()
   return useQuery<GetTransferByIdQuery, Error>([GET_TRANSFER_BY_ID_QUERY, transferId], () =>
      getTransfer(transferId, apiClient)
   )
}
