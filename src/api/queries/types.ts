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
   lowestQty: number
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

export type ReceiptId = string

export interface GetReceiptByIdQuery {
   status: string
   data: Receipt
}

/**
 * @ReceiptNum
 */

export interface GetReceiptNumQuery {
   status: string
   data: number
}

/**
 * @Supply
 */

export interface SupplyItem {
   itemId: string
   itemName: string
   qty: number
   unitPrice: number
   unitPercent: number
}

export interface Supply {
   supplyId: string
   supplyNum: number
   supplyType: string
   supplyDate: Date
   supplierName: string
   totalAmount: number
   items: SupplyItem[]
}

export interface GetSuppliesQuery {
   status: string
   data: Supply[]
}

export type SupplyId = string

export interface GetSupplyByIdQuery {
   status: string
   data: Supply
}

export interface GetSupplyNumQuery {
   status: string
   data: number
}

/**
 * @Transfer
 */

export interface TransferItem {
   itemId: string
   itemName: string
   qty: number
}

export interface Transfer {
   transferId: string
   transferNum: number
   transferType: string
   transferDate: Date
   userId: string
   username: string
   items: TransferItem[]
}

export interface GetTransfersQuery {
   status: string
   data: Transfer[]
}

export interface GetTransferNumQuery {
   status: string
   data: number
}

export type TransferId = string

export interface GetTransferByIdQuery {
   status: string
   data: Transfer
}

export interface Stock {
   itemName: string
   openingBalance: number
   supply: number
   return: number
   give: number
   take: number
   closingBalance: number
}

export interface GetStocksQuery {
   status: string
   data: Stock[]
}

export interface WHStock {
   itemName: string
   openingBalance: number
   supply: number
   return: number
   give: number
   take: number
   closingBalance: number
}

export interface GetWHStocksQuery {
   status: string
   data: WHStock[]
}

export interface Credit {
   creditId: string
   creditDate: Date
   username: string
   creditAmount: number
}

export interface CreditReceipt {
   receiptId: string
   receiptNum: string
   receiptDate: Date
   username: string
   customerName: string
   status: string
   totalAmount: number
   paidAmount?: number
   credits: Credit[]
}

export interface GetCreditsQuery {
   status: string
   data: CreditReceipt[]
}

export interface GetCreditByIdQuery {
   status: string
   data: CreditReceipt
}

export interface GetSummaryQuery {
   status: string
   data: {
      totalSale: number
      totalReceived: number
      openingBalance: number
      totalSupplies: number
      closingBalance: number
      totalCapital: number
      totalProfit: number
   }
}

export interface Params {
   from: string
   to: string
}
