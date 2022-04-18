import { useMutation, useQueryClient } from 'react-query'
import { GET_SUPPLIERS_QUERY } from '../../queries/queries'
import { useAuth } from '../../../contexts/AuthContext'
import { URL } from './mutations'
import { SupplierMutation, UpdateSupplierMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function updateSupplier(
   newSupplier: UpdateSupplierMutationVariables,
   apiClient: AxiosInstance
): Promise<SupplierMutation> {
   const { data } = await apiClient.put(URL, newSupplier)
   return data
}

export default function useUpdateSupplier() {
   const queryClient = useQueryClient()
   const { apiClient } = useAuth()

   return useMutation({
      mutationFn: (newSupplier: UpdateSupplierMutationVariables) => updateSupplier(newSupplier, apiClient),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_SUPPLIERS_QUERY }),
   })
}
