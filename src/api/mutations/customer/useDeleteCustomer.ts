import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../..'
import { GET_CUSTOMERS_QUERY } from '../../queries/queries'
import { DELETE_CUSTOMER_MUTATION, URL } from './mutations'
import { DeleteCustomerMutation, DeleteCustomerMutationVariables } from './types'

async function deleteCustomer({
   customerId,
}: DeleteCustomerMutationVariables): Promise<DeleteCustomerMutation> {
   const { data } = await apiClient.post(URL, { customerId })
   return data
}

export default function useDeleteCustomer({ customerId }: DeleteCustomerMutationVariables) {
   const queryClient = useQueryClient()

   return useMutation<DeleteCustomerMutation, Error>({
      mutationKey: [DELETE_CUSTOMER_MUTATION, customerId],
      mutationFn: () => deleteCustomer({ customerId }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_CUSTOMERS_QUERY }),
   })
}
