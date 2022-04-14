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

export interface Supplier {
   supplierId: string
   supplierCode: string
   supplierName: string
}

export interface GetSuppliersQuery {
   status: string
   data: Supplier[]
}

/**
 * @Items
 */

export interface Item {
   itemId: string
   itemCode: string
   itemName: string
   lowest_qty: number
   unitPrice: number
   unitPercent: number
}

export interface GetItemsQuery {
   status: string
   data: Item[]
}

/**
 * @Users
 *
 */

export interface User {
   userId: string
   username: string
   role: string
}

export interface GetUsersQuery {
   status: string
   data: User[]
}

/**
 * @Receipts
 */

export interface ReceiptItem {
   itemId: string
   itemName: string
   qty: number
   unitPrice: number
   unitPercent: number
}

export interface Receipt {
   receiptId: string
   receiptNum: number
   receiptType: string
   receiptDate: Date
   username: string
   customerName: string
   totalAmount: number
   items: ReceiptItem[]
}

export interface GetReceiptsQuery {
   status: string
   data: Receipt[]
}

export interface Params {
   from: string
   to: string
}

/**
 * @ReceiptNum
 */

export interface GetReceiptNumQuery {
   status: string
   data: number
}

export interface GetSupplyNumQuery {
   status: string
   data: number
}

export interface GetTransferNumQuery {
   status: string
   data: number
}
