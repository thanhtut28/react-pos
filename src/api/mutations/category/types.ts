/**
 * @Add
 */
export interface AddCategoryMutation {
   status: string
   message: string
}

export interface AddCategoryMutationVariables {
   categoryName: string
}

/**
 * @Update
 */
export interface UpdateCategoryMutation {
   status: string
   message: string
}

export interface UpdateCategoryMutationVariables extends AddCategoryMutationVariables {
   categoryId: string
}

/**
 * @Delete
 */
export interface DeleteCategoryMutation {
   status: string
   message: string
}

export interface DeleteCategoryMutationVariables {
   categoryId: string
}
