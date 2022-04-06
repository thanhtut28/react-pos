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
   itemId: string
   itemCode: string
   itemName: string
   lowest_qty: number
   unitPrice: number
   unitPercent: number
}

export interface GetItemsQuery {
   status: string
   data: Items[]
}

export interface GetReceiptNumQuery {
   status: string
   data: number
}
