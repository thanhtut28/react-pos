import { useMutation, useQueryClient } from 'react-query'
import { GET_SUPPLIERS_QUERY } from '../../queries/queries'
import { URL } from './mutations'
import { useAuth } from '../../../contexts/AuthContext'
import { SupplierMutation, DeleteSupplierMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function deleteSupplier(
   { supplierId }: DeleteSupplierMutationVariables,
   apiClient: AxiosInstance
): Promise<SupplierMutation> {
   const { data } = await apiClient({
      method: 'delete',
      data: {
         supplierId,
      },
      url: URL,
   })
   return data
}

export default function useDeleteSupplier() {
   const queryClient = useQueryClient()
   const { apiClient } = useAuth()

   return useMutation({
      mutationFn: ({ supplierId }: DeleteSupplierMutationVariables) =>
         deleteSupplier({ supplierId }, apiClient),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_SUPPLIERS_QUERY }),
   })
}
