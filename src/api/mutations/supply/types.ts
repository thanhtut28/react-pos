export interface CreateSupplyMutation {
   message: string
   status: string
}

interface Item {
   itemId: string
   qty: number
   unitPrice: number
   unitPercent: number
}

export interface CreateSupplyMutationVariables {
   supplyType: string
   supplierName: string
   items: Item[]
}
