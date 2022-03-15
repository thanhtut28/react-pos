import { SidebarMenu } from './Elements'
import { pages } from '../../dummy'
import MenuItem from './MenuItem'

export default function SidebarMenuList() {
   return (
      <SidebarMenu>
         {pages.map((page) => (
            <MenuItem key={page.title} page={page} />
         ))}
      </SidebarMenu>
   )
}
