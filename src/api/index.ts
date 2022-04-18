import { QueryClient } from 'react-query'

export const client = new QueryClient({
   defaultOptions: {
      queries: {
         //  refetchInterval: Infinity,
         staleTime: Infinity,
         cacheTime: 0,
      },
   },
})
