/**
 * @Add
 */
export interface AddCustomerMutation {
   status: string
   message: string
}

export interface AddCustomerMutationVariables {
   customerCode: string
   customerName: string
}

/**
 * @Update
 */
export interface UpdateCustomerMutation {
   status: string
   message: string
}

export interface UpdateCustomerMutationVariables extends AddCustomerMutationVariables {
   customerId: string
}

/**
 * @Delete
 */
export interface DeleteCustomerMutation {
   status: string
   message: string
}

export interface DeleteCustomerMutationVariables {
   customerId: string
}
