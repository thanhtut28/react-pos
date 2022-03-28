import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../..'
import { GET_SUPPLIERS_QUERY } from '../../queries/queries'
import { URL } from './mutations'
import { SupplierMutation, UpdateSupplierMutationVariables } from './types'

async function updateSupplier(newSupplier: UpdateSupplierMutationVariables): Promise<SupplierMutation> {
   const { data } = await apiClient.put(URL, newSupplier)
   return data
}

export default function useUpdateSupplier() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: (newSupplier: UpdateSupplierMutationVariables) => updateSupplier(newSupplier),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_SUPPLIERS_QUERY }),
   })
}
