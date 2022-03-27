/**
 * @Category
 */
export interface Category {
   _id: string
   name: string
   __v: number
}

export interface GetCategoriesQuery {
   status: string
   data: Category[]
}

/**
 * @Customer
 */
export interface Customer {
   _id: string
   code: string
   name: string
   __v: number
}

export interface GetCustomersQuery {
   status: string
   data: Customer[]
}

/**
 * @Suppliers
 */

export interface Suppliers {
   _id: string
   name: string
   __v: number
}

export interface GetSuppliersQuery {
   status: string
   data: Suppliers[]
}

export interface Items {
   _id: string
   name: string
   __v: number
}

export interface GetItemsQuery {
   status: string
   data: Suppliers[]
}
