export interface SupplierMutation {
   status: string
   message: string
}

/**
 * @Add
 */

export interface AddSupplierMutationVariables {
   supplierCode: string
   supplierName: string
}

/**
 * @Update
 */

export interface UpdateSupplierMutationVariables extends AddSupplierMutationVariables {
   supplierId: string
}

/**
 * @Delete
 */

export interface DeleteSupplierMutationVariables {
   supplierId: string
}
