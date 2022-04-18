import { useMutation, useQueryClient } from 'react-query'
import { GET_SUPPLIERS_QUERY } from '../../queries/queries'
import { URL } from './mutations'
import { useAuth } from '../../../contexts/AuthContext'
import { SupplierMutation, AddSupplierMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function addSupplier(
   newSupplier: AddSupplierMutationVariables,
   apiClient: AxiosInstance
): Promise<SupplierMutation> {
   const { data } = await apiClient.post(URL, newSupplier)
   return data
}

export default function useAddSupplier() {
   const queryClient = useQueryClient()
   const { apiClient } = useAuth()

   return useMutation((newSupplier: AddSupplierMutationVariables) => addSupplier(newSupplier, apiClient), {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_SUPPLIERS_QUERY }),
   })
}
