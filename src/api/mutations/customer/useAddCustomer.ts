import { useMutation, useQueryClient } from 'react-query'
import { GET_CUSTOMERS_QUERY } from '../../queries/queries'
import { URL } from './mutations'
import { useAuth } from '../../../contexts/AuthContext'
import { AddCustomerMutation, AddCustomerMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function addCustomer(
   newCustomer: AddCustomerMutationVariables,
   apiClient: AxiosInstance
): Promise<AddCustomerMutation> {
   const { data } = await apiClient.post(URL, newCustomer)
   return data
}

export default function useAddCustomer() {
   const queryClient = useQueryClient()
   const { apiClient } = useAuth()

   return useMutation((newCustomer: AddCustomerMutationVariables) => addCustomer(newCustomer, apiClient), {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_CUSTOMERS_QUERY }),
   })
}
