import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../..'
import { GET_CUSTOMERS_QUERY } from '../../queries/queries'
import { UPDATE_CUSTOMER_MUTATION, URL } from './mutations'
import { UpdateCustomerMutation, UpdateCustomerMutationVariables } from './types'

async function updateCustomer(newCustomer: UpdateCustomerMutationVariables): Promise<UpdateCustomerMutation> {
   const { data } = await apiClient.post(URL, newCustomer)
   return data
}

export default function useUpdateCustomer(newCustomer: UpdateCustomerMutationVariables) {
   const queryClient = useQueryClient()

   return useMutation<UpdateCustomerMutation, Error>({
      mutationKey: [UPDATE_CUSTOMER_MUTATION, newCustomer.customerId],
      mutationFn: () => updateCustomer(newCustomer),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_CUSTOMERS_QUERY }),
   })
}
