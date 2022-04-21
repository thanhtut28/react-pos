import { useMutation } from 'react-query'
import { URL } from './url'
import { useAuth } from '../../../contexts/AuthContext'
import { PrintMutation, PrintMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function loginAccount(
   printVariables: PrintMutationVariables,
   apiClient: AxiosInstance
): Promise<PrintMutation> {
   const { data } = await apiClient.post(URL, printVariables)
   return data
}

export default function usePrint() {
   const { apiClient } = useAuth()
   return useMutation((printVariables: PrintMutationVariables) => loginAccount(printVariables, apiClient))
}
