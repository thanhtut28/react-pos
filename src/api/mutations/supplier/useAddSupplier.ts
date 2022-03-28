import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../..'
import { GET_SUPPLIERS_QUERY } from '../../queries/queries'
import { URL } from './mutations'
import { SupplierMutation, AddSupplierMutationVariables } from './types'

async function addSupplier(newSupplier: AddSupplierMutationVariables): Promise<SupplierMutation> {
   const { data } = await apiClient.post(URL, newSupplier)
   return data
}

export default function useAddSupplier() {
   const queryClient = useQueryClient()

   return useMutation((newSupplier: AddSupplierMutationVariables) => addSupplier(newSupplier), {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_SUPPLIERS_QUERY }),
   })
}
