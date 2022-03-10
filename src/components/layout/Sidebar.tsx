import { SidebarContainer, SidebarMenu } from './Elements'
import { pages } from '../../dummy/pages'
import MenuItem from './MenuItem'

export default function Sidebar() {
   return (
      <SidebarContainer>
         <SidebarMenu>
            {pages.map((page) => (
               <MenuItem key={page.title} page={page} />
            ))}
         </SidebarMenu>
      </SidebarContainer>
   )
}
