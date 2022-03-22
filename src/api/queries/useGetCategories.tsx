import { useQuery } from 'react-query'
import { axiosInstance } from '../../api'
import { GET_CATEGORIES_QUERY } from '../../constants/queries'
import { GetCategoriesQuery } from './types'

async function getCategories(): Promise<GetCategoriesQuery> {
   const { data } = await axiosInstance.get('/categories')
   return data
}

export default function useGetCategories() {
   return useQuery<GetCategoriesQuery, Error>(GET_CATEGORIES_QUERY, getCategories)
}
