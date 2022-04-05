export interface LoginMutation {
   status: string
   data: {
      token: string
   }
}

export interface LoginMutationVariables {
   username: string
   password: string
}
