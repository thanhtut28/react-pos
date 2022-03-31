import React, { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextInterface {
   isAuthenticated: boolean
   signIn: (callback: () => void) => void
   signOut: (callback: () => void) => void
}

const AuthContext = createContext({} as AuthContextInterface)

export const useAuth = () => {
   return useContext(AuthContext)
}

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

   const signIn = (callback: () => void) => {
      setIsAuthenticated(true)
      callback()
   }

   const signOut = (callback: () => void) => {
      setIsAuthenticated(false)
      callback()
   }

   useEffect(() => {
      if (localStorage.getItem('user')) {
         setIsAuthenticated(true)
      }
   }, [])

   const authContext = {
      isAuthenticated,
      signIn,
      signOut,
   }

   return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
}
