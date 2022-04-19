export interface PayCreditMutation {
   status: string
   data: string
}

export interface PayCreditMutationVariables {
   creditAmount: number
}

export interface EditCreditMutation {
   status: string
   data: string
}

export interface EditCreditMutationVariables extends PayCreditMutationVariables {
   creditId: string
}
