export interface Category {
   _id: number
   name: string
   __v: number
}

export interface GetCategoriesQuery {
   status: string
   data: Category[]
}

export interface Customer {
   _id: number
   code: string
   name: string
   __v: number
}

export interface GetCustomersQuery {
   status: string
   data: Customer[]
}
