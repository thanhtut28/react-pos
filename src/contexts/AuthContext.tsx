import jwtDecode from 'jwt-decode'
import React, { createContext, useContext, useEffect, useState } from 'react'
import axios, { AxiosInstance } from 'axios'
interface User {
   role: string
   username: string
   userId: string
}
interface AuthContextInterface {
   user: User | null
   isAdmin: boolean
   signIn: (token: string) => void
   signOut: () => void
   apiClient: AxiosInstance
}

const AuthContext = createContext({} as AuthContextInterface)

export const useAuth = () => {
   return useContext(AuthContext)
}

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
   const [accessToken, setToken] = useState<string>('')
   const [user, setUser] = useState<User | null>(null)
   const isAdmin = user?.role === 'admin'

   const setAccessToken = (token: string) => {
      localStorage.setItem('accessToken', token)
      setToken(token)
   }

   const signIn = (token: string) => {
      setAccessToken(token)
      const user: User = jwtDecode(token)
      setUser(user)
   }

   const signOut = () => {
      setAccessToken('')
      setUser(null)
   }

   const apiClient = axios.create({
      baseURL: 'https://my-app-zmoyo.ondigitalocean.app/api',
      headers: {
         Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
   })

   useEffect(() => {
      const token = localStorage.getItem('accessToken')
      if (token) {
         setToken(token)
         const user: User = jwtDecode(token)
         setUser(user)
      }
   }, [])

   const authContext = {
      user,
      signIn,
      signOut,
      isAdmin,
      apiClient,
   }

   return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
}
