import { SidebarListItem } from './Elements'
import { ListItemIcon, ListItemText } from '@mui/material'
import { PageInterface } from '../../../dummy'
import { FiberManualRecord } from '@mui/icons-material'
import { useNavigate, matchPath, useLocation } from 'react-router-dom'

interface Props {
   item: PageInterface
   level: number
}

const MenuItem: React.FC<Props> = ({ item, level }: Props) => {
   const Icon = item.icon
   const itemIcon = item?.icon ? <Icon fontSize="small" /> : <FiberManualRecord fontSize="small" />
   const navigate = useNavigate()
   const { pathname } = useLocation()

   const active = !!matchPath({ path: item.url as string }, pathname)

   return (
      <SidebarListItem
         selected={active}
         sx={{ pl: level > 0 ? level * 4 : 2 }}
         onClick={() => navigate(item.url as string, { replace: true })}
      >
         <ListItemIcon>{itemIcon}</ListItemIcon>

         <ListItemText>{item.title}</ListItemText>
      </SidebarListItem>
   )
}

export default MenuItem
