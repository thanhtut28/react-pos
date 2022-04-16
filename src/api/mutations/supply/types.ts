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

export interface UpdateSupplyMutation {
   message: string
   status: string
}

export interface UpdateSupplyMutationVariables extends CreateSupplyMutationVariables {
   supplyId: string
}
