import { SidebarContainer } from './Elements'
import SidebarMenuList from './SidebarMenuList'

interface Props {
   openSidebar?: boolean
}

export default function Sidebar({ openSidebar }: Props) {
   return (
      <SidebarContainer openSidebar={openSidebar}>
         <SidebarMenuList />
      </SidebarContainer>
   )
}
