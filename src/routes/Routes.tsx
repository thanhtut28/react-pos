// import { lazy } from 'react'
// import { Navigate } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Customers from '../pages/customers'
import Category from '../pages/category'
import Stocks from '../pages/stocks'
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
      {
         path: '/categories',
         element: <Category />,
      },
      {
         path: '/stocks',
         element: <Stocks />,
      },
   ],
}

export default Routes
