import jwtDecode from 'jwt-decode'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAccessToken, setAccessToken } from 'src/helpers/accessToken'

interface User {
   role: string
}
interface AuthContextInterface {
   user: User | null
   signIn: (token: string) => void
   signOut: () => void
}

const AuthContext = createContext({} as AuthContextInterface)

export const useAuth = () => {
   return useContext(AuthContext)
}

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState<User | null>(null)

   const signIn = (token: string) => {
      setAccessToken(token)
      const user: User = jwtDecode(token)
      if (user) {
         setUser(user)
      }
   }

   const signOut = () => {
      setAccessToken('')
      setUser(null)
   }

   useEffect(() => {
      const token = getAccessToken()
      if (token) {
         const user: User = jwtDecode(token)
         setUser(user)
      }
   }, [])

   const authContext = {
      user,
      signIn,
      signOut,
   }

   return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
}
