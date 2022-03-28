import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../..'
import { GET_CUSTOMERS_QUERY } from '../../queries/queries'
import { URL } from './mutations'
import { DeleteCustomerMutation, DeleteCustomerMutationVariables } from './types'

async function deleteCustomer({
   customerId,
}: DeleteCustomerMutationVariables): Promise<DeleteCustomerMutation> {
   const { data } = await apiClient({
      method: 'delete',
      data: {
         customerId,
      },
      url: URL,
   })
   return data
}

export default function useDeleteCustomer() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: ({ customerId }: DeleteCustomerMutationVariables) => deleteCustomer({ customerId }),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_CUSTOMERS_QUERY }),
   })
}
