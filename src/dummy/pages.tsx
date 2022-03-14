import SpeedIcon from '@mui/icons-material/Speed'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined'
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'

export interface PageInterface {
   title: string
   icon: React.ReactNode
   active: boolean
}

export const pages: PageInterface[] = [
   { title: 'Dashboard', icon: <SpeedIcon fontSize="small" />, active: true },
   { title: 'Products', icon: <LocalMallOutlinedIcon fontSize="small" />, active: false },
   { title: 'Sales', icon: <SellOutlinedIcon fontSize="small" />, active: false },
   { title: 'Messages', icon: <MessageOutlinedIcon fontSize="small" />, active: false },
]
