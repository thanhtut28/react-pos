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
   supplierId: string
   supplierCode: string
   supplierName: number
}

export interface GetSuppliersQuery {
   status: string
   data: Suppliers[]
}

export interface Items {
   _id: string
   code: string
   name: string
   lowest_qty: number
   category: string
   // selling_price: [],
   // selling_percent: [],
   __v: 0
}

export interface GetItemsQuery {
   status: string
   data: Items[]
}
