// import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Customers from '../pages/customers'
import Category from '../pages/category'
import Stocks from '../pages/stocks'
import Items from '../pages/items'
import Suppliers from '../pages/suppliers'
import Login from '../pages/login'
import Layout from '../components/layout'
import { Navigate } from 'react-router-dom'

function ErrorPage() {
   return <h1>Error</h1>
}

function Item() {
   return <h1>Item</h1>
}

type RoutesProps = (isLoggedIn: boolean) => RouteObject[]

const Routes: RoutesProps = (isLoggedIn: boolean) => [
   {
      path: '/',
      element: isLoggedIn ? <Layout /> : <Navigate to="/login" />,
      children: [
         {
            index: true,
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
         {
            path: '/products/items',
            element: <Items />,
         },
         {
            path: '/products/items/:itemId',
            element: <Item />,
         },
         {
            path: '/supplies/suppliers',
            element: <Suppliers />,
         },
      ],
   },
   {
      path: '/login',
      element: !isLoggedIn ? <Login /> : <Navigate to="/" />,
      children: [{ index: true, element: <h1>Hello User</h1> }],
   },

   {
      path: '*',
      element: <ErrorPage />,
   },
]

export default Routes
