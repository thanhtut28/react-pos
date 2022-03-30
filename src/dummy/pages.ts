import DashboardIcon from '@mui/icons-material/Dashboard'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import ReceiptIcon from '@mui/icons-material/Receipt'
import PersonIcon from '@mui/icons-material/Person'
import CategoryIcon from '@mui/icons-material/Category'
import InventoryIcon from '@mui/icons-material/Inventory'
import SellIcon from '@mui/icons-material/Sell'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import HandymanIcon from '@mui/icons-material/Handyman'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import SummarizeIcon from '@mui/icons-material/Summarize'

const Icons = {
   DashboardIcon,
   LocalMallIcon,
   ReceiptIcon,
   PersonIcon,
   CategoryIcon,
   InventoryIcon,
   SellIcon,
   SupportAgentIcon,
   ShoppingCartIcon,
   HandymanIcon,
   PlaylistAddCheckIcon,
   SummarizeIcon,
}

export enum Type {
   item = 'item',
   collapse = 'collapse',
}

export interface PageInterface {
   id: string
   title: string
   icon?: any
   type: Type
   url?: string
   children?: PageInterface[]
}

// export const pages: PageInterface[] = [
//    { title: 'Dashboard', icon: <SpeedIcon fontSize="small" />, active: true },
//    { title: 'Products', icon: <LocalMallOutlinedIcon fontSize="small" />, active: false },
//    { title: 'Sales', icon: <SellOutlinedIcon fontSize="small" />, active: false },
//    { title: 'Messages', icon: <MessageOutlinedIcon fontSize="small" />, active: false },
// ]

export const pages: PageInterface[] = [
   {
      id: 'Dashboard',
      title: 'Dashboard',
      icon: Icons.DashboardIcon,
      type: Type.item,
      url: '/',
   },
   {
      id: 'Sales',
      title: 'Sales',
      icon: Icons.SellIcon,
      type: Type.collapse,
      children: [
         {
            id: 'Receipts',
            title: 'Receipts',
            type: Type.item,
            icon: Icons.ReceiptIcon,
            url: '/receipts',
         },
         {
            id: 'Customers',
            title: 'Customers',
            type: Type.item,
            icon: Icons.PersonIcon,
            url: '/customers',
         },
      ],
   },
   {
      id: 'Supplies',
      title: 'Supplies',
      type: Type.collapse,
      icon: Icons.ShoppingCartIcon,
      children: [
         {
            id: 'SuppliesItem',
            title: 'Supplies',
            type: Type.item,
            icon: Icons.HandymanIcon,
            url: '/supplies/supplies',
         },
         {
            id: 'Suppliers',
            title: 'Suppliers',
            type: Type.item,
            icon: Icons.SupportAgentIcon,
            url: '/supplies/suppliers',
         },
      ],
   },
   {
      id: 'Products',
      title: 'Products',
      type: Type.collapse,
      icon: Icons.LocalMallIcon,
      children: [
         {
            id: 'Items',
            title: 'Items',
            type: Type.item,
            icon: Icons.InventoryIcon,
            url: '/products/items',
         },
         {
            id: 'Category',
            title: 'Category',
            type: Type.item,
            icon: Icons.CategoryIcon,
            url: '/categories',
         },
      ],
   },
   {
      id: 'Stocks',
      title: 'Stocks',
      type: Type.item,
      icon: Icons.PlaylistAddCheckIcon,
      url: '/stocks',
   },
   {
      id: 'Summary',
      title: 'Summary',
      type: Type.item,
      icon: Icons.SummarizeIcon,
      url: '/login',
   },
]