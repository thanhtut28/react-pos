export interface CreateTransferMutation {
   message: string
   status: string
}

interface Item {
   itemId: string
   qty: number
}

export interface CreateTransferMutationVariables {
   transferType: string
   username: string
   userId: string
   items: Item[]
}

export interface UpdateTransferMutation {
   message: string
   status: string
}

export interface UpdateTransferMutationVariables extends CreateTransferMutationVariables {
   transferId: string
}
