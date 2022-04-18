import { useMutation, useQueryClient } from 'react-query'
import { GET_CUSTOMERS_QUERY } from '../../queries/queries'
import { URL } from './mutations'
import { useAuth } from '../../../contexts/AuthContext'
import { UpdateCustomerMutation, UpdateCustomerMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function updateCustomer(
   newCustomer: UpdateCustomerMutationVariables,
   apiClient: AxiosInstance
): Promise<UpdateCustomerMutation> {
   const { data } = await apiClient.put(URL, newCustomer)
   return data
}

export default function useUpdateCustomer() {
   const queryClient = useQueryClient()
   const { apiClient } = useAuth()

   return useMutation({
      mutationFn: (newCustomer: UpdateCustomerMutationVariables) => updateCustomer(newCustomer, apiClient),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_CUSTOMERS_QUERY }),
   })
}
