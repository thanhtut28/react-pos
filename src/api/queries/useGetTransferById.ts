import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_TRANSFER_BY_ID_QUERY, TRANSFER_BY_ID_URL } from './queries'
import { GetTransferByIdQuery, TransferId } from './types'

async function getTransfer(transferId: TransferId): Promise<GetTransferByIdQuery> {
   const { data } = await apiClient.get(`${TRANSFER_BY_ID_URL}/${transferId}`)
   return data
}

export default function useGetTransferById(transferId: TransferId) {
   return useQuery<GetTransferByIdQuery, Error>([GET_TRANSFER_BY_ID_QUERY, transferId], () =>
      getTransfer(transferId)
   )
}
