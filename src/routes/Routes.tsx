import type { RouteObject } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Customers from '../pages/customers'
import Category from '../pages/category'
import Stocks from '../pages/stocks'
import Items from '../pages/items'
import Suppliers from '../pages/suppliers'
import Login from '../pages/login'
import CreateReceipts from '../pages/create/receipts'
import CreateSupplies from '../pages/create/supplies'
import CreateTransfers from '../pages/create/transfers'
import Layout from '../components/layout'
import { Navigate } from 'react-router-dom'

function ErrorPage() {
   return <h1>Error</h1>
}

function Item() {
   return <h1>Item</h1>
}

type RoutesProps = (isLoggedIn: boolean, role?: string) => RouteObject[]

const Routes: RoutesProps = (isLoggedIn, role) => [
   {
      path: '/',
      element: isLoggedIn ? <Layout /> : <Navigate to="/login" replace />,
      children:
         role === 'admin'
            ? [
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
                    path: '/items',
                    element: <Items />,
                    children: [
                       {
                          path: '/items/haha',
                          element: <h1>haha</h1>,
                       },
                    ],
                 },
                 {
                    path: '/products/items/:itemId',
                    element: <Item />,
                 },
                 {
                    path: '/supplies/suppliers',
                    element: <Suppliers />,
                 },
                 {
                    path: '/create/receipts',
                    element: <CreateReceipts />,
                 },
                 {
                    path: '/create/supplies',
                    element: <CreateSupplies />,
                 },
                 {
                    path: '/create/transfers',
                    element: <CreateTransfers />,
                 },
              ]
            : [
                 {
                    index: true,
                    element: <Dashboard />,
                 },
                 {
                    path: '/customers',
                    element: <Customers />,
                 },
                 {
                    path: '/create/receipts',
                    element: <CreateReceipts />,
                 },
              ],
   },

   {
      path: '/login',
      element: !isLoggedIn ? <Login /> : <Navigate to="/" replace />,
      children: [{ index: true, element: <h1>Hello User</h1> }],
   },

   {
      path: '*',
      element: <ErrorPage />,
   },
]

export default Routes
