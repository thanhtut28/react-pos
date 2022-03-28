import { useMutation, useQueryClient } from 'react-query'
import { apiClient } from '../..'
import { GET_CUSTOMERS_QUERY } from '../../queries/queries'
import { URL } from './mutations'
import { AddCustomerMutation, AddCustomerMutationVariables } from './types'

async function addCustomer(newCustomer: AddCustomerMutationVariables): Promise<AddCustomerMutation> {
   const { data } = await apiClient.post(URL, newCustomer)
   return data
}

export default function useAddCustomer() {
   const queryClient = useQueryClient()

   return useMutation((newCustomer: AddCustomerMutationVariables) => addCustomer(newCustomer), {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: GET_CUSTOMERS_QUERY }),
   })
}
