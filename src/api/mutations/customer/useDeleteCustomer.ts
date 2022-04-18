import { useMutation, useQueryClient } from 'react-query'
import { GET_CUSTOMERS_QUERY } from '../../queries/queries'
import { URL } from './mutations'
import { useAuth } from '../../../contexts/AuthContext'
import { DeleteCustomerMutation, DeleteCustomerMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function deleteCustomer(
   { customerId }: DeleteCustomerMutationVariables,
   apiClient: AxiosInstance
): Promise<DeleteCustomerMutation> {
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
   const { apiClient } = useAuth()

   return useMutation({
      mutationFn: ({ customerId }: DeleteCustomerMutationVariables) =>
         deleteCustomer({ customerId }, apiClient),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_CUSTOMERS_QUERY }),
   })
}
