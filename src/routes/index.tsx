import MainRoutes from './Routes'
// import LoginRoute from './LoginRoute'
import { useRoutes } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Routes() {
   const auth = useAuth()

   return useRoutes(MainRoutes(!!auth.user, auth.isAdmin))
}
