export interface UserMutation {
   status: string
   data: string
}

/**
 * @Add
 */

export interface AddUserMutationVariables {
   username: string
   password: string
}

/**
 * @Update
 */

export interface UpdateUserMutationVariables extends AddUserMutationVariables {
   userId: string
}

/**
 * @Delete
 */

export interface DeleteUserMutationVariables {
   userId: string
}
