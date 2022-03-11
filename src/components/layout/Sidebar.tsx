import { SidebarContainer, SidebarMenu } from './Elements'
import { pages } from '../../dummy/pages'
import MenuItem from './MenuItem'

interface Props {
   openSidebar: boolean
}

export default function Sidebar({ openSidebar }: Props) {
   return (
      <SidebarContainer openSidebar={openSidebar}>
         <SidebarMenu>
            {pages.map((page) => (
               <MenuItem key={page.title} page={page} />
            ))}
         </SidebarMenu>
      </SidebarContainer>
   )
}
