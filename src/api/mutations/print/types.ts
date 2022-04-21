export interface PrintMutation {
   status: string
   message: string
}

export interface Item {
   itemId: string
   qty: number
   unitPrice: number
   unitPercent: number
}

export interface PrintMutationVariables {
   customerName: string
   receiptType: string
   items: Item[]
}
