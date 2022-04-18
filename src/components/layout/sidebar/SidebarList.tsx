import { SidebarMenu, Username } from './Elements'
import { pages, sellerPages, Type } from '../../../dummy'
import SidebarListItem from './SidebarListItem'
import SidebarListCollapse from './SidebarListCollapse'
import { useAuth } from '../../../contexts/AuthContext'
import { Box } from '@mui/material'

export default function SidebarMenuList() {
   const { user } = useAuth()
   const isAdmin = user?.role === 'admin'
   return (
      <SidebarMenu>
         <Box pb={2}>
            <Username>{user?.username}</Username>
         </Box>
         {isAdmin
            ? pages.map((page) => {
                 switch (page.type) {
                    case Type.item:
                       return <SidebarListItem key={page.id} item={page} level={0} />
                    case Type.collapse:
                       return <SidebarListCollapse key={page.id} item={page} level={0} />
                    default:
                       return
                 }
              })
            : sellerPages.map((page) => {
                 switch (page.type) {
                    case Type.item:
                       return <SidebarListItem key={page.id} item={page} level={0} />
                    case Type.collapse:
                       return <SidebarListCollapse key={page.id} item={page} level={0} />
                    default:
                       return
                 }
              })}
      </SidebarMenu>
   )
}
