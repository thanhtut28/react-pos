export interface CreateReceiptMutation {
   message: string
   status: string
}

interface Item {
   itemId: string
   qty: number
   unitPrice: number
   unitPercent: number
}

export interface CreateReceiptMutationVariables {
   receiptType: string
   customerName: string
   items: Item[]
}

export interface UpdateReceiptMutation {
   message: string
   status: string
}

export interface UpdateReceiptMutationVariables extends CreateReceiptMutationVariables {
   receiptId: string
}
