import { SidebarMenu } from './Elements'
import { pages } from '../../../dummy'
import SidebarListItem from './SidebarListItem'

export default function SidebarMenuList() {
   return (
      <SidebarMenu>
         {pages.map((page) => (
            <SidebarListItem key={page.title} page={page} />
         ))}
      </SidebarMenu>
   )
}
