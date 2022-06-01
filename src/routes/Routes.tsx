import type { RouteObject } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Customers from '../pages/customers'
import Stocks from '../pages/stocks'
import Items from '../pages/items'
import Receipts from '../pages/receipts'
import Summary from '../pages/summary'
import Credits from '../pages/credit'
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
import ViewCredit from '../pages/view/credit'
import ViewSupply from '../pages/view/supplies'
import ViewTransfer from '../pages/view/transfers'

import Layout from '../components/layout'
import { Navigate } from 'react-router-dom'
import UserPage from '../pages/users'
import WarehouseStocks from '../pages/warehouseStocks'

function ErrorPage() {
   return <h1>Error</h1>
}

type RoutesProps = (isLoggedIn: boolean, isAdmin?: boolean) => RouteObject[]

const Routes: RoutesProps = (isLoggedIn, isAdmin) => [
   {
      path: '/',
      element: isLoggedIn ? <Layout /> : <Navigate to="/login" replace />,
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
            path: '/stocks',
            element: <Stocks />,
         },
         {
            path: '/items',
            element: <Items />,
         },
         {
            path: 'transfers',
            element: <Transfers />,
         },
         {
            path: '/transfer/view/:transferId',
            element: <ViewTransfer />,
         },
         {
            path: '/receipts',
            element: <Receipts />,
         },
         {
            path: '/create/receipts',
            element: <CreateReceipts />,
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
            path: '/stocks/wh',
            element: <WarehouseStocks />,
         },
         {
            path: '/credits',
            element: <Credits />,
         },
         {
            path: '/credit/view/:receiptId',
            element: <ViewCredit />,
         },
         ...(isAdmin
            ? [
                 {
                    path: '/suppliers',
                    element: <Suppliers />,
                 },
                 {
                    path: '/users',
                    element: <UserPage />,
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
                    path: '/create/transfers',
                    element: <CreateTransfers />,
                 },
                 {
                    path: '/transfer/edit/:transferId',
                    element: <EditTransfer />,
                 },
                 {
                    path: '/summary',
                    element: <Summary />,
                 },
              ]
            : []),
      ],
   },

   {
      path: '/login',
      element: !isLoggedIn ? <Login /> : <Navigate to="/" replace />,
   },

   {
      path: '*',
      element: <ErrorPage />,
   },
]

export default Routes
