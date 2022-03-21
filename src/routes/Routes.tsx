import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Customers from '../pages/customers'
import Layout from '../components/layout'

const Routes = {
   path: '/',
   element: <Layout />,
   children: [
      {
         path: '/',
         element: <Dashboard />,
      },
      {
         path: '/customers',
         element: <Customers />,
      },
      //   {
      //      path: '*',
      //      element: <Navigate to="/" replace />,
      //   },
   ],
}

export default Routes
