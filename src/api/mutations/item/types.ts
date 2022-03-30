export interface ItemMutation {
   status: string
   message: string
}

/**
 * @Add
 */

export interface AddItemMutationVariables {
   itemCode: string
   itemName: string
   category?: string
}

/**
 * @Update
 */

export interface UpdateItemMutationVariables extends AddItemMutationVariables {
   itemId: string
}

/**
 * @Delete
 */

export interface DeleteItemMutationVariables {
   itemId: string
}
