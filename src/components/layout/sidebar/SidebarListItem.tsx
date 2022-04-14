import { SidebarListItem } from './Elements'
import { ListItemIcon, ListItemText } from '@mui/material'
import { PageInterface } from '../../../dummy'
import { FiberManualRecord } from '@mui/icons-material'
import { useNavigate, matchPath, useLocation } from 'react-router-dom'
import { useLayoutContext } from '../../../contexts/LayoutContext'

interface Props {
   item: PageInterface
   level: number
}

const MenuItem: React.FC<Props> = ({ item, level }: Props) => {
   const Icon = item.icon
   const itemIcon = item?.icon ? <Icon fontSize="small" /> : <FiberManualRecord fontSize="small" />
   const navigate = useNavigate()
   const { pathname } = useLocation()
   const { setDestinationRoute, handleOpenWarningModal } = useLayoutContext()

   const active = !!matchPath({ path: item.url as string }, pathname)

   const handleNavigate = () => {
      if (pathname.includes('create')) {
         setDestinationRoute(item!.url as string)
         handleOpenWarningModal()
         return
      }
      navigate(item.url as string, { replace: true })
   }

   return (
      <SidebarListItem selected={active} sx={{ pl: level > 0 ? level * 4 : 2 }} onClick={handleNavigate}>
         <ListItemIcon>{itemIcon}</ListItemIcon>

         <ListItemText>{item.title}</ListItemText>
      </SidebarListItem>
   )
}

export default MenuItem
