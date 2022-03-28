import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../..'
import { GET_CUSTOMERS_QUERY } from '../../queries/queries'
import { URL } from './mutations'
import { UpdateCustomerMutation, UpdateCustomerMutationVariables } from './types'

async function updateCustomer(newCustomer: UpdateCustomerMutationVariables): Promise<UpdateCustomerMutation> {
   const { data } = await apiClient.put(URL, newCustomer)
   return data
}

export default function useUpdateCustomer() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: (newCustomer: UpdateCustomerMutationVariables) => updateCustomer(newCustomer),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_CUSTOMERS_QUERY }),
   })
}
