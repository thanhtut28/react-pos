import { SidebarMenu } from './Elements'
import { pages, Type } from '../../../dummy'
import SidebarListItem from './SidebarListItem'
import SidebarListCollapse from './SidebarListCollapse'

export default function SidebarMenuList() {
   return (
      <SidebarMenu>
         {pages.map((page) => {
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
