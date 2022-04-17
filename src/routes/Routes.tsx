import type { RouteObject } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Customers from '../pages/customers'
import Stocks from '../pages/stocks'
import Items from '../pages/items'
import Receipts from '../pages/receipts'
import Supplies from '../pages/supplies'
import Transfers from '../pages/transfers'
import Suppliers from '../pages/suppliers'
import Login from '../pages/login'
import CreateReceipts from '../pages/create/receipts'
import CreateSupplies from '../pages/create/supplies'
import CreateTransfers from '../pages/create/transfers'
import EditReceipt from '../pages/edit/receipts'
import EditSupply from '../pages/edit/supplies'
import EditTransfer from '../pages/edit/transfers'
import ViewReceipt from '../pages/view/receipts'
import ViewSupply from '../pages/view/supplies'
import ViewTransfer from '../pages/view/transfers'

import Layout from '../components/layout'
import { Navigate } from 'react-router-dom'
import UserPage from '../pages/users'

function ErrorPage() {
   return <h1>Error</h1>
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
                    path: '/stocks',
                    element: <Stocks />,
                 },
                 {
                    path: '/items',
                    element: <Items />,
                 },

                 {
                    path: '/suppliers',
                    element: <Suppliers />,
                 },
                 {
                    path: '/users',
                    element: <UserPage />,
                 },
                 {
                    path: '/receipts',
                    element: <Receipts />,
                 },
                 {
                    path: '/receipt/edit/:receiptId',
                    element: <EditReceipt />,
                 },
                 {
                    path: '/receipt/view/:receiptId',
                    element: <ViewReceipt />,
                 },
                 {
                    path: '/create/receipts',
                    element: <CreateReceipts />,
                 },
                 {
                    path: '/supplies',
                    element: <Supplies />,
                 },
                 {
                    path: '/create/supplies',
                    element: <CreateSupplies />,
                 },
                 {
                    path: '/supply/edit/:supplyId',
                    element: <EditSupply />,
                 },
                 {
                    path: '/supply/view/:supplyId',
                    element: <ViewSupply />,
                 },
                 {
                    path: 'transfers',
                    element: <Transfers />,
                 },
                 {
                    path: '/create/transfers',
                    element: <CreateTransfers />,
                 },
                 {
                    path: '/transfer/edit/:transferId',
                    element: <EditTransfer />,
                 },
                 {
                    path: '/transfer/view/:transferId',
                    element: <ViewTransfer />,
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
