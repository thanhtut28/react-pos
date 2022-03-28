import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../..'
import { GET_SUPPLIERS_QUERY } from '../../queries/queries'
import { URL } from './mutations'
import { SupplierMutation, DeleteSupplierMutationVariables } from './types'

async function deleteSupplier({ supplierId }: DeleteSupplierMutationVariables): Promise<SupplierMutation> {
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

   return useMutation({
      mutationFn: ({ supplierId }: DeleteSupplierMutationVariables) => deleteSupplier({ supplierId }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_SUPPLIERS_QUERY }),
   })
}
